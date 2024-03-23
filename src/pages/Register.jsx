import React, { useEffect } from 'react'
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import {toast} from "sonner"

const Register = () => {

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ showPass, setShowPass] = useState(false)
    const [ email, setEmail] = useState("")
    const [ isAdmin, setIsAdmin ] = useState(false)
    const [ number, setNumber] = useState("")

    const navigate = useNavigate()

    const submitHandler = (event) => {

        event.preventDefault()

        // validations
        if(username.trim() === ""){
            toast.warning("Enter valid username")
            return
        }

        if(password.trim() === "") {
            toast.warning("Enter Valid Password")
            return
        }

        if(password.trim().length < 6){
            toast.warning("Password should contain more than 6 characters")
            return
        }

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!email.match(validRegex)) {
            toast.warning("Enter a valid email")
            return
        }


        if(number.trim().length !== 10 || isNaN(number.trim())) {
            toast.warning("Enter Valid Phone number")
            return
        }


        // check if there is data in local storage
        const localStorageData = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : []
        console.log(localStorageData)

        // check if the  user already registered or not
        const user = localStorageData.some( user => {
            return user.email === email
        })

        if(user){
            toast.warning("User has already registered")
            return
        }

        // If not registered then add the user to localstorage
        const registerData = {username, password, email, number,isAdmin, isVoted: false, isLoggedIn: false}
        localStorage.setItem('user', JSON.stringify([...localStorageData, registerData]));

        toast.success("Registered successfully")

        navigate(`/login`)
    }

  return (
    <div className=' w-screen min-h-screen flex flex-col gap-6 p-2 justify-center items-center'>

        <h1 className=' text-lg font-bold'>Registration Page</h1>

        <form 
        className=' flex flex-col w-full md:w-1/2 lg:w-1/2 xl:w-1/3  border-4 rounded-xl p-10 gap-20'
        onSubmit={submitHandler}>
                <div className=' flex flex-col gap-5'>
                    <div className='flex flex-col gap-2'>
                        <label>
                            Username: 
                        </label>
                        <input 
                            className=' my-input'
                            type='text'
                            placeholder="Eg: Asta18"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                                placeholder="Eg: Asta1829"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div 
                            onClick={() => setShowPass( prev => !prev)}
                            className=' absolute right-3 top-1/2  -translate-y-1/2 bg-blue-400 hover:bg-blue-500 py-1 px-2 rounded-md  text-white cursor-pointer'>{ showPass ? "Hide":"Show"}</div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label>
                            Email Id: 
                        </label>
                        <input 
                            className=' my-input'
                            type='text'
                            placeholder="Eg: asta18@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label>
                            Phone number: 
                        </label>
                        <input 
                            className=' my-input'
                            type='text'
                            placeholder="Eg: 1234567890"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>

                    {/* <div className='flex  gap-2'>
                        <input 
                            id='isAdmin'
                            className=' my-input'
                            type="checkbox"
                            placeholder="username"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                        <label
                            className=' cursor-pointer'
                            htmlFor='isAdmin'
                        >
                            Are you a Admin 
                        </label>
                    </div> */}

                    <div className=' flex gap-5 '>
                        <label>
                            User Type:
                        </label>

                        <select 
                        onChange={ (e) => setIsAdmin(e.target.value) }
                        className= ' focus:outline-blue-500 focus:outline  outline-blue-400 rounded-lg'>
                            <option>
                                Voter
                            </option>
                            <option>
                                Admin
                            </option>
                        </select>

                    </div>
                </div>
                <div className=' flex justify-between'>

                    <Link 
                    className=' my-button'
                    to={"/login"}>
                        Login
                    </Link>

                    <button
                    className='my-button'
                    type='submit'>
                        Register
                    </button>
                </div>
        </form>
    </div>
  )
}

export default Register