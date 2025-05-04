import { UUID } from 'crypto';
import { TimestampBaseEntity } from 'database/timestamp.base';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Timetable extends TimestampBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;
    @Column()
    startDate: Date;
    @Column()
    endDate: Date;
    @Column()
    startTime: string;
    @Column()
    endTime: string;
    @Column({ default: false })
    validated: boolean;
    @Column()
    userId: UUID;
    @ManyToOne(() => User)
    user: User;
}
