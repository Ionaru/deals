import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from "mongodb";
import { MongoRepository } from 'typeorm';

import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: MongoRepository<User>,
    ) {}

    getUser(id: string) {
        return this.userRepository.findOneBy({
            _id: new ObjectId(id)
        });
    }

    getUsers() {
        return this.userRepository.find();
    }
}
