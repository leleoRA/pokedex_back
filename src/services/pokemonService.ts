import { getRepository } from "typeorm";

import Pokemons from "../entities/Pokemons";

export async function getPokemons() {
    const pokemons = await getRepository(Pokemons).find();
    return pokemons;
}