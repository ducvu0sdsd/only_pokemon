export interface Pokemon {
    id: number,
    name: string,
    sprites: {
        front_default: string
    }
}

export interface Pokemons {
    name: string,
    url: String
}

export interface PokemonDetail extends Pokemon {
    abilities: string[]
}