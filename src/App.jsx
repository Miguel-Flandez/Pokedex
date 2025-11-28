import './App.css'
import { useState, useEffect, useRef } from "react";

function App() {

const [dex, setDex] = useState([])
  const [pokeData, setPokeData] = useState()
  const [speciesData, setSpeciesData] = useState()

  const [preEvoName, setPreEvoName] = useState()
  const [currentEvoName, setCurrentEvoName] = useState()
  const [evoName, setEvoName] = useState()

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
    setPreEvo(null)
    setCurrentEvo(null)
    setEvo(null)

    

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

      const preevoname = evochaindata?.chain?.species?.name || 'ditto'
      const currentname = evochaindata?.chain?.['evolves_to']?.[0]?.species.name || 'ditto'
      const evoname = evochaindata?.chain?.['evolves_to']?.[0]?.['evolves_to']?.[0]?.species?.name || 'ditto'

    
      setPreEvoName(preevoname)
      setCurrentEvoName(currentname)
      setEvoName(evoname);



      const [preEvoRes, currentRes, evoRes] = await Promise.all([fetch(`https://pokeapi.co/api/v2/pokemon/${preevoname}`),
        fetch(`https://pokeapi.co/api/v2/pokemon/${currentname}`),
        fetch(`https://pokeapi.co/api/v2/pokemon/${evoname}`)
      ])

      const preEvoData = await preEvoRes.json()
      const currentData = await currentRes.json()
      const evoData = await evoRes.json()

      setPreEvo(preEvoData)
      setCurrentEvo(currentData)
      setEvo(evoData)

      console.log(preevoname)
      console.log(evoname)

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
        <header  header className="py-2 h-[6vh] bg-gradient-to-b from-red-500 to-red-900 font-mono text-white flex justify-center items-center border-b-3 border-black"
        style={{textShadow: '2px 2px 6px black'}}>
            Pokédex
        </header>
        <div className="flex py-4 px-2 h-[90vh] max-sm:gap-1">
          <div id="basic-info" className=' flex flex-col  items-center w-[50vw] h-[90vh] justify-between'>
            <div id="pokemon-name" className='bg-white flex border-3 rounded-md '>
                <div className='bg-red-500 border-r-3 border-red-200 w-6'></div>
                <input ref={inputRef} className='py-2 px-4 border-y-3 border-red-200 placeholder-black text-center max-xl:w-[30vw] max-sm:text-[10px]' 
                placeholder={selected?.replace(/^\w/, c=>c.toUpperCase()).replaceAll('-', ' ') || 'Ditto...'}
                onKeyDown={e => e.key==='Enter'? setSelected(inputRef.current.value):null}
                type="text" />
                {/* <span className='py-2 px-4 border-y-3 border-red-200'>{ selected.replace(/^\w/, c=>c.toUpperCase()).replaceAll('-', ' ') || 'Ditto...'}</span>   */}
                <div className='bg-red-500 border-l-3 border-red-200 w-6'></div>
            </div>
            <img src={ pokeData?.sprites?.versions?.['generation-v']?.['black-white']?.['front_default'] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/132.png'} className='w-[33vw] max-sm:w-full' />
            <div id='details-btn' className='bg-white flex border-3 rounded-md max-sm:text-[10px]'>
              <div className='bg-red-500 border-r-3 border-red-200 w-6'></div>
              <span className='py-2 px-4 border-y-3 border-red-200 hover:bg-red-200 cursor-pointer' onClick={()=>setMain(prev=>!prev)}>Details</span>
              <div className='bg-red-500 border-l-3 border-red-200 w-6'></div>
            </div>
          </div> 
          <div id="pokemon-list" className='border-3 border-black bg-white min-w-[50vw] min-h-[90vh] rounded-md flex flex-col gap-2 overflow-y-auto px-1 relative' >
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
      <div id="details" >
        <header className={`${details===1 ? 'bg-gradient-to-b from-red-500 to-red-900' :details===2?'bg-gradient-to-b from-green-500 to-green-900' : details===3? 'bg-gradient-to-b from-[#bf6de3] to-[#744289]' :null } h-[6vh] py-2 px-8 font-mono text-white flex items-center border-b-3 border-black cursor-pointer transition-colors duration-500`}>
          <div className='flex gap-[5vw] text-[1vw] max-sm:text-[3vw]'>
            <div className='hover:text-black' onClick={()=>{setPage(prev=> page!==1 ? prev-1 : prev); setDetails(prev=>details!==1 ? prev-1 : prev)}}>◀</div>
            <span className={`${page === 1 ? 'underline decoration-2' : null } hover:text-black`} onClick={()=>{setPage(1); setDetails(1);}}>DETAILS</span>
            <span className={`${page === 2 ? 'underline decoration-2' : null } hover:text-black`} onClick={()=>{setPage(2); setDetails(2);}}>EVOLUTION</span>
            <span className={`${page === 3 ? 'underline decoration-2' : null } hover:text-black`} onClick={()=>{setPage(3); setDetails(3);}}>FORMS</span>
            <div className='hover:text-black' onClick={()=>{setPage(prev=> page!==3 ? prev+1 : prev); setDetails(prev=> details!==3 ? prev+1 : prev)}}>▶</div>
          </div>

          <div>

          </div>
          
        </header>

        <div id='back-button' className='bg-white flex absolute border-3 rounded-md m-2 z-1'> 
            <div className={`${details===1?'bg-red-500 border-r-3 border-red-200 w-6': details===2?'bg-green-500 border-r-3 border-green-200':details===3?'bg-[#bf6de3] border-r-3 border-[#dcafef]':null} w-6 transition-colors duration-500`}></div>
              <span className={`${details===1? 'border-red-200 hover:bg-red-200': details===2? 'border-green-200 hover:bg-green-200': details===3? 'border-[#dcafef] hover:bg-[#dcafef]':null} py-2 px-4 border-y-3 cursor-pointer transition-colors duration-500`} onClick={()=>setMain(prev=>!prev)}>Back</span>
            <div className={`${details===1?'bg-red-500 border-l-3 border-red-200 w-6': details===2?'bg-green-500 border-l-3 border-green-200':details===3?'bg-[#bf6de3] border-l-3 border-[#dcafef]' :null} w-6 transition-colors duration-500`}></div>
        </div>

        {/* {!preEvo?.sprites?.versions?.['generation-v']?.['black-white']?.['front_default'] && <div id="loader" className='fixed top-0 left-0 w-screen h-screen bg-white z-50'>
          <img src="/images/pokeball.png" alt="pokeball" className='transition-all ' />
        </div>} */}

        {details===1 && 
        <div id='details-content' className='flex flex-col justify-between h-[90vh]'>
          <div id="details-content-top" className='flex justify-around items-center px-[2vw] pt-[5vh] max-xl:pt-[10vh] max-sm:flex-col'>
            <div id="left" className='relative'>
              <img src={ pokeData?.sprites?.versions?.['generation-v']?.['black-white']?.['front_default'] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/132.png'} className='w-[20vw] max-sm:w-[50vw]' />
            </div>

            <div id="right" className='flex flex-col gap-[5vw]'>
              <div id="pokemon-nametag" className='flex flex-col border-3 rounded-md bg-white text-4xl max-md:text-xl'>
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
            <span className='border-y-2 border-red-200 text-center text-3xl max-xl:text-lg w-full p-4 h-[30vh]'>{speciesData?.['flavor_text_entries']?.find(ft=>ft?.language?.name==='en')?.['flavor_text'].replaceAll(/[\f]/g, ' ') || 'TBD'}</span>
            <div className='bg-red-500 border-l-3 border-red-200 w-6'></div>
          </div>
      
        </div>}

        {details===2 &&
        <div id='evolutions' className={`${currentEvoName!=='ditto' ? 'max-sm:pt-[10vh]' : 'max-sm:pt-[30vh]'} flex justify-center items-center pt-[20vh] max-sm:flex-col`} >
          <img src={preEvo?.sprites?.versions?.['generation-v']?.['black-white']?.['front_default'] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/132.png'} className='w-[25vw] max-sm:w-[50vw] max-lg:w-[33vw] border-5 rounded-lg border-transparent hover:border-red-400' onClick={()=>setSelected(prev=>prev===preEvoName ? prev : preEvoName)} alt="base-evolution" />
          {currentEvoName!=='ditto' && <img src={currentEvo?.sprites?.versions?.['generation-v']?.['black-white']?.['front_default'] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/132.png'} className='w-[25vw] max-sm:w-[50vw] max-lg:w-[33vw] border-5 rounded-lg border-transparent hover:border-red-400' onClick={()=>setSelected(prev=>prev===currentEvoName ? prev : currentEvoName)} alt="stage-1-evolution" />} 
          {evoName!=='ditto' && <img src={evo?.sprites?.versions?.['generation-v']?.['black-white']?.['front_default'] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/132.png'} className='w-[25vw] max-sm:w-[50vw] max-lg:w-[33vw] border-5 rounded-lg border-transparent hover:border-red-400' onClick={()=>setSelected(prev=>prev===evoName ? prev : evoName)} alt="stage-2-evolution" />} 
        </div>
        }

        {details===3 &&
        <div id="forms" className='flex flex-col gap-[5vw] h-[90vh]'>
          <div id="forms-top" className='flex gap-[5vw] justify-center items-center pt-[5vh] max-xl:pt-[5vh] max-sm:flex-col max-sm:pt-[10vh]'>
            <div className='w-[25vw] max-sm:w-[50vw] border-5 border-black rounded-md'>
              <img className='border-x border-5 border-[#bf6de3] w-full lg:h-[50vh] bg-white'
              src={pokeData?.sprites?.versions?.['generation-v']?.['black-white']?.['front_default'] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/132.png'} alt="" />
            </div>

            <div className='w-[25vw] max-sm:w-[50vw] border-5 border-black rounded-md relative'>
              <img className='border-x border-5 border-[#bf6de3] w-full lg:h-[50vh] bg-white' 
              src={pokeData?.sprites?.versions?.['generation-v']?.['black-white']?.['back_default'] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/132.png'} alt="" />
            </div>
              
          </div>

          <div id="forms-bottom" className='rounded-md border-3 border-black mx-2 flex justify-between bg-white'>
            <div className='bg-[#bf6de3] border-r-3 border-[#dcafef] w-6'></div>
            <div className='border-y-2 border-[#dcafef] text-3xl w-full h-[20vh] flex items-center relative'>
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
