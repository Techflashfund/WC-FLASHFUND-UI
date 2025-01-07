'use client'
import React from 'react';
import styled from 'styled-components';

const GstInput = () => {
  return (
    <StyledWrapper className='w-full'>
      <div className="input-group ">
        <input required type="text" name="text" autoComplete="off" className="input w-full uppercase" />
        <label className="user-label">Enter GST Number</label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .input-group {
   position: relative;
   
  }

  .input {
   border: solid 3px #2a328c;
   border-radius: 1rem;
   background: none;
   padding: 1rem;
   font-size: 1rem;
   color: #2a328c;
   transition: border 150ms cubic-bezier(0.4,0,0.2,1);
  }

  .user-label {
   position: absolute;
   left: 15px;
   color: #2a328c;
   pointer-events: none;
   transform: translateY(1rem);
   transition: 150ms cubic-bezier(0.4,0,0.2,1);
  }

  .input:focus, input:valid {
   outline: none;
   border: 3px solid #2a328c;
  }

  .input:focus ~ label, input:valid ~ label {
   transform: translateY(-50%) scale(0.8);
   background-color: #ffff;
   padding: 0 .2em;
   
   color: #2a328c;
  }`;

export default GstInput;
