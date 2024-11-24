import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";

//c3ulnta0rK: /url/:param?query=value

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
