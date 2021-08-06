import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import User from "./User"

@Entity("sessions")
export default class Sessions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  user: User;
}