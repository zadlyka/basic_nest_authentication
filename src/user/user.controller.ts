import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequiredPermission } from 'src/auth/auth.guard';
import { Permission } from 'src/role/enums/permission.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @RequiredPermission(Permission.CreateUser)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @RequiredPermission(Permission.ReadUser)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @RequiredPermission(Permission.ReadUser)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @RequiredPermission(Permission.UpdateUser)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @RequiredPermission(Permission.DeleteUser)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}