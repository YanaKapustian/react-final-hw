import React from 'react';
import { NavLink } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
    return (
        <nav className='nav-bar'>
            <div className='container'>
                <NavLink className={({isActive}) => (isActive ? "link active" : "link")} to="/users">Users</NavLink>
                <NavLink className={({isActive}) => (isActive ? "link active" : "link")} to="/addUser">Add user</NavLink>
                <NavLink className={({isActive}) => (isActive ? "link active" : "link")} to="/news">News</NavLink>
                <NavLink className={({isActive}) => (isActive ? "link active" : "link")} to="/addNews">Add news</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;