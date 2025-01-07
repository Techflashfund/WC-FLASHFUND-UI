import React from 'react'
import GstInput from './gstinput'
import { FaArrowRight } from 'react-icons/fa';

export const Gstlisting = () => {
  return (
    <div className='flex flex-col gap-2'>
    <div className='rounded-xl bg-[#2a328c] p-4 '>
    <h1 >Add GST Details</h1>
    </div>
    
    <div className='flex w-full gap-1 sm:gap-2 '>
        

        <GstInput/>
         <button  type="button" className="flex   sm:text-lg  w-[20%]   sm:px-6 sm:py-4 font-bold  text-white   transition-all rounded-xl cursor-pointer  bg-[#2a328c] to-blue-600 leading-pro  ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-110 hover:rotate-2  hover:text-pink-200 hover:shadow-lg active:opacity-85 justify-center items-center">Add</button>
    </div>
    <p>---------more to come---------</p>
    </div>
  )
}
