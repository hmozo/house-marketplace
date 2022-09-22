import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Explore from './pages/Explore'
import Offers from './pages/Offers'
import Category from './pages/Category'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'

import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'

import { ToastContainer } from 'react-toastify'
import CreateListing from './pages/CreateListing'
import Listing from './pages/Listing'
import Contact from './pages/Contact'


function App() {
  return (
   <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Explore />} />
          <Route exact path='/offers' element={<Offers />} />
          <Route exact path='/category/:categoryName' element={<Category />} />
          <Route exact path='/profile' element={<PrivateRoute />}>
                <Route exact path='/profile' element={<Profile />} />
          </Route>
          <Route exact path='/sign-in' element={<Signin />} />
          <Route exact path='/sign-up' element={<Signup />} />
          <Route exact path='/forgot-password' element={<ForgotPassword />} />
          <Route exact path='/create-listing' element={<CreateListing />} />
          <Route exact path='/category/:categoryName/:listingId' element={<Listing />} />
          <Route exact path='/contact/:landlordId' element={<Contact />} />
        </Routes>

        <Navbar />
      </Router>

      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
   </>
  );
}

export default App;
