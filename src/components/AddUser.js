import React, {useState, useEffect} from "react";
import "./Users.scss"
import { addUser } from "../redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";

function AddUser() {
    let [fullName, setFullName] = useState('')
    let [profileLink, setProfileLink] = useState('')
    let [username, setUsername] = useState('')
    let [error, setError] = useState('')
    const [users, setUsers] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get('http://localhost:4004/users').then(({data}) => setUsers(data))
    }, [])
    
    useEffect(() => {
        let message = document.querySelector('.message')
        message.innerText = error;
    }, [error])

    function handleFullName(e) {
        setFullName(fullName = e.target.value)
    }

    function handleLink(e) {
        setError(error = '')
        setProfileLink(profileLink = '')
        if (e.target.value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) ) {
            setProfileLink(profileLink = e.target.value)
        } else {
            setError(error = 'Please enter the valid link')
        }
    }

    function handleUsername(e) {
        setError(error = '')
        setUsername(username = '')
        if (e.target.value.substring(0, 1) === '@' && e.target.value.length >= 4) {
            if (users.find(user => user.nickname === e.target.value)) {
                setError(error = "This username is taken. Please choose another")
            } else {
                setUsername(username = e.target.value)
                setError(error = '')
            }
        } else {
            setError(error = 'Username should start with @ and have at least 3 characters')
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        const nameInput = document.querySelector('.full-name')
        const usernameInput = document.querySelector('.username')
        const linkInput = document.querySelector('.link-input')
        if (!error === '') return;
        if ((fullName && username && profileLink)) {
            let user = {
                name: fullName,
                nickname: username,
                photo: profileLink,
            }
            axios.post('http://localhost:4004/addUser', user).then(({data}) => dispatch(addUser(data)))
            nameInput.value = ''
            usernameInput.value = ''
            linkInput.value = ''
            setUsername(username = '')
            setFullName(fullName = '')
            setProfileLink(profileLink = '')
        } else {
            setError(error = 'Please fill out the form')
        }
    }

    return (
        <div className='container'>
            <h2 className="title">Create new user:</h2>
            <form>
                <p><input onChange={handleFullName} type="text" placeholder="Full name" className="user-input full-name"></input></p>
                <p><input onChange={handleUsername} type="text" placeholder="Username" className="user-input username"></input></p>
                <p><input onChange={handleLink} type="text" placeholder="Link to the profile picture" className="user-input link-input"></input></p>
                <p className="message"></p>
                <button onClick={handleSubmit} type="submit" className="btn">Add user</button>
            </form>
        </div>
    )
}

export default AddUser

