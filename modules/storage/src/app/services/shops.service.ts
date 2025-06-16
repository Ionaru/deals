import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Shop } from "../models/shop.js";

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  getShops() {
    return this.shopRepository.find({
      order: {
        name: "ASC",
      },
    });
  }
}
