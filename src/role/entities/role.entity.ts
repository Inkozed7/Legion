import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable } from 'typeorm';


@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;

    @Column()
    description: string;

    @ManyToOne(()=> UserEntity, (user)=> user.roles)
    user: UserEntity
}
