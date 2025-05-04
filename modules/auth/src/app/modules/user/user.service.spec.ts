import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ObjectId } from "mongodb";
import { describe, beforeEach, it, expect } from "vitest";

import { User } from "../../models/user.model.js";

import { UserService } from "./user.service.js";

describe("UserController", () => {
  let userService: UserService;

  const testingUsers: User[] = [
    {
      createdAt: new Date().toISOString(),
      credentials: [],
      id: ObjectId.createFromHexString("000000000000000000000001"),
      isAdmin: false,
      username: "Test User",
    },
    {
      createdAt: new Date().toISOString(),
      credentials: [],
      id: ObjectId.createFromHexString("000000000000000000000002"),
      isAdmin: true,
      username: "Test User 2",
    },
  ];

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User, "auth"),
          useValue: {
            find: () => testingUsers,
            findOneBy: ({ _id }: { _id: string }) =>
              testingUsers.find((user) => user.id.equals(_id)) ?? null,
          },
        },
      ],
    }).compile();

    userService = testingModule.get<UserService>(UserService);
  });

  it("should create", () => {
    expect(userService).toBeTruthy();
  });

  it("should find all users", async () => {
    const users = await userService.getUsers();
    expect(users).toHaveLength(2);
    expect(users).toEqual(users);
  });

  it("should return 'null' when the user could not be found", async () => {
    const user = await userService.getUser("000000000000000000000000");
    expect(user).toBeNull();
  });

  it("should return user 1", async () => {
    const user = await userService.getUser("000000000000000000000001");
    expect(user).toEqual(testingUsers[0]);
  });

  it("should return user 2", async () => {
    const user = await userService.getUser("000000000000000000000002");
    expect(user).toEqual(testingUsers[1]);
  });
});
