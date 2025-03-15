import { UserBaseEntity } from "database/user.base";
import { Column, Entity } from 'typeorm';
import { UserRole } from "./user_roles.enum";


@Entity()
export class User extends UserBaseEntity { 
    @Column({enum: UserRole})
    role: UserRole;

}
