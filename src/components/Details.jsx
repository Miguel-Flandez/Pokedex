import { useContext } from "react";
import { MyContext } from '@/context';
import {ditto} from '@/assets'

export default function Details(){

    const {sprite, pokeData, selected, speciesData, typeColors} = useContext(MyContext)

    return(
        <div id='details-content' className='flex flex-col justify-between h-[90vh]'>
          <div id="details-content-top" className='flex justify-around items-center px-[2vw] pt-[5vh] max-xl:pt-[10vh] max-sm:flex-col'>
            <div id="left" className='relative'>
              <img src={ sprite || ditto} className='w-[20vw] max-sm:w-[50vw]' />
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
            <span className='border-y-2 border-red-200 text-center text-3xl max-xl:text-lg w-full p-4 h-[30vh]'>{speciesData?.['flavor_text_entries']?.find(ft=>ft?.language?.name==='en')?.['flavor_text'].replaceAll(/[\f]/g, ' ') || 'No Data...'}</span>
            <div className='bg-red-500 border-l-3 border-red-200 w-6'></div>
          </div>
      
        </div>
    )
    
}