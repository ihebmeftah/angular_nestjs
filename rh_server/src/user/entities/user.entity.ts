import { BaseEntity } from "database/base.entity";
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../entities/role.enum';
import { UUID } from "crypto";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: UUID;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: 'enum', enum: Role })
    role: Role;

    @Column({ default: true })
    active: boolean;

    @Column({ nullable: true })
    photo: string;
}