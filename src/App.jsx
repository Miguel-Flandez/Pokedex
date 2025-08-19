import './App.css'
import { useState, useEffect, useRef } from "react";

function App() {

const [dex, setDex] = useState([])
  const [pokeData, setPokeData] = useState()
  const [speciesData, setSpeciesData] = useState()
  const [selected, setSelected] = useState('arceus');
  const [page, setPage] = useState(1)
  const [main, setMain] = useState(true);

  const inputRef = useRef(null)
  
  let cries = new Audio()

  const typeColors = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-300",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-700",
  ghost: "bg-indigo-700",
  dragon: "bg-purple-700",
  dark: "bg-gray-700",
  steel: "bg-gray-500",
  fairy: "bg-pink-300"
};


  useEffect(()=>{

    async function pokemonData() {
      const [pokeres, speciesres]= await Promise.all([fetch(`https://pokeapi.co/api/v2/pokemon/${selected}`), fetch(`https://pokeapi.co/api/v2/pokemon-species/${selected}`)])

      const pokedata = await pokeres.json();
      const speciesdata = await speciesres.json()

      setPokeData(pokedata)
      setSpeciesData(speciesdata)

      cries.src = pokedata?.cries.latest
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

      {main && 
      <div id='main-page'>
        <header  header className="py-2 bg-gradient-to-b from-red-500 to-red-900 font-mono text-white flex justify-center items-center border-b-3 border-black"
        style={{textShadow: '2px 2px 6px black'}}>
            Pokédex
        </header>
        <div className="flex py-4 px-2 h-[540px]">
          <div id="basic-info" className=' flex flex-col  items-center w-1/2 gap-25'>
            <div id="pokemon-name" className='bg-white flex border-3 rounded-md'>
                <div className='bg-red-500 border-r-3 border-red-200 w-6'></div>
                <input ref={inputRef} className='py-2 px-4 border-y-3 border-red-200 placeholder-black text-center' 
                placeholder={selected.replace(/^\w/, c=>c.toUpperCase()).replaceAll('-', ' ') || 'Ditto...'}
                onKeyDown={e => e.key==='Enter'? setSelected(inputRef.current.value):null}
                type="text" />
                {/* <span className='py-2 px-4 border-y-3 border-red-200'>{ selected.replace(/^\w/, c=>c.toUpperCase()).replaceAll('-', ' ') || 'Ditto...'}</span>   */}
                <div className='bg-red-500 border-l-3 border-red-200 w-6'></div>
            </div>
            <img src={ pokeData?.sprites.versions['generation-v']['black-white']['front_default'] || pokeData?.sprites.versions['generation-v']['black-white']['front_default'] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/132.png'} className='w-50 h-50' />
            <div className='bg-white flex border-3 rounded-md'>
              <div className='bg-red-500 border-r-3 border-red-200 w-6'></div>
              <span className='py-2 px-4 border-y-3 border-red-200 hover:bg-red-200 cursor-pointer' onClick={()=>setMain(prev=>!prev)}>Details</span>
              <div className='bg-red-500 border-l-3 border-red-200 w-6'></div>
            </div>
          </div> 
          <div id="pokemon-list" className='border-3 border-black bg-white w-1/2 rounded-md flex flex-col gap-2 overflow-y-auto px-1 relative' >
            <div className='bg-red-500 w-12'></div>
            {dex.length ? 
            dex.map((pokemon, index)=>{

              const  group = <div className={`${selected===pokemon.name? 'border-3 border-red-400 rounded-lg':''} cursor-pointer p-1`} onClick={()=>setSelected(pokemon.name)} key={index}>{ pokemon.url.split('/').filter(Boolean).pop() + ' ' + pokemon.name.replaceAll('-', ' ').replace(/^\w/, c=>c.toUpperCase())}</div>
            
              return group
            })
            :
            <div>
              <img className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8/10' src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/493.png' alt="Arceus" />
              <h1 className='text-center'>Creating all Pokemon...</h1>
            </div>
          }
          </div>
        </div>
      </div>
      }
      
      

      {!main && 
      <div id="details">
        <header className="py-2 px-8 bg-gradient-to-b from-red-500 to-red-900 font-mono text-white flex items-center border-b-3 border-black cursor-pointer">
          <div className='flex gap-16'>
            <div className='hover:text-black' onClick={()=>setPage(prev=> page!==1 ? prev-1 : prev)}>◀</div>
            <span className={`${page === 1 ? 'underline decoration-2' : null } hover:text-black`} onClick={()=>setPage(1)}>DETAILS</span>
            <span className={`${page === 2 ? 'underline decoration-2' : null } hover:text-black`} onClick={()=>setPage(2)}>AREA</span>
            <span className={`${page === 3 ? 'underline decoration-2' : null } hover:text-black`} onClick={()=>setPage(3)}>FORMS</span>
            <div className='hover:text-black' onClick={()=>setPage(prev=> page!==3 ? prev+1 : prev)}>▶</div>
          </div>

          <div>

          </div>
          
        </header>

        <div id='details-content' className='flex flex-col'>
          <div id="details-content-top" className='flex gap-60 mt-2'>
            <div id="left" className='relative'>
              <div id='back-button' className='bg-white flex absolute border-3 rounded-md m-2'> 
                  <div className='bg-red-500 border-r-3 border-red-200 w-6'></div>
                    <span className='py-2 px-4 border-y-3 border-red-200 hover:bg-red-200 cursor-pointer' onClick={()=>setMain(prev=>!prev)}>Back</span>
                  <div className='bg-red-500 border-l-3 border-red-200 w-6'></div>
              </div>

              <img src={ pokeData?.sprites.versions['generation-v']['black-white']['front_default'] || pokeData?.sprites.versions['generation-v']['black-white']['front_default'] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/132.png'} className='w-62 ml-22 mt-22' />
            </div>

            <div id="right" className='flex flex-col gap-16'>
              <div id="pokemon-nametag" className='flex flex-col border-3 rounded-md bg-white text-4xl'>
                <div className='bg-red-500 flex gap-2 border-b-3 border-red-200  py-1 px-6 text-white'>
                  <span>{String(pokeData?.id).padStart(3, '0')}</span>
                  <span>{selected.replace(/^\w/, c=>c.toUpperCase())}</span>
                </div>
                <span className='py-1 px-6'>{speciesData?.genera[7].genus}</span>
                
              </div>
              <div id="type" className={`${typeColors[pokeData?.types[0].type.name]} border-2 border-black rounded-md py-6 text-white text-center text-4xl`}>
                <span id="type" className=''>
                {pokeData?.types[0].type.name.replaceAll(/[A-Za-z]/g, c=>c.toUpperCase())}
                </span>
              </div>
              
            </div>

          </div>
          <div id="details-content-bottom" className='rounded-md border-2 border black mx-2 mb-2 flex justify-between bg-white'>
            <div className='bg-red-500 border-r-3 border-red-200 w-6'></div>
            <span className='border-y-2 border-red-200 text-center w-full pt-2 h-45'>{speciesData?.['flavor_text_entries'][21]['flavor_text']}</span>
            <div className='bg-red-500 border-l-3 border-red-200 w-6'></div>
          </div>
      
        </div>

        

        
      </div>
      }
    </div>
    
  )
  
}

export default App
