import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
import { HashService } from "../utils/hash.service";

@Injectable()
export class UserService {

  data: string[] = [];

  constructor(private readonly prismaService: PrismaService, private readonly hashService: HashService) {
  }

  async create(user: User) {
    user.password = await this.hashService.hash(user.password);
    return this.prismaService.user.create({data: user});
  }

  findAll(email: string) {
    return this.prismaService.user.findMany({ where: { email : {contains: email} }})
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, user: User) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
