"use client"
import React from 'react'
import { CustomButton } from '.'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Hero = () => {
    const router = useRouter();
    const hanldeScroll = ()=>{
        router.push('/car-hub')
    }
  return (
    <div className='hero'>
        <div className='flex-1 pt-28 padding-x'>
        <h1 className='hero__title'>Find,book,or rent a car - quickly and easily!</h1>

        <p className='hero__subtitle'>
            Streamline your car rental experience with our effortless booking process.
        </p>

        <CustomButton btnType='button' title="Explore Cars" containerStyle="bg-primary-blue text-white rounded-full mt-10"
        handleClick={hanldeScroll}/>
        </div>
        <div className="hero__image-container">
            <div className="hero__image">
                <Image src={'/hero.png'} fill className="object-contain" alt='hero'/>
            </div>
            {/* <div className="hero__image-overlay"></div> */}
        </div>
    </div>
  )
}

export default Hero