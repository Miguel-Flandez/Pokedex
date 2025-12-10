import { useContext } from "react";
import { MyContext } from '@/context';
import { ditto} from '@/assets'

export default function Forms(){


    const {sprite, selected, backSprite, iconSprite} = useContext(MyContext)


    return(
        <div id="forms" className='flex flex-col gap-[5vw] h-[90vh]'>
          <div id="forms-top" className='flex gap-[5vw] justify-center items-center pt-[5vh] max-xl:pt-[5vh] max-sm:flex-col max-sm:pt-[10vh]'>
            <div className='w-[25vw] max-sm:w-[50vw] border-5 border-black rounded-md'>
              <img className='border-x border-5 border-[#bf6de3] w-full lg:h-[50vh] bg-white'
              src={sprite || ditto} alt="" />
            </div>

            <div className='w-[25vw] max-sm:w-[50vw] border-5 border-black rounded-md relative'>
              <img className='border-x border-5 border-[#bf6de3] w-full lg:h-[50vh] bg-white'
              src={backSprite || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/132.png'} alt="" />
            </div>
              
          </div>

          <div id="forms-bottom" className='rounded-md border-3 border-black mx-2 flex justify-between bg-white'>
            <div className='bg-[#bf6de3] border-r-3 border-[#dcafef] w-6'></div>
            <div className='border-y-2 border-[#dcafef] text-3xl w-full h-[20vh] flex items-center relative max-sm:flex-col'>
              <img src={iconSprite || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/132.png'} alt="chibi"
              className='absolute left-1/20 top-1/2 transform -translate-x-1/2 -translate-y-1/2' />
              <span className='m-auto'>{selected?.replace(/^\w/,c=>c.toUpperCase()).replaceAll(/[-]/g,' ')}</span>
            </div>
            <div className='bg-[#bf6de3] border-l-3 border-[#dcafef] w-6'></div>
          </div>
        </div>
    )
}