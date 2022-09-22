import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'


export default function Navbar(){
    var navigate= useNavigate()
    var location= useLocation()

    var pathMatchRoute= (route)=>{
        return (route === location.pathname)
    }

    return (
        <footer className='navbar'>
            <nav className="navbarNav">
                <ul className="navbarListItems">
                    <li className={pathMatchRoute('/')?'navbarListItemNameActive':"navbarListItemName"} onClick={()=>navigate('/')}>
                        <ExploreIcon fill={pathMatchRoute('/')?'#2c2c2c':'#8f8f8f'} width='36px' height='36px' />
                        <p>Explore</p>
                    </li>
                    <li className={pathMatchRoute('/offers')?'navbarListItemNameActive':"navbarListItemName"} onClick={()=>navigate('/offers')}>
                        <OfferIcon fill={pathMatchRoute('/offers')?'#2c2c2c':'#8f8f8f'} width='36px' height='36px' />
                        <p>Offers</p>
                    </li>
                   
                    <li className={pathMatchRoute('/profile')?'navbarListItemNameActive':"navbarListItemName"} onClick={()=>navigate('/profile')}>
                        <PersonOutlineIcon fill={pathMatchRoute('/profile')?'#2c2c2c':'#8f8f8f'} width='36px' height='36px' />
                        <p>Profile</p>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}