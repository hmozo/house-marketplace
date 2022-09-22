import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import OAuth from '../components/OAuth'

export default function Signin(){
    const [showPassword, setShowPassword]= useState(false)
    const [formData, setFormData]= useState({
        email: '',
        password: ''
    })
    const {email, password}= formData
    const navigate= useNavigate()

    const onChange= (event)=>{
        setFormData((prevState)=>({
            ...prevState,
            [event.target.id]: event.target.value 
        }))
    }

    const onSubmit= async (event)=>{
        event.preventDefault()

        try{
            const auth= getAuth()

            const userCredential= await signInWithEmailAndPassword(auth, email, password)
    
            if(userCredential.user){
                navigate('/')
            }
        }catch(error){
            toast.error('Bad user credentials')
        }
    }

    return(
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome back</p>
                </header>
                <form onSubmit={onSubmit}>
                    <input type="email" className="emailInput" placeholder='Email' 
                        id='email' value={email} onChange={onChange} />
                    <div className="passwordInputDiv">
                        <input type={showPassword?'text':'password'} className='passwordInput'
                             placeholder='password' id='password' value={password} onChange={onChange} />
                    </div>
                    <img src={visibilityIcon} alt="show password" className="showPassword" 
                        onClick={()=>setShowPassword((prevState)=>!prevState)}
                    />
                    <Link to='/forgot-password' className='forgotPasswordLink'>
                        Forgot password
                    </Link> 
                    <div className="signInBar">
                        <p className="signInText">Sign in</p>
                        <button className="signInButton">
                            <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                        </button>
                    </div>
                </form>

                <OAuth />

                <Link to='/sign-up' className="registerLink">
                    Sign up instead
                </Link>
            </div>
        </>
    )
}