import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UtilsModule } from "./utils/utils.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [ConfigModule.forRoot(), UserModule, PrismaModule, AuthModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
