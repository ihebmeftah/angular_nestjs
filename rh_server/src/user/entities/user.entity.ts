import { UserBaseEntity } from "database/user.base";
import { Entity } from 'typeorm';


@Entity()
export class User extends UserBaseEntity { }
