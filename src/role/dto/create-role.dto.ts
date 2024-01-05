import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Permission } from '../enums/permission.enum';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEnum(Permission, { each: true })
  @IsNotEmpty()
  readonly permissions: Permission[];
}
