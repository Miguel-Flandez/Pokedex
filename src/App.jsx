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
      cries.src = data?.cries.latest
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
      <header  header className="py-2 bg-gradient-to-b from-red-500 to-red-900 font-mono text-white flex justify-center items-center border-b-3 border-black"
      style={{textShadow: '2px 2px 6px black'}}>
          Pokédex
      </header>
      <div className="flex py-4 px-2 h-[540px]">
        <div id="basic-info" className=' flex flex-col  items-center w-1/2 gap-25'>
          <div id="pokemon-name" className='bg-white flex border-3 rounded-md'>
              <div className='bg-red-500 border-r-3 border-red-200 w-6'></div>
              <input className='py-2 px-4 border-y-3 border-red-200 placeholder-black text-center' 
              placeholder={selected.replace(/^\w/, c=>c.toUpperCase()).replaceAll('-', ' ') || 'Ditto...'}
              // onKeyDown={e => e==='Enter'?setSelected(input.value):null}
               type="text" />
              {/* <span className='py-2 px-4 border-y-3 border-red-200'>{ selected.replace(/^\w/, c=>c.toUpperCase()).replaceAll('-', ' ') || 'Ditto...'}</span>   */}
              <div className='bg-red-500 border-l-3 border-red-200 w-6'></div>
          </div>
          <img src={ pokeData?.sprites.versions['generation-v']['black-white']['front_default'] || pokeData?.sprites.versions['generation-v']['black-white']['front_default'] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/132.png'} className='w-50 h-50' />
          <div className='bg-white flex border-3 rounded-md'>
            <div className='bg-red-500 border-r-3 border-red-200 w-6'></div>
            <span className='py-2 px-4 border-y-3 border-red-200 hover:bg-red-200 cursor-pointer'>Details</span>
            <div className='bg-red-500 border-l-3 border-red-200 w-6'></div>
          </div>
        </div> 
        <div id="pokemon-list" className='border-3 border-black bg-white w-1/2 rounded-md flex flex-col gap-2 overflow-y-auto px-1' >
          <div className='bg-red-500 w-12'></div>
          {dex.map((pokemon, index)=>{

            const  group = <div className={`${selected===pokemon.name? 'border-3 border-red-400 rounded-lg':''} cursor-pointer p-1`} onClick={()=>setSelected(pokemon.name)} key={index}>{ pokemon.url.split('/').filter(Boolean).pop() + ' ' + pokemon.name.replaceAll('-', ' ').replace(/^\w/, c=>c.toUpperCase())}</div>
          
           
            return group
          })}

        </div>
      </div>
  </div>
    
  )
}

export default App
