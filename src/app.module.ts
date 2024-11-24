import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerMiddlewareMiddleware } from "./logger-middleware/logger-middleware.middleware";
import { RouteInfo } from "@nestjs/common/interfaces";
import { UserModule } from "./user/user.module";
import { PrismaModule } from './prisma/prisma.module';
import { LoginModule } from './login/login.module';
import { HashService } from './utils/hash.service';
import { UtilsModule } from './utils/utils.module';

const loggedRoutes: RouteInfo[] = [
  // {path: 'cats', method: RequestMethod.ALL},
  {path: 'logged(.*)', method: RequestMethod.ALL}
]

@Module({
  imports: [UserModule, PrismaModule, LoginModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddlewareMiddleware).forRoutes(...loggedRoutes);
  }

}
