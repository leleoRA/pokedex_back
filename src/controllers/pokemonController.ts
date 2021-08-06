import { Request, Response } from "express";

import * as pokemonService from "../services/pokemonService";

export async function getPokemons(req: Request, res: Response){
    try{
        const userId = res.locals.id;
        const pokemons = await pokemonService.getPokemons(userId);
        return res.send(pokemons);

    } catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

export async function addPokemon(req: Request, res: Response) {
    try{
        const userId = res.locals.userId;
        const pokemonId = Number(req.params.id);
    
        await pokemonService.addPokemon(userId, pokemonId)
    
        res.sendStatus(200)

    } catch(e){
        console.log(e)
        res.sendStatus(500)
    }
    
}

export async function removePokemon(req: Request, res: Response) {
    try{
        const userId = res.locals.userId;
        const pokemonId = Number(req.params.id);
    
        await pokemonService.removePokemon(userId, pokemonId)
    
        res.sendStatus(200)
        
    } catch(e){
        console.log(e)
        res.sendStatus(500)
    }
    
}