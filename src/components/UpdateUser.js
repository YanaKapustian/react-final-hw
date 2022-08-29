import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom"
import "./Users.scss"
import { addUser } from "../redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";


function UpdateUser() {
   const {nickname} = useParams()
   const navigate = useNavigate();

    let [fullName, setFullName] = useState('')
    let [profileLink, setProfileLink] = useState('')
    let [username, setUsername] = useState('')
    let [error, setError] = useState('')
    let [users, setUsers] = useState([])
    let [user, setUser] = useState({})
    let [news, setNews] = useState([])

    useEffect(() => {
        async function getUser() {
         await axios.get('http://localhost:4004/users').then(({data}) => setUsers(users = data))
         await axios.get('http://localhost:4004/news').then(({data}) => setNews(news = data))
         let foundUser = users.find(user => user.nickname === nickname)
         setUser(foundUser)
        }
        getUser()
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
            if (users.find(user => user.nickname === e.target.value) && user.nickname !== e.target.value) {
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
        if (error !== '') return;
        if (!fullName) fullName = user.name;
        if (!username) username = user.nickname;
        if (!profileLink) profileLink = user.photo;
        if ((fullName && username && profileLink)) {
            let curr = {
                name: fullName,
                nickname: username,
                photo: profileLink,
            }
            axios.put(`http://localhost:4004/users/${user._id}`, curr).then(() => navigate('/users')).catch(() => navigate('/users'))
        } else {
            setError(error = 'Please fill out the form')
        }
    }
    function handleDelete(e) {
      e.preventDefault()
      
      axios.delete(`http://localhost:4004/users/${user._id}`).then(() => navigate('/users'))
      for (let i = 0; i < news.length; i++) {
         if (news[i].nickname === user.nickname) {
            axios.delete(`http://localhost:4004/news/${news[i]._id}`)
         }
      }
    }

    return (
        <div className='container'>
            <h2 className="title">Edit the user:</h2>
            <form>
                <p><input onChange={handleFullName} type="text" defaultValue={user.name} placeholder="Full name" className="user-input full-name"></input></p>
                <p><input onChange={handleUsername} type="text" defaultValue={user.nickname} placeholder="Username" className="user-input username"></input></p>
                <p><input onChange={handleLink} type="text" defaultValue={user.photo} placeholder="Link to the profile picture" className="user-input link-input"></input></p>
                <p className="message"></p>
                <div className="btn-block">
                    <button onClick={handleSubmit} type="submit" className="btn">Save</button>
                    <button onClick={handleDelete} type="submit" className="btn">Delete</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateUser

