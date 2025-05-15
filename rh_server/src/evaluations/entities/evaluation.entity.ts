import { UUID } from 'crypto';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Evaluation {
    @PrimaryGeneratedColumn('uuid')
    id: UUID
    @Column()
    rating: number
    @Column({ nullable: true })
    feedback: string
    @ManyToOne(() => User, { onDelete: "CASCADE" })
    user: User
    @Column()
    day: string
}
