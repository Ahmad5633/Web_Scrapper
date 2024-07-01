import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  summary: string;
}
