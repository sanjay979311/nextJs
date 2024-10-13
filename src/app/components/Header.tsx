import Link from "next/link";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { signOut, useSession } from "next-auth/react";
import { setIsAuthenticated, setUser } from "../../../redux/features/userSlice";

const Header = () => {

  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth);
  const { data } = useSession()
  // console.log('user is =====>', user)
  // console.log('data is is =====>', data)

  useEffect(() => {
    if (data) {
      dispatch(setUser(data?.user));
      dispatch(setIsAuthenticated(true));
    }
  }, [data]);

  const logoutHandler = () => {
    signOut();
  };


  return (
    <>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">Home</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Product
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" href="/add-product"> Add Product </Link></li>
                  <li><Link className="dropdown-item" href="/product-list"> Product List </Link></li>
                  <li><Link className="dropdown-item" href="/item-list"> Item List </Link></li>

                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link " >About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " >Contact Us</a>
              </li>
              <li className="nav-item">
               
                <Link className="nav-link" href="/dashboard"> Dashboard </Link>
                  
              </li>
              
            </ul>
            <div className="d-flex" role="search" style={{ marginRight: "50px" }}>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user ? user.name : 'user'}
                  </a>
                  <ul className="dropdown-menu">

                    {user && (
                      <li><Link className="dropdown-item" href="/add-product" onClick={logoutHandler}> logout </Link></li>
                    )}



                    {data === null && (
                      <li><Link className="dropdown-item" href="/login" > Login </Link></li>
                    )}


                  </ul>
                </li>

              </ul>


            </div>
          </div>
        </div>
      </nav>
    </>
  )
}


export default Header;