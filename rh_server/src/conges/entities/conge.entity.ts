import { UUID } from 'crypto';
import { TimestampBaseEntity } from 'database/timestamp.base';
import { CongeType } from 'src/enums/conge_type.enum';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Conge extends TimestampBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;
    @Column()
    congeType: CongeType;
    @Column()
    start: Date;
    @Column()
    end: Date;
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;
    @Column({ default: null, nullable: true })
    isAccepted: boolean;
}
