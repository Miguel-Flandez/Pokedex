import { useContext} from "react";
import { MyContext } from '@/context';

export default function Header(){

    const {main, setDetails, details, setMain, page, setPage} = useContext(MyContext)
    

    return(
        <>
            {main && 
            
                <header className="py-2 h-[6vh] bg-gradient-to-b from-red-500 to-red-900 font-mono text-white flex justify-center items-center border-b-3 border-black"
                    style={{textShadow: '2px 2px 6px black'}}>
                    Pokédex
                </header>
            
            }

            {!main && 
            <>
                <header className={`${details===1 ? 'bg-gradient-to-b from-red-500 to-red-900' :details===2?'bg-gradient-to-b from-green-500 to-green-900' : details===3? 'bg-gradient-to-b from-[#bf6de3] to-[#744289]' :null } h-[6vh] py-2 px-8 font-mono text-white flex items-center border-b-3 border-black cursor-pointer transition-colors duration-500`}>
                <div className='flex gap-[5vw] text-[1vw] max-sm:text-[3vw]'>
                    <div className='hover:text-black' onClick={()=>{setPage(prev=> page!==1 ? prev-1 : prev); setDetails(prev=>details!==1 ? prev-1 : prev)}}>◀</div>
                    <span className={`${page === 1 ? 'underline decoration-2' : null } hover:text-black`} onClick={()=>{setPage(1); setDetails(1);}}>DETAILS</span>
                    <span className={`${page === 2 ? 'underline decoration-2' : null } hover:text-black`} onClick={()=>{setPage(2); setDetails(2);}}>EVOLUTION</span>
                    <span className={`${page === 3 ? 'underline decoration-2' : null } hover:text-black`} onClick={()=>{setPage(3); setDetails(3);}}>FORMS</span>
                    <div className='hover:text-black' onClick={()=>{setPage(prev=> page!==3 ? prev+1 : prev); setDetails(prev=> details!==3 ? prev+1 : prev)}}>▶</div>
                </div>
                
                </header>

                <div id='back-button' className='bg-white flex absolute border-3 rounded-md m-2 z-1'> 
                    <div className={`${details===1?'bg-red-500 border-r-3 border-red-200 w-6': details===2?'bg-green-500 border-r-3 border-green-200':details===3?'bg-[#bf6de3] border-r-3 border-[#dcafef]':null} w-6 transition-colors duration-500`}></div>
                    <span className={`${details===1? 'border-red-200 hover:bg-red-200': details===2? 'border-green-200 hover:bg-green-200': details===3? 'border-[#dcafef] hover:bg-[#dcafef]':null} py-2 px-4 border-y-3 cursor-pointer transition-colors duration-500`} onClick={()=>setMain(prev=>!prev)}>Back</span>
                    <div className={`${details===1?'bg-red-500 border-l-3 border-red-200 w-6': details===2?'bg-green-500 border-l-3 border-green-200':details===3?'bg-[#bf6de3] border-l-3 border-[#dcafef]' :null} w-6 transition-colors duration-500`}></div>
                </div>
            </>
            }
        </>
    )
}