import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { UtilsModule } from "../utils/utils.module";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import * as process from "node:process";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from "./jwt.guard";

const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, JwtAuthGuard],
  imports: [
    PrismaModule,
    UtilsModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  exports: [JwtAuthGuard]
})
export class AuthModule {}
