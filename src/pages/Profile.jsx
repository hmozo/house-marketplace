import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAuth, updateProfile } from "firebase/auth"
import { doc, updateDoc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase-config'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import ListingItem from "../components/ListingItem"

export default function Profile(){
    const auth= getAuth()
    const [loading, setLoading]= useState(true)
    const [listings, setListings]= useState([])
    const [ changeDetails, setChangeDetails ]= useState(false)
    const [ formData, setFormData ]= useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })
    
    const navigate= useNavigate()

    const { name, email }= formData

    useEffect(()=>{
        const fetchUserListings= async ()=>{
            const listingsRef= collection(db, 'listings')
            const q= query(listingsRef, 
               where('userRef', '==', auth.currentUser.uid), 
                orderBy('timestamp', 'desc'))
            const querySnap= await getDocs(q)

            let listings= []

            querySnap.forEach((doc)=>{
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            console.log(listings)
            setListings(listings)
            setLoading(false)
        }

        fetchUserListings()

    }, [auth.currentUser.uid])

    const onLogout= ()=>{
        auth.signOut()
        navigate('/')
    }

    const onSubmit= async ()=>{
        try {
            if(auth.currentUser.displayName !== name){
                await updateProfile(auth.currentUser, {
                    displayName: name
                })

                const userRef= doc(db, 'users', auth.currentUser.uid)
                await updateDoc(userRef, {
                    name
                })
            }           
        } catch (error) {
            toast.error('Could not update profile details')
        }
    }

    const onChange= (event)=>{
        setFormData((prevState=>({
            ...prevState,
            [event.target.id]: event.target.value
        })))
    }

    const onDelete= async (listingId)=>{
        if (window.confirm('Are you sure you want to delete?')){
            await deleteDoc(doc(db, 'listings', listingId))
            const updateListings= listings.filter((listing)=> listing.id !== listingId)
            setListings(updateListings)
            toast.success('Successfully deleted listing')
        }
    }

    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">My profile</p>
                <button type="button" className="logOut" onClick={onLogout}>
                    Logout
                </button>
            </header>

            <main>
                <div className="profileDetailsHeader">
                    <p className="profileDetailsText">Personal details</p>
                    <p className="changePersonalDetails" onClick={ ()=>{
                            changeDetails && onSubmit()
                            setChangeDetails((prevState)=>!prevState)
                        } }>
                        { changeDetails? 'done': 'change' }
                    </p>
                </div>

                <div className="profileCard">
                    <form action="submit">
                        <input type="text" id="name" className={!changeDetails? 'profileName':'profileNameActive'}
                            disabled= {!changeDetails} value={name} onChange={onChange}  />
                         <input type="text" id="email" className={!changeDetails? 'profileEmail':'profileEmailActive'}
                            disabled= {!changeDetails} value={email} onChange={onChange}  />
                    </form>
                </div>

                <Link to='/create-listing' className='createListing'>
                    <img src={homeIcon} alt="home" />
                    <p>Sell or rent your home</p>
                    <img src={arrowRight} alt="arrow right" />
                </Link>

                { !loading && listings?.length>0 && (
                    <>
                        <p className="listingText">Your Listings</p>
                        <ul className="listingsList">
                            {listings.map((listing)=>(
                                <ListingItem key={listing.id} listing={listing.data} id={listing.id} onDelete={()=>onDelete(listing.id)} />
                             ))}
                        </ul>
                    </>
                ) }
                
            </main>
        </div>
    )
}