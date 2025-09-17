import './App.css'
import { useState, useEffect, useRef } from "react";

function App() {

const [dex, setDex] = useState([])
  const [pokeData, setPokeData] = useState()
  const [speciesData, setSpeciesData] = useState()
  const [selected, setSelected] = useState('arceus');
  const [preEvo, setPreEvo] = useState()
  const [currentEvo, setCurrentEvo] = useState()
  const [evo, setEvo] = useState()
  const [page, setPage] = useState(1)
  const [main, setMain] = useState(true);
  const [details, setDetails] = useState(1);

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
    setPokeData(null)
    setSpeciesData(null)
    setEvo(null)
    setPreEvo(null)

    async function pokemonData() {
      const [pokeres, speciesres] = await Promise.all([fetch(`https://pokeapi.co/api/v2/pokemon/${selected}`), 
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${selected}`)
    ])

      const pokedata = await pokeres.json();
      const speciesdata = await speciesres.json()

      setPokeData(pokedata)
      setSpeciesData(speciesdata)
      
      const evochain = await fetch(speciesdata?.['evolution_chain']?.url)
      const evochaindata = await evochain.json()

      const preevoName = evochaindata?.chain?.species?.name
      const currentName = evochaindata?.chain?.['evolves_to']?.[0]?.species.name
      const evoName = evochaindata?.chain?.['evolves_to']?.[0]?.['evolves_to']?.[0]?.species?.name

      const [preEvoRes, currentRes, evoRes] = await Promise.all([fetch(`https://pokeapi.co/api/v2/pokemon/${preevoName}`),
        fetch(`https://pokeapi.co/api/v2/pokemon/${currentName}`),
        fetch(`https://pokeapi.co/api/v2/pokemon/${evoName}`)
      ])

      const preEvoData = await preEvoRes.json()
      const currentData = await currentRes.json()
      const evoData = await evoRes.json()

      setPreEvo(preEvoData)
      setCurrentEvo(currentData)
      setEvo(evoData)

      console.log(preevoName)
      console.log(evoName)

      cries.src = pokedata?.cries?.latest || ''
      cries.play().catch(()=>{})
    }
    console.log(selected)
    
    console.log(pokeData?.sprites?.versions?.['generation-v']?.['black-white']?.['front_default'])
    console.log(String(pokeData?.id).padStart(3, '0'))
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
{/* main section */}
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
                placeholder={selected?.replace(/^\w/, c=>c.toUpperCase()).replaceAll('-', ' ') || 'Ditto...'}
                onKeyDown={e => e.key==='Enter'? setSelected(inputRef.current.value):null}
                type="text" />
                {/* <span className='py-2 px-4 border-y-3 border-red-200'>{ selected.replace(/^\w/, c=>c.toUpperCase()).replaceAll('-', ' ') || 'Ditto...'}</span>   */}
                <div className='bg-red-500 border-l-3 border-red-200 w-6'></div>
            </div>
            <img src={ pokeData?.sprites?.versions?.['generation-v']?.['black-white']?.['front_default'] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/132.png'} className='w-50 h-50' />
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

              const  group = <div className={`${selected===pokemon.name? 'border-3 border-red-400 rounded-lg':''} cursor-pointer p-1`} onClick={()=>setSelected(pokemon.name)} key={index}>{  pokemon.url.split('/').filter(Boolean).pop() + ' ' + pokemon.name.replaceAll('-', ' ').replace(/^\w/, c=>c.toUpperCase())}</div>
            
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
      
      
{/* details section */}
      {!main && 
      <div id="details">
        <header className={`${details===1 ? 'bg-gradient-to-b from-red-500 to-red-900' : 'bg-gradient-to-b from-[#bf6de3] to-[#744289]' } py-2 px-8 font-mono text-white flex items-center border-b-3 border-black cursor-pointer`}>
          <div className='flex gap-16'>
            <div className='hover:text-black' onClick={()=>{setPage(prev=> page!==1 ? prev-1 : prev); setDetails(prev=>details!==1 ? prev-1 : prev)}}>◀</div>
            <span className={`${page === 1 ? 'underline decoration-2' : null } hover:text-black`} onClick={()=>{setPage(1); setDetails(1);}}>DETAILS</span>
            <span className={`${page === 2 ? 'underline decoration-2' : null } hover:text-black`} onClick={()=>{setPage(2); setDetails(2);}}>EVOLUTION</span>
            <span className={`${page === 3 ? 'underline decoration-2' : null } hover:text-black`} onClick={()=>{setPage(3); setDetails(3);}}>FORMS</span>
            <div className='hover:text-black' onClick={()=>{setPage(prev=> page!==3 ? prev+1 : prev); setDetails(prev=> details!==3 ? prev+1 : prev)}}>▶</div>
          </div>

          <div>

          </div>
          
        </header>

        {details===1 && 
        <div id='details-content' className='flex flex-col gap-2'>
          <div id="details-content-top" className='flex gap-60 mt-2'>
            <div id="left" className='relative'>
              <div id='back-button' className='bg-white flex absolute border-3 rounded-md m-2'> 
                  <div className='bg-red-500 border-r-3 border-red-200 w-6'></div>
                    <span className='py-2 px-4 border-y-3 border-red-200 hover:bg-red-200 cursor-pointer' onClick={()=>setMain(prev=>!prev)}>Back</span>
                  <div className='bg-red-500 border-l-3 border-red-200 w-6'></div>
              </div>

              <img src={ pokeData?.sprites?.versions?.['generation-v']?.['black-white']?.['front_default'] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/132.png'} className='w-62 ml-22 mt-22' />
            </div>

            <div id="right" className='flex flex-col gap-16'>
              <div id="pokemon-nametag" className='flex flex-col border-3 rounded-md bg-white text-4xl'>
                <div className='bg-red-500 flex gap-2 items-center border-b-3 border-red-200  py-1 px-6 text-white'>
                  <img src="/images/pokeball.png" alt="" id="pokeball" className='w-10 h-10'/>
                  <span>{pokeData ? String(pokeData?.id).padStart(3, '0'):''}</span>
                  <span>{selected?.replace(/^\w/, c=>c.toUpperCase()).replaceAll(/[-]/g,' ')}</span>
                </div>
                <span className={`${!speciesData ? 'bg-red-500' : 'py-1 px-6'} `}>{speciesData?.genera?.[7]?.genus}</span>
                
              </div>
              <div id="type" className={`${typeColors[pokeData?.types?.[0]?.type?.name] || 'border-0 border-none'} border-2 border-black rounded-md py-6 text-white text-center text-4xl`}>
                <span id="type" className=''>
                {pokeData?.types?.[0]?.type?.name?.replaceAll(/[A-Za-z]/g, c=>c.toUpperCase())}
                </span>
              </div>
              
            </div>

          </div>
          <div id="details-content-bottom" className='rounded-md border-2 border-black mx-2 flex justify-between bg-white'>
            <div className='bg-red-500 border-r-3 border-red-200 w-6'></div>
            <span className='border-y-2 border-red-200 text-center text-3xl w-full p-4 h-45'>{speciesData?.['flavor_text_entries']?.find(ft=>ft?.language?.name==='en')?.['flavor_text'] || 'TBD'}</span>
            <div className='bg-red-500 border-l-3 border-red-200 w-6'></div>
          </div>
      
        </div>}

        {details===2 &&
        <div className='flex justify-evenly mt-1/2'>
          <img src={preEvo?.sprites?.versions?.['generation-v']?.['black-white']?.['front_default']} alt="" />
          <img src={currentEvo?.sprites?.versions?.['generation-v']?.['black-white']?.['front_default']} alt="" />
          <img src={evo?.sprites?.versions?.['generation-v']?.['black-white']?.['front_default']} alt="" />          
        </div>
        }

        {details===3 &&
        <div className='flex flex-col gap-2'>
          <div id="forms-top" className='flex gap-15 justify-center pt-3 '>
            <div className='w-25/100 border-5 border-black rounded-md'>
              <img className='border-x border-5 border-[#bf6de3] w-full bg-white'
              src={pokeData?.sprites?.versions?.['generation-v']?.['black-white']?.['front_default'] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/132.png'} alt="" />
            </div>

            <div className='w-25/100 border-5 border-black rounded-md relative'>
              <img className='border-x border-5 border-[#bf6de3] w-full bg-white absolute bottom-0'  
              src={pokeData?.sprites?.versions?.['generation-v']?.['black-white']?.['back_default'] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/132.png'} alt="" />
            </div>
              
          </div>

          <div id="forms-bottom" className='rounded-md border-3 border-black mx-2 flex justify-between bg-white'>
            <div className='bg-[#bf6de3] border-r-3 border-[#dcafef] w-6'></div>
            <div className='border-y-2 border-[#dcafef] text-3xl w-full h-45 flex items-center relative'>
              <img src={pokeData?.sprites?.versions?.['generation-viii']?.icons?.['front_default'] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/132.png'} alt="chibi"
              className='absolute left-1/20 top-1/2 transform -translate-x-1/2 -translate-y-1/2' />
              <span className='m-auto'>{selected?.replace(/^\w/,c=>c.toUpperCase()).replaceAll(/[-]/g,' ')}</span>
            </div>
            <div className='bg-[#bf6de3] border-l-3 border-[#dcafef] w-6'></div>
          </div>
        </div>
        }

        
      </div>
      }
    </div>
    
  )
  
}

export default App
