import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerMiddlewareMiddleware } from "./logger-middleware/logger-middleware.middleware";
import { RouteInfo } from "@nestjs/common/interfaces";
import { UserModule } from "./user/user.module";
import { PrismaModule } from './prisma/prisma.module';

const loggedRoutes: RouteInfo[] = [
  // {path: 'cats', method: RequestMethod.ALL},
  {path: 'logged(.*)', method: RequestMethod.ALL}
]

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddlewareMiddleware).forRoutes(...loggedRoutes);
  }

}
