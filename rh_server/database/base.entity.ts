import { CreateDateColumn, DeleteDateColumn, VersionColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
    @CreateDateColumn({
        type: Date,
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: Date,
        name: 'updated_at',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        type: Date,
        name: 'deleted_at',
    })
    deletedAt: Date;

    @VersionColumn()
    version: number;
}