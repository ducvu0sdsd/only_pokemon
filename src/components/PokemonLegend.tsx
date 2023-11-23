import React from 'react'
import { PokemonDetail } from '../interface'

interface Props {
    pokemons: PokemonDetail[],
    setPokemon: (value: PokemonDetail) => void
}

const PokemonLegend = (props: Props) => {

    const { pokemons, setPokemon } = props

    const handleShowViewDetail: (value: PokemonDetail) => void = (pokemon) => {
        setPokemon(pokemon)
    }
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {pokemons.map((pokemon) => {
                return (
                    <div onClick={() => handleShowViewDetail(pokemon)} key={pokemon.id} className='item' style={{ backgroundColor: 'white', borderRadius: '15px', margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100px', height: '150px', cursor: 'pointer' }}>
                        <p className='pokemon-name'>{pokemon.name}</p>
                        <img src={pokemon.sprites.front_default} width={'100%'} />
                    </div>
                )
            })}
        </div>
    )
}

export default PokemonLegend
