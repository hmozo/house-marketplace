import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

export default function ForgotPassword(){
    const [ email, setEmail ]= useState()

    const onChange= (event)=>{
        setEmail(event.target.value)
    }

    const onSubmit= async (event)=>{
        event.preventDefault()

        try {
            const auth= getAuth()
            await sendPasswordResetEmail(auth, email)
            toast.success('Email was sent')
        } catch (error) {
            toast.error('Could not send reset-email')
        }
    }
    
    return(
        <div className="pageContainer">
            <header>
                <p className="pageHeader">Forgot password</p>
            </header>

            <main>
                <form action="submit" onSubmit={onSubmit}>
                    <input type="email" className="emailInput" placeholder='Email' value={email} onChange={onChange} />
                    <Link className="forgotPasswordLink" to='/sign-in'>Sign-in</Link>
                    
                    <div className="signInBar">
                        <div className="signInText">Send reset link</div>
                        <button className="signInButton">
                            <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}