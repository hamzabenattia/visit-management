import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import styled from 'styled-components';
import Logo from '../images/logo.png'
import Loading from "./LoadingError/Loading";



const A = styled(Link)`
    color: #6c757d;
    padding:5px ;
    padding-left:50px ;
    display: block;
    text-decoration: none;
    font-size:15px ;
`

const Sidebar = () => {

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;


  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
          <img src={Logo} className="logo"/>
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-bars"></i>
            </button>
          </div>
        </div>
{loading ? <Loading/>  : <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <Link to="/"
                activeClassName="active"
                className="menu-link"
                exact={true}
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Tableau de bord</span>
              </Link>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/demandes"
              >
                <i className="icon fas fal fa-clipboard-list"></i> 
                <span className="text">Les Demandes</span>
              </NavLink>
            </li>
            {userInfo.user?.isAdmin || userInfo.isAdmin  ? <></>:
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/demande/add"
              >
                <i class="icon fas fa-layer-plus"></i>
                <span className="text">Ajouter une Demande</span>
              </NavLink>
            </li>}
           
           {userInfo.user?.isAdmin || userInfo.isAdmin  ?  <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/users"
              >
                <i className="icon fas fa-solid fa-user"></i>
                <span className="text">Liste d'utilisateur</span>
              </NavLink>
            </li>:<></>}
    
          </ul>
    
          <br />
          <br />
        </nav> }
        
      </aside>
    </div>
  );
};

export default Sidebar;
