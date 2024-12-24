import * as MainExports from "../../src";

describe("Main Exports", () => {
  test("should export PrismaClient", () => {
    expect(MainExports.PrismaClient).toBeDefined();
  });

  test("should export misc", () => {
    expect(MainExports.ALLOWED_HOSTS).toBeDefined();
  });

  test("should export Prisma models types", () => {
    expect(MainExports.User).toBeDefined();
    expect(MainExports.Game).toBeDefined();
    expect(MainExports.Save).toBeDefined();
    expect(MainExports.SaveUpvote).toBeDefined();
  });

  test("should export types", () => {
    test("should export Game types", () => {
      expect(MainExports.GameSearchResult).toBeDefined();
      expect(MainExports.CombinedGame).toBeDefined();
    });
    test("should export Rawg types", () => {
      expect(MainExports.RawgGame).toBeDefined();
      expect(MainExports.RawgGameDetails).toBeDefined();
      expect(MainExports.Platform).toBeDefined();
      expect(MainExports.Ordering).toBeDefined();
    });
    test("should export Save types", () => {
      expect(MainExports.AggregatedSave).toBeDefined();
    });
  });
});
