import { UserBaseEntity } from "database/user.base";
import { Entity } from 'typeorm';

@Entity()
export class Admin extends UserBaseEntity { }
