import { Prisma, PrismaClient as BasePrismaClient } from "../../prisma/client";

type ExtendedMiddlewareParams = Prisma.MiddlewareParams & {
  args?: ExtendedArgs<any>;
};

type ExtendedArgs<T> = T & {
  includeDeleted?: boolean;
  hardDelete?: boolean;
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

    return next(params);
  }

  async findUnique<T>(model: keyof PrismaClient, args: ExtendedArgs<F>) {
    return (this as any)[model].findUnique(args);
  }

  async findFirst<T>(model: keyof PrismaClient, args: ExtendedArgs<any>) {
    return (this as any)[model].findFirst(args);
  }

  async findMany<T>(model: keyof PrismaClient, args: ExtendedArgs<any>) {
    return (this as any)[model].findMany(args);
  }

  async delete<T>(model: keyof PrismaClient, args: ExtendedArgs<any>) {
    return (this as any)[model].delete(args);
  }

  async deleteMany<T>(model: keyof PrismaClient, args: ExtendedArgs<any>) {
    return (this as any)[model].deleteMany(args);
  }
}
