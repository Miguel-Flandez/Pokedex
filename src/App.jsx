import { useState, useEffect, useRef } from "react";
import { MyContext } from '@/context';
import { Details, Evolution, Forms, Header, MainDex } from '@/components';

export default function App() {

const [dex, setDex] = useState([])
  const [pokeData, setPokeData] = useState()
  const [speciesData, setSpeciesData] = useState()

  const [preEvoName, setPreEvoName] = useState()
  const [currentEvoName, setCurrentEvoName] = useState()
  const [evoName, setEvoName] = useState()

  const [selected, setSelected] = useState('pikachu');

  const [preEvo, setPreEvo] = useState()
  const [currentEvo, setCurrentEvo] = useState()
  const [evo, setEvo] = useState()
  const [main, setMain] = useState(true);
  const [details, setDetails] = useState(1);
  const [page, setPage] = useState(1)


  

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


      cries.src = pokedata?.cries?.latest || ''
      cries.play().catch(()=>{})
    }
    pokemonData()
  },[selected])

  const sprite = pokeData?.sprites?.versions?.['generation-v']?.['black-white']?.['front_default'];
  const backSprite = pokeData?.sprites?.versions?.['generation-v']?.['black-white']?.['back_default'];
  const iconSprite = pokeData?.sprites?.versions?.['generation-viii']?.icons?.['front_default']

  const preEvoSprite = preEvo?.sprites?.versions?.['generation-v']?.['black-white']?.['front_default'];
  const currentEvoSprite = currentEvo?.sprites?.versions?.['generation-v']?.['black-white']?.['front_default']
  const evoSprite = evo?.sprites?.versions?.['generation-v']?.['black-white']?.['front_default']
  



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
    <MyContext.Provider value={{sprite, pokeData, selected, setSelected, 
    details, setDetails, speciesData, typeColors, preEvoName, currentEvoName, 
    evoName, preEvoSprite, currentEvoSprite,  evoSprite, main, setMain, inputRef, dex, page, setPage, backSprite, iconSprite}}>
{/* main section */}
      {main && 
      <div id='main-page'>
        <Header/>
        <MainDex/>
      </div>
      }
      
{/* details section */}
      {!main && 
      <div id="details" >
        <Header/>

        {details===1 && <Details/>}

        {details===2 && <Evolution/>}

        {details===3 && <Forms/>}

        
      </div>
      }
    </MyContext.Provider>
    
  )
  
}


