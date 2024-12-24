import { Prisma, PrismaClient as BasePrismaClient } from "../../prisma/client";

type ExtendedMiddlewareParams = Prisma.MiddlewareParams & {
  args?: {
    includeDeleted?: boolean;
    hardDelete?: boolean;
    [key: string]: any;
  };
};

export default class PrismaClient extends BasePrismaClient {
  constructor(options?: Prisma.PrismaClientOptions) {
    super(options);
    this.$use(this.middleware);
  }

  private async middleware(
    params: ExtendedMiddlewareParams,
    next: (params: ExtendedMiddlewareParams) => Promise<any>
  ) {
    if (params.action === "delete" && params.args?.hardDelete === undefined) {
      params.action = "update";
      params.args.data = { deletedAt: new Date() };
    }

    if (
      params.action === "deleteMany" &&
      params.args?.hardDelete === undefined
    ) {
      params.action = "updateMany";
      if (params.args.data !== undefined) {
        params.args.data.deletedAt = new Date();
      } else {
        params.args.data = { deletedAt: new Date() };
      }
    }

    if (["findUnique", "findFirst", "findMany"].includes(params.action)) {
      const includeDeleted = params.args?.includeDeleted;

      if (includeDeleted !== undefined) {
        delete params.args.includeDeleted;
      }

      if (!includeDeleted) {
        if (!params.args) params.args = {};
        if (!params.args.where) params.args.where = {};
        params.args.where.deletedAt = null;
      }
    }

    return next(params);
  }
}
