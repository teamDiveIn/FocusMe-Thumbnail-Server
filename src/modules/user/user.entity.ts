import { DateTime } from 'aws-sdk/clients/devicefarm'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  user_idx: number

  @Column()
  user_id: string

  @Column()
  nickname: string

  @Column()
  password: string

  @Column()
  level: boolean

  @Column('datetime')
  createdAt: DateTime

  @Column('datetime')
  updatedAt: DateTime
}
