import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaModule } from "../prisma/prisma.module";
import { UtilsModule } from "../utils/utils.module";

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [PrismaModule, UtilsModule]
})
export class LoginModule {}
