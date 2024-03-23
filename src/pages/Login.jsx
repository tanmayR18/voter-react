import React, { useEffect, useState } from 'react'

import { toast } from "sonner"

import { Link, useNavigate, useParams } from 'react-router-dom'

const Login = () => {
    
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ showPass, setShowPass] = useState(false)

    const navigate = useNavigate()

    const { voter } = useParams();
    const localStorageData = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : []

    // useEffect( () => {
        
    //     const user = localStorageData.filter( user => (user.username === voter))
    //     if(user.length <= 0){
    //         toast.warning("User does not exit, please Register")
    //         navigate("/")
    //         return
    //     }
    // }, [])

    const submitHandler = (event) => {
        event.preventDefault()

        // validations

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      
        if (!email.match(validRegex)) {
          toast.warning("Enter a valid email")
          return
        }

        if(password.trim() === "") {
            toast.warning('Please enter your Password')
            return
        }

        if(password.trim().length < 6){
            toast.warning("Passsword should be greater than 6")
        }
    
        // check if user existed
        const user = localStorageData.filter( user => (user.email === email))
        if(user.length <= 0){
            toast.warning("User does not exit, please Register")
            navigate("/")
            return
        }

        // check if password is correct
        if(user[0].password !== password){
            toast.warning("Incorrect password")
            return
        }

        // check if user already voted
        if(user[0].isVoted){
            toast.warning("You have already voted")
            navigate("/")
            return
        }

        console.log(user[0].username)
        
        const updatedList = localStorageData.map( item => item.username === user[0].username ? { ...item, isLoggedIn: true } : item)
        console.log("This is update list", updatedList)
        console.log(user[0].username)
        localStorage.setItem("user", JSON.stringify(updatedList))

        toast.success("Logged in Successfully")

        // check the user type and accordingly navigate the user
        if(user[0].isAdmin){
            navigate(`/admin/${user[0].username}`)
            return
        }
        
        navigate(`/vote/${user[0].username}`)
    }

  return (
    <div className=' w-screen h-screen flex flex-col gap-6 justify-center items-center p-2'>

        <h1 className=' text-lg font-bold'>Login Page</h1>

        <form 
        className=' flex flex-col w-full md:w-1/2 lg:w-1/2 xl:w-1/3 border-4 rounded-xl p-10 gap-20'
        onSubmit={submitHandler}>
                <div className=' flex flex-col gap-5'>
                    <div className='flex flex-col gap-2'>
                        <label>
                            Email: 
                        </label>
                        <input 
                            className=' my-input'
                            type='text'
                            placeholder="Eg: asta@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className=' flex flex-col gap-2 relative'>
                        <label>
                            Password
                        </label>
                        <div className=' relative'>
                            <input 
                                className=' my-input w-full'
                                type= { showPass ? "text" : "password"}
                                placeholder="Eg: asta2352"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div 
                            onClick={() => setShowPass( prev => !prev)}
                            className=' absolute right-3 top-1/2  -translate-y-1/2 bg-blue-400 hover:bg-blue-500 py-1 px-2 rounded-md  text-white cursor-pointer'> { showPass ? "Hide":"Show"}</div>
                        </div>
                    </div>

                </div>
                <div className=' flex justify-between'>

                    <button 
                    className=' my-button'
                    type='submit'>
                        Login
                    </button>

                    <Link
                    className='my-button'
                    to={"/register"}>
                        Register
                    </Link>
                </div>
        </form>
    </div>
  )
}

export default Login