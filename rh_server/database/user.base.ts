import { TimestampBaseEntity } from "./timestamp.base";
import { Column, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "crypto";
import { UserRole } from "src/enums/user_roles.enum";

export class UserBaseEntity extends TimestampBaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: UUID
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    active: boolean;

    @Column({ nullable: true })
    photo: string;
}