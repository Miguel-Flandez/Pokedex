import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [dex, setDex] = useState(0)

  useEffect(()=>{
    async function getPokemon() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon')
      const data = await res.json()
      setDex(data)
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
        {/* <div id="basic-info" className=' flex flex-col  items-center w-1/2 gap-30'>
          <div id="pokemon-name" className='flex border-2 rounded-md px-6 py-2'>
              <span>{ dex?.forms?.[0].name.charAt(0).toUpperCase() + dex?.forms?.[0]?.name.slice(1)|| 'Ditto...'}</span>  
          </div>
          <img src={dex?.sprites?.versions?.['generation-iv']['diamond-pearl'].front_default || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/132.png'} className='w-50 h-50' />
          
        </div> */}
        <div id="pokemon-list" className='border-2 border-black w-1/2 rounded-md flex flex-col overflow-y-auto' >

          {dex?.results?.map((pokemon, index)=>{
            return <div key={index}>{pokemon.name}</div>
          })}

        </div>
      </div>
  </div>
    
  )
}

export default App
