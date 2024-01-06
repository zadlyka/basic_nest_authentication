import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Role } from 'src/role/entities/role.entity';
import { Permission } from 'src/role/enums/permission.enum';
import { RoleId } from 'src/role/enums/role-id.enum';

export class Role1704523572371 implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<any> {
    const roleRepository = dataSource.getRepository(Role);
    await roleRepository.save({
      id: RoleId.Admin,
      name: 'Admin',
      permissions: [Permission.ManageAll],
    });

    await roleRepository.save({
      id: RoleId.User,
      name: 'User',
      permissions: [Permission.ReadUser, Permission.ReadRole],
    });
  }
}
