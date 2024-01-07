import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RequiredPermission } from '../auth/auth.guard';
import { Permission } from './enums/permission.enum';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @RequiredPermission(Permission.CreateRole)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @RequiredPermission(Permission.ReadRole)
  findAll(@Paginate() query: PaginateQuery) {
    return this.roleService.findAll(query);
  }

  @Get(':id')
  @RequiredPermission(Permission.ReadRole)
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @RequiredPermission(Permission.UpdateRole)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @RequiredPermission(Permission.DeleteRole)
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
