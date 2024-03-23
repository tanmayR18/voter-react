import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className=' flex items-center justify-center flex-col h-screen gap-10'>

        <h1 className=' font-bold text-lg'>
            Login or Register to Vote
        </h1>
        <div className=' flex justify-center items-center gap-5 '>

        <Link to={"/login"} className=' my-button'>
            Login
        </Link>


        <Link to={"/register"} className='my-button'>
            Register
        </Link>

        </div>
    </div>
  )
}

export default Home