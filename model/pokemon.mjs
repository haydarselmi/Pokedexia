export class Pokemon {
    /**
     * Constructor of the Pokemon class
     * @param id - id of the Pokemon in the files
     * @param name - name of the Pokemon
     * @param types - Types array of the Pokemon
     * @param abilities - Abilities array of the Pokemon
     * @param imageFile - Image of the Pokemon
     */
    constructor(id, name, types, abilities, imageFile) {
        if(id != undefined) {
            this.id = id;
        } else {
            this.id = parseInt(    Math.floor(Math.random() * Math.floor(100000))     );
        }
        if(name != undefined) {
            this.name = name;
        }
        if(types != undefined) {
            this.types = types;
        }
        if(types != undefined) {
            this.abilities = abilities;
        }
        if(imageFile != undefined) {
            this.imageFile = this.imageFile;
        }
        this.imageFile = "1.png";
    }
}