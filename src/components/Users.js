import React, {useState, useEffect} from 'react';
import "./Users.scss"
import uniqid from 'uniqid';
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUsers } from '../redux/actions';

const Users = () => {
    const [usersS, setUsersS] = useState([])
    let [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        async function getData() {
            setLoading(true)
            await axios.get('http://localhost:4004/users').then(({data}) => {
                setUsersS(data)
                setLoading(false)
                dispatch(getUsers(data))
            })
        }
        getData()
    }, [])

    useEffect(() => {
        const message = document.querySelector('.message-state') 
        loading ? message.innerText = 'Loading...' : message.innerText = ''
    }, [loading])

    useEffect(() => {
        const message = document.querySelector('.message-state') 
        usersS.length === 0 ? message.innerText = 'There is no users' : message.innerText = ''
    }, [usersS])

    let users = [...usersS]
    users.reverse()
    
    return (
        <div className='container'>
            <h2 className='message-state'></h2>
            {users.map(user => {
                return <div className='user-block' key={uniqid()}>
                    <img src={user.photo} className="user-photo" alt=""></img>
                    <div className='user-info'>
                        <p className='user-name'><NavLink className="user-name" to={`/users/${user.nickname}`}>{user.name}</NavLink></p>
                        <p className='user-nickname'><NavLink className="user-nickname"to={`/users/${user.nickname}`}>{user.nickname}</NavLink></p>
                    </div>
                </div>
            })}
        </div>
    );
};

export default Users;