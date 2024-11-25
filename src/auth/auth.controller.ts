import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Credentials, JWT } from "../models";

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() credentials: Credentials): Promise<JWT | undefined> {
    return this.authService.login(credentials);
  }
}
