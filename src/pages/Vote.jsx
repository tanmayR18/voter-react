import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {toast} from "sonner"

const Vote = () => {

    // const [ vote, setVote] = useState([])
    const { voter } = useParams();
    const navigate = useNavigate()

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
    
    const [votedCand, setVotedCand] = useState(null)

    const localStorageData = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : []

    useEffect( () => {
        const user = localStorageData.filter( user => (user.username === voter))
        if(user.length <= 0 || user[0].isAdmin === "Admin" || !user[0].isLoggedIn){
            toast.warning("User does not exit, please Register")
            navigate("/")
            return
        }
    }, [])

    const submitHandler = (event) => {
        event.preventDefault();

        // check for cands
        const canditateInfo = localStorage.getItem('cand') ? JSON.parse(localStorage.getItem("cand")) : []
        const candPresent = canditateInfo.filter( user => user.name === votedCand ) 


        const votedUser = JSON.parse(localStorage.getItem("user"))
        
        // check if user exists
        const hasVosted = votedUser.filter( user => user.username === voter )
        if(hasVosted.length <= 0) {
            toast.warning("User is not registered")
            navigate("/register")
            return
        }
        
        // check if user already voted
        if(hasVosted[0].isVoted){
            toast.warning("You have already voted")
            navigate("/login")
            return
        }

        if(candPresent.length !== 0) { 
            // if candidate already present then add up the count
            const localStorageData = canditateInfo.map( cand => (
                cand.name === votedCand ? { name: cand.name, count: parseInt(cand.count) + 1} : cand
            ))
            localStorage.setItem("cand", JSON.stringify(localStorageData))

        } else {

            // if candidate not present then create a new entry
            const localStorageData = [...canditateInfo, {name : votedCand, count: 1}]
            console.log(localStorageData)
            localStorage.setItem("cand", JSON.stringify(localStorageData));
        }


        // update the voter status
        const updatedList = votedUser.map( user => user.username === voter ? { ...user,  isVoted: true, isLoggedIn: false } : user)
        localStorage.setItem("user", JSON.stringify(updatedList))
        
        toast.success("Your vote has been recorded")
        navigate("/")
        
    }

  return (
    <div className=' flex flex-col justify-center items-center w-screen h-screen gap-10 p-2'>
        <h1 className=' text-lg font-bold text-center'>Vote your candidate</h1>

        <form 
        className='flex flex-col w-full sm:w-[300px] gap-3 border-4 rounded-lg px-10 py-6' 
        onSubmit={submitHandler}>
            
            {
                candidates.map( (candidate, index ) => (
                    <div 
                    // bhai eethe scene kela aahe 
                    key={index} className=' flex gap-4'>
                        <input
                        onChange={(e) => setVotedCand(candidate.name)}
                        className=' cursor-pointer'
                        id={candidate.name}  type='radio' name='cand' value={candidate.name} />
                        <label
                        className=' cursor-pointer'
                        htmlFor={candidate.name}>
                            {candidate.name}
                        </label>
                    </div>
                ))
            }

            <button
            className=' my-button w-fit self-end'
            type='submit'>
                Submit
            </button>
        </form>
    </div>
  )
}

export default Vote