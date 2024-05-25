import React from 'react'
import Layout from '../layout/Layout'
import { div } from 'three/examples/jsm/nodes/Nodes.js'

const GuestPage = ({status}) => {
const botPhoto = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  return (
    <Layout status={"guest"}>
      <h1 className='text-black dark:text-white'>Welcome to Our IoT Project</h1>
      <div className=' grid grid-cols-7 gap-6'>
      {
        botPhoto.map((b)=>(
          <img src={`./src/assets/images/botRin${b}.jpg`} alt="" className=' blur-sm hover:blur-none object-contain w-[10rem] h-[15rem]' />
         ))
      }
      </div>
      
        
      
    </Layout>
  )
}

export default GuestPage