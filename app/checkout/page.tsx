"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CheckOutPage = () => {
    const {status,data} = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        cardNumber: '',
        expDate: '',
        cvv: '',
      });
    
      const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e:any) => {
        e.preventDefault();
        // Handle form submission logic here, such as sending data to the server.
      };
    
  return <>
    {
        status === 'authenticated' ? <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e)=>handleChange(e)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Place Order
            </button>
          </div>
        </form>
      </div> : router.push('auth/sign-in')
    }
  </>
  
}

export default CheckOutPage