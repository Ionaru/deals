import { Test } from "@nestjs/testing";
import { ObjectId } from "mongodb";
import { describe, beforeEach, it, expect } from "vitest";

import { User } from "../../models/user.model";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

describe("UserController", () => {
  let userController: UserController;

  const users: User[] = [
    {
      createdAt: new Date().toISOString(),
      credentials: [],
      id: ObjectId.createFromHexString("372458fbcc2a4a0af93394ae"),
      username: "Test User",
    },
  ];

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue({
        getUser: (id: string) =>
          users.find((user) => user.id.toHexString() === id),
      })
      .compile();

    userController = testingModule.get(UserController);
  });

  it("should create", () => {
    expect(userController).toBeTruthy();
  });

  it("should return 'null' when the user could not be found", async () => {
    const user = await userController.getUser({ id: "not_a_real_id" });
    expect(user).toBeNull();
  });

  it("should be able to get info about a user", async () => {
    const user = await userController.getUser({
      id: "372458fbcc2a4a0af93394ae",
    });

    expect(user).toBeTruthy();
    expect(user?.id).toBe("372458fbcc2a4a0af93394ae");
    expect(user?.isAdmin).toBe(false);
    expect(user?.username).toBe("Test User");
  });
});
