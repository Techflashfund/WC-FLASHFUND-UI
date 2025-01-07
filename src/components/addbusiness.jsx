import React from 'react';
import { Card } from "@/components/ui/card";
import { DollarSign, Home, Building2, Car,ForwardIcon } from "lucide-react";
import { FaArrowRight } from 'react-icons/fa';
import PanInput from './paninput';

const Addbusiness = ({ onSwitch}) => {
  

  return (
   
      <div className="flex flex-col gap-4">
        
          <div  className="bg-gray-950/30  h-[200px] flex  items-start  border-0 bg-[url('/businessman2.png')] bg-cover p-4 rounded-xl  hover:bg-gray-950/40 transition-all w-full">
        
          <h1 className='text-white text-3xl font-bold items-center w-full '>Add a Business</h1>

       
          

            
          </div>
          <div className='flex w-full gap-1 sm:gap-2'>
          <PanInput/>
          <button onClick={onSwitch} type="button" className="flex   sm:text-lg  w-[20%]   sm:px-6 sm:py-4 font-bold  text-white   transition-all rounded-xl cursor-pointer  bg-[#2a328c] to-blue-600 leading-pro  ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-110 hover:rotate-2  hover:text-pink-200 hover:shadow-lg active:opacity-85 justify-center items-center"><FaArrowRight  /></button>


          </div>
          
        
      </div>
    
  );
};

export default Addbusiness;

