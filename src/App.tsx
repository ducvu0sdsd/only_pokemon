import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios';
import PokemonLegend from './components/PokemonLegend';
import { Pokemons, PokemonDetail } from './interface';

const App: React.FC = () => { // FC : Functional Component

  const [pokemons, setPokemons] = useState<PokemonDetail[]>([])
  const [nextUrl, setNextUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null)

  useEffect(() => {
    setIsLoading(true)
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=20')
      .then(res => {
        setNextUrl(res.data.next)
        res.data.results.forEach((pokemon: Pokemons) => {
          axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            .then(res => {
              let abilities: string[] = res.data.abilities.map((ab: { ability: { name: string } }) => {
                return ab.ability.name
              })
              setPokemons((p) => [...p, { ...res.data, abilities }])
              setIsLoading(false)
            })
        })
      })
  }, [])

  const handleLoadMore: () => void = () => {
    setIsLoading(true)
    axios.get(nextUrl)
      .then(res => {
        setNextUrl(res.data.next)
        res.data.results.forEach((pokemon: Pokemons) => {
          axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            .then(res => {
              let abilities: string[] = res.data.abilities.map((ab: { ability: { name: string } }) => {
                return ab.ability.name
              })
              setPokemons((p) => [...p, { ...res.data, abilities }])
            })
          setIsLoading(false)
        });
      })
  }

  const handleCloseViewDetail: () => void = () => {
    setPokemon(null)
  }

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        {pokemon ?
          <div key={pokemon.id} className='pokemon-detail'>
            <button onClick={() => handleCloseViewDetail()} className='btn-close'>x</button>
            <span className='pokemon-name' style={{ fontSize: '25px' }}>{pokemon.name}</span>
            <img src={pokemon.sprites.front_default} width={'100%'} />
            {pokemon.abilities.map((ability, index) => (
              <span key={index} className='skill'>Skill {index + 1}: {ability}</span>
            ))}
          </div> :
          <>
            <PokemonLegend pokemons={pokemons} setPokemon={setPokemon} />
            <button className='btn-load' onClick={() => handleLoadMore()}>{isLoading ? "Loading..." : "Load More"}</button>
          </>}
      </div>
    </div>
  );
}

export default App;
