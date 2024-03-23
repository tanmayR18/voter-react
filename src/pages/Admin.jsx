import React, { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { toast} from "sonner"

const Admin = () => {
    const { admin } = useParams();
    const navigate = useNavigate()
    const localStorageData = localStorage.getItem("cand") ? JSON.parse(localStorage.getItem("cand")) : []
    const localStorageDataUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : []
    
    const candidates = [
        {
            name: "Naruto",
        },
        {
            name: "Luffy",
        },
        {
            name: "Goku",
        },
        {
            name: "Ichigo",
        }
    ]

    const clickHandler = () => {
        const updatedList = localStorageDataUser.map( user => user.username === admin ? { ...user, isLoggedIn: false } : user)
        localStorage.setItem("user", JSON.stringify(updatedList))
        navigate("/")
    }
    

    useEffect( () => {
        const user = localStorageDataUser.filter( user => (user.username === admin))
        console.log("ye he data localstorage se ",user)
        console.log(user?.length === 0)
        console.log(user[0]?.isAdmin !== "Admin")
        if(user?.length === 0 || user[0]?.isAdmin !== "Admin"  || !user[0].isLoggedIn){
            navigate("/")
            return
        }
    }, [])

  return (
    <div className=' flex flex-col gap-5 justify-center items-center h-screen border'>

        <div className=' flex flex-col gap-5'>
            <h1 className=' text-lg font-bold text-center'>
                Vote count
            </h1>
            <div className='flex flex-col gap-2 border-4 p-6 rounded-xl min-w-[200px] justify-between items-center'>
                    <div className=' flex  w-full justify-between border-b border-b-black'>
                        <p>Names</p>
                        <p>Votes</p>
                    </div>

                    <div className=' w-full'>
                        {
                            candidates.map( (item , index )=> (
                                <div key={index} className=' flex  w-full justify-between'>
                                    <p>{item.name}</p>
                                    <p>
                                        {
                                            localStorageData.length === 0 ? "0" :
                                            localStorageData.map( cand => cand.name === item.name  ? cand.count : "0")
                                        }
                                    </p>
                                    {/* <p>{item.count}</p> */}
                                </div>
                            ))
                        }
                </div>
            </div>
            
            <div className=' flex justify-evenly'>

                <Link to={"/"} className=' my-button self-end'>
                    Home
                </Link>

                <button
                className=' my-button '
                onClick={clickHandler}>
                    Logout
                </button>
            </div>
        </div>
       
        
    </div>
  )
}

export default Admin