import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";

export type Toto = {
  coucou: string
}

//c3ulnta0rK: /url/:param?query=value

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get(':id')
  // coucou(@Param('id') id: string): string {
  //   return id + 1;
  // }
  //
  // @Get('hello')
  // getHello(): string {
  //   return 'hello';
  // }
  //
  // @Post('hello')
  // postHello(@Body() couc: Toto): string {
  //   return this.appService.getHello();
  // }
}
