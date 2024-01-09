import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Permission } from '../enums/permission.enum';
import { Transform } from 'class-transformer';
export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  readonly name: string;

  @IsEnum(Permission, { each: true })
  @IsNotEmpty()
  readonly permissions: Permission[];
}
