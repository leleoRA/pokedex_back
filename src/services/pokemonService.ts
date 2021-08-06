import { getRepository } from "typeorm";

import User from "../entities/User";
import Pokemons from "../entities/Pokemons";
import PokemonUser from "../entities/PokemonUser";

export async function getPokemons(userId: number) {
    const pokemons = await getRepository(Pokemons).find();
    const pokemonsUser = await getRepository(PokemonUser).find({where : {userId}})
    const listOfUserPokemons = pokemons.map(p => { pokemonsUser.forEach(up => { if (p.id === up.pokemonId) {
        p.inMyPokemons = true
      } 
      })
        return p
      });
    
      return listOfUserPokemons;
}

export async function addPokemon(userId: number, pokemonId: number) {
   await getRepository(PokemonUser).insert({ userId, pokemonId})
}

export async function removePokemon(userId: number, pokemonId: number) {
   await getRepository(PokemonUser).delete({ userId, pokemonId})
}