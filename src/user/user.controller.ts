import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from "@nestjs/common";
import { UserService } from './user.service';
import { User } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt.guard";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Get()
  findAll(@Query('term') term: string) {
    return this.userService.findAll(term);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: User) {
    return this.userService.update(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
