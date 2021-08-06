import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import User from "./User";

@Entity("pokemons")
export default class Pokemons{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  number: number;

  @Column()
  image: string;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  baseExp: number;

  @Column()
  description: string;

  @Column({type: "boolean", default: false})
  inMyPokemons: boolean;

  @ManyToOne(() => User, (user) => user.pokemons)
  user: User;
}
