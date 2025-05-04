import { UserBaseEntity } from "database/user.base";
import { UserRole } from "src/enums/user_roles.enum";
import { Column, Entity } from 'typeorm';


@Entity()
export class User extends UserBaseEntity {
    @Column({ enum: UserRole })
    role: UserRole;
    @Column({ default: 8 })
    congeNb: number;
}
