import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [dex, setDex] = useState([])
  const [pokeData, setPokeData] = useState()
  const [selected, setSelected] = useState('bulbasaur');

  let cries = new Audio()

  useEffect(()=>{

    async function pokemonData() {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${selected}`)
      const data = await res.json();

      setPokeData(data)
      cries.src = data?.cries.legacy
      cries.play()
    }

    pokemonData()
  },[selected])


  useEffect(()=>{
    async function getPokemon() {
      let link = 'https://pokeapi.co/api/v2/pokemon'
      let allPokemon = []

      while(link){
      const res = await fetch(link)
      const data = await res.json()

      allPokemon = [...allPokemon, ...data.results]
      link = data.next;
      }
      
      setDex(allPokemon)
    }
    getPokemon()
  },[])

  return (
    <div>
      <header  header className="py-2 bg-gradient-to-b from-red-500 to-red-900 font-mono text-white flex justify-center items-center"
      style={{textShadow: '2px 2px 6px black'}}>
          Pokédex
      </header>
      <div className="flex py-4 px-2 h-[540px]">
        <div id="basic-info" className=' flex flex-col  items-center w-1/2 gap-30'>
          <div id="pokemon-name" className='flex border-2 rounded-md px-6 py-2'>
              <span>{ selected.replace(/^\w/, c=>c.toUpperCase())|| 'Ditto...'}</span>  
          </div>
          <img src={ pokeData?.sprites.versions['generation-v']['black-white']['front_default'] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/132.png'} className='w-50 h-50' />
          
        </div> 
        <div id="pokemon-list" className='border-2 border-black w-1/2 rounded-md flex flex-col overflow-y-auto' >

          {dex.map((pokemon, index)=>{
            return <div className={`${selected===pokemon.name? 'bg-red-400':''} cursor-pointer`} onClick={()=>setSelected(pokemon.name)} key={index}>{pokemon.name.replaceAll('-', ' ').replace(/^\w/, c=>c.toUpperCase())}</div>
          })}

        </div>
      </div>
  </div>
    
  )
}

export default App
