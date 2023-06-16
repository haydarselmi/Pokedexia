import express from "express";
import bodyParser from "body-parser";
import { PokemonService } from "./model/PokemonService.mjs";
import { join, dirname } from "path";
import ejs from "ejs"
import cors from "cors"

const pokedexia = express();
const port = 3000;
let pokemonService = new PokemonService();
// parse application/json
pokedexia.use(bodyParser.json());
// parse application/x-www-form-urlencoded
pokedexia.use(bodyParser.urlencoded({ extended: false }));
pokedexia.use(cors());
pokedexia.set("view engine", "ejs");
pokedexia.use(express.static("assets"));

// Gets all the pokemons types and abilities and renders the Pokedexia Web page.
pokedexia.get("/", (req, res) => {
    res.render("index", {
        "abilities": pokemonService.abilitesArray,
        "types": pokemonService.typesArray,
        "pokemons": pokemonService.pokemons
    });
});

// modifies a pokemon with the new data from a patch HTTP request
pokedexia.patch("/", (req, res) => {
    console.log(req.body);
    pokemonService.editPokemon(req.body);
    res.render("index", {
        "abilities": pokemonService.abilitesArray,
        "types": pokemonService.typesArray,
        "pokemons": pokemonService.pokemons
    });
})

// Add a new pokemon from a post HTTP request
pokedexia.post("/", (req, res) => {
    console.log(req.body);
    pokemonService.addPokemon(req.body);
    res.end();
});

// Deletes the pokemon of the given id received from a delete HTTP request
pokedexia.delete("/:id", (req, res) => {
    let id = req.params.id;
    console.log(id);
    pokemonService.removePokemon(id);
    res.end();
}),


pokedexia.listen(port, () => {
    console.log(`Pokedexia app listening on port ${port}`)
});