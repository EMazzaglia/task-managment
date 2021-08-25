import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum.ts';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true }) // exclude the field from json responses
  user: User;

  /*
    first parameter: specify the type that the "many" are going to.
    In this case a task can be owned by only ONE user.

    second parameter: specify how to get the tasks from the Task point of view

    third parameter: Not automatilly fetch the user while getting tasks
    @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  user: User;
  */
}
