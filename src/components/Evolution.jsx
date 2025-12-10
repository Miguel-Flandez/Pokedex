import { useContext } from "react";
import { MyContext } from '@/context';

import {pixelPokeball} from '@/assets'

export default function Evolution(){

    const {preEvoName, currentEvoName, evoName, preEvoSprite, currentEvoSprite,  evoSprite, setSelected} = useContext(MyContext)

    return(
        <div id='evolutions' className={`${currentEvoName!=='ditto' ? 'max-sm:pt-[10vh]' : 'max-sm:pt-[30vh]'} flex justify-center items-center pt-[20vh] max-sm:flex-col`} >
          <img src={preEvoSprite || pixelPokeball} className='w-[25vw] max-sm:w-[50vw] max-lg:w-[33vw] border-5 rounded-lg border-transparent hover:border-red-400' onClick={()=>setSelected(prev=>prev===preEvoName ? prev : preEvoName)} alt="base-evolution" />
          {currentEvoName!=='ditto' && <img src={currentEvoSprite || pixelPokeball} className='w-[25vw] max-sm:w-[50vw] max-lg:w-[33vw] border-5 rounded-lg border-transparent hover:border-red-400' onClick={()=>setSelected(prev=>prev===currentEvoName ? prev : currentEvoName)} alt="stage-1-evolution" />} 
          {evoName!=='ditto' && <img src={evoSprite || pixelPokeball} className='w-[25vw] max-sm:w-[50vw] max-lg:w-[33vw] border-5 rounded-lg border-transparent hover:border-red-400' onClick={()=>setSelected(prev=>prev===evoName ? prev : evoName)} alt="stage-2-evolution" />} 
        </div>
    )
}