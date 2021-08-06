import "./setup";

import express from "express";
import cors from "cors";
import axios from "axios";
import "reflect-metadata";

import connectDatabase from "./database";
import Pokemons from "./entities/Pokemons";
import * as userController from "./controllers/userController";
import * as pokemonController from "./controllers/pokemonController";
import { getRepository } from "typeorm";
import { authenticate } from "./middlewares/authenticate";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);
app.post("/sign-in", userController.signIn);
app.get("/pokemons", authenticate, pokemonController.getPokemons);
app.post("/my-pokemons/:id/add", authenticate, pokemonController.addPokemon);
app.post("/my-pokemons/:id/remove", authenticate, pokemonController.removePokemon);

app.get("/populate", async (req,res)=>{
 
  for(let i=1; i<200; i++){
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
    const newPokemon = {
      id: result.data.id,
      name: result.data.name,
      number: result.data.order,
      image: result.data.sprites.front_default,
      weight: result.data.weight,
      height: result.data.height,
      baseExp: result.data.base_experience,
      description: ""
    }
 
    const speciesResult = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
    newPokemon.description = speciesResult.data.flavor_text_entries[0].flavor_text.split("\n").join(" ")
    const pokemon = getRepository(Pokemons).create(newPokemon)
    const resultquery = await getRepository(Pokemons).save(pokemon)
  }
  res.send("OK")
})

export async function init () {
  await connectDatabase();
}

export default app;
