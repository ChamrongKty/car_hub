"use client"
import { CustomButtonProps } from '@/type'
import Image from 'next/image'
import React from 'react'

const CustomButton = ({title,btnType,containerStyle,textStyles,rightIcon,handleClick,disabled} : CustomButtonProps) => {
  return (
    <button
        disabled={disabled}
        type={btnType || "button"}
        className={`custom-btn ${containerStyle}`}
        onClick={handleClick}
    >
       
        <span className={`flex-1 ${textStyles}`}>
            {title}
        </span>
        {rightIcon && <div className='relative w-6 h-6'><Image src={rightIcon} alt='right icon' fill className='object-contain' /></div>}
    </button>
  )
}

export default CustomButton