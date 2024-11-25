import { Injectable, NotAcceptableException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { HashService } from "../utils/hash.service";
import { User } from "@prisma/client";
import { Credentials, JWT, JWTPayload } from "../models";

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService, private readonly hashService: HashService
  ) {
  }

  async validate(credentials: Credentials): Promise<Omit<User, "password"> | null> {
    const {password, ...user} = await this.prismaService.user.findUniqueOrThrow({
      where: { email: credentials.email, }
    });
   return (await this.hashService.compare(credentials.password, password)) ? user : null;
  }

  async login(credentials: Credentials): Promise<JWT | undefined> {
    const user = await this.validate(credentials);
    if (!user) {
      throw new NotAcceptableException();
    }
    const payload: JWTPayload = { email: credentials.email, sub: user?.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}