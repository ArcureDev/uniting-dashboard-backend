import { Injectable } from '@nestjs/common';
import { Credentials } from "./login.model";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LoginService {

  constructor(private readonly prismaService: PrismaService) {
  }

  login(credentials: Credentials) {
    const user = this.prismaService.user.findUniqueOrThrow({
      where: { email: credentials.email}
    });
  }

}
