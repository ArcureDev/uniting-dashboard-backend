import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddlewareMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('coucou')
    next();
  }
}
