import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import Pokemons from "./Pokemons";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Pokemons, (pokemons) => pokemons.user)
  pokemons: Pokemons[]
}
