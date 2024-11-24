import { Body, Controller, Post } from "@nestjs/common";
import { LoginService } from "./login.service";
import { Credentials } from "./login.model";

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() credentials: Credentials) {
    this.loginService.login(credentials);
  }
}
