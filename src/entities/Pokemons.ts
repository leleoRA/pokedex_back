import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import User from "./User";
import PokemonUser from "./PokemonUser";

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

  @OneToMany(() => PokemonUser, PokemonUser => PokemonUser.pokemons)
  PokemonUser: PokemonUser[]; 
}
