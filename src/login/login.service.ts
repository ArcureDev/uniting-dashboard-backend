import { Injectable } from "@nestjs/common";
import { Credentials } from "./login.model";
import { PrismaService } from "../prisma/prisma.service";
import { HashService } from "../utils/hash.service";

@Injectable()
export class LoginService {

  constructor(private readonly prismaService: PrismaService, private readonly hashService: HashService) {
  }

  async login(credentials: Credentials) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { email: credentials.email}
    });
    console.log(await this.hashService.compare(credentials.password, user.password));
  }

}
