import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import User from "./User";
import Pokemons from "./Pokemons";

@Entity("pokemonUser")
export default class PokemonUser{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    pokemonId: number;

    @ManyToOne(() => Pokemons, pokemons => pokemons.PokemonUser)
    pokemons: Pokemons;

    @ManyToOne(() => User, user => user.PokemonUser)
    user: User;
}