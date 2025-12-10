import { useContext } from "react";
import { MyContext } from '@/context';
import {pixelPokeball} from '@/assets';

export default function MainDex(){

        const {inputRef, selected, setSelected, sprite, dex, setMain} = useContext(MyContext)
    return(
        <>
        <div className="flex py-4 px-2 h-[90vh] max-sm:gap-1">
          <div id="basic-info" className=' flex flex-col  items-center w-[50vw] h-[90vh] justify-between'>
            <div id="pokemon-name" className='bg-white flex border-3 rounded-md '>
                <div className='bg-red-500 border-r-3 border-red-200 w-6'></div>
                <input ref={inputRef} className='py-2 px-4 border-y-3 border-red-200 placeholder-black text-center max-xl:w-[30vw] max-sm:text-[10px]' 
                placeholder={selected?.replace(/^\w/, c=>c.toUpperCase()).replaceAll('-', ' ') || 'Ditto...'}
                onKeyDown={e => e.key==='Enter'? setSelected(inputRef.current.value):null}
                type="text" />
                <div className='bg-red-500 border-l-3 border-red-200 w-6'></div>
            </div>
            <img src={ sprite || pixelPokeball} className='w-[33vw] max-sm:w-full' />
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
              <img className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 animate-bounce' src={pixelPokeball} alt="Arceus" />
            </div>
          }
          </div>
        </div>
        </>


    )
}