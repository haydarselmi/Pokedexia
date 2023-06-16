import { Pokemon } from "./pokemon.mjs";
import fs from "fs";
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

/**
 * Service class working with the Pokemon class and interfaces
 * with the pokemons.json storage file.
 */
export class PokemonService {
    /* Attributs d'instance */
    static typesArray = this.types;
    static abilitesArray = this.abilites;
    static pokemons = this.pokemons;
    /**
     * Constructor of the PokemonService class
     * Read the types abilities and pokemons from the data folder and
     * casts to Array for manipulation
     */
    constructor() {
        this.typesArray = Array.from(
            JSON.parse(fs.readFileSync(path.resolve(__dirname, './data/types.json')))
            );
        this.abilitesArray = Array.from(
            JSON.parse(fs.readFileSync(path.resolve(__dirname, './data/abilities.json')))
            );
        this.pokemons = Array.from(
            JSON.parse(fs.readFileSync(path.resolve(__dirname, './data/pokemons.json')))
            );
    }

    /* Métodes d'instance */
    /**
     * Adds a pokemon to the array and writes it in the file of pokemons.json
     * @param {*} pokemonData 
     */
    async addPokemon(pokemonData) {
        let pokemon;
        try {
            let id = this.pokemons.length + 1;
            
            let types = String(pokemonData.types).split(',');
            let abilities = String(pokemonData.abilities).split(',');
            types.pop();
            abilities.pop();
            pokemon = new Pokemon(id, pokemonData.name, types, abilities, "1.png");
        } catch(err) {
            throw err;
        }
        this.pokemons.push(pokemon);
        fs.writeFileSync(path.resolve(__dirname, './data/pokemons.json'), JSON.stringify(this.pokemons));
        console.log(this.pokemons);
    }

    /**
     * Edits a pokemon with the new date modifies in the array and modifies
     * in the stored pokemons.json file.
     * @param {*} pokemonData 
     */
    async editPokemon(pokemonData) {
        let array1 = new Array();
        let array2 = new Array();
        array1 = pokemonData.types.split(",");
        array1.pop();
        array2 = pokemonData.abilities.split(",");
        array2.pop()
        this.pokemons[pokemonData.id - 1].name = pokemonData.name;
        this.pokemons[pokemonData.id - 1].types = array1;
        this.pokemons[pokemonData.id - 1].abilities = array2;
        fs.writeFileSync(path.resolve(__dirname, './data/pokemons.json'), JSON.stringify(this.pokemons));
    }

    /**
     * Removes the pokemon of the given id if found
     * removes it from the array and updates the new pokemons list
     * in the stored pokemons.json file.
     * @param {*} id 
     * @returns 
     */
    removePokemon(id) {
        let index = this.pokemons.findIndex(e=> e.id == id);
        if(index >-1 ){
			this.pokemons.splice(index,1);
            fs.writeFileSync(path.resolve(__dirname, './data/pokemons.json'), JSON.stringify(this.pokemons));
			return `removed Pokemon of id ${id}`;
		}
		throw new Error(`cannot find Pokemon of id ${id}`);
    }
}