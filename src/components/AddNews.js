import React, {useState, useEffect} from "react";
import "./News.scss"
import { addPost } from "../redux/actions";
import { useDispatch } from "react-redux";
import uniqid from 'uniqid';
import axios from "axios";

function AddNews() {
    let [text, setText] = useState('')
    let [link, setLink] = useState('')
    let [select, setSelect] = useState('')
    const dispatch = useDispatch()
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4004/users').then(({data}) => setUsers(data))
    }, [])

    function handleTextChange(e) {
        setText(text = e.target.value)
    }

    function handleLink(e) {
        let message = document.querySelector('.message')
        message.innerText = ''
        if (e.target.value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) ) {
            setLink(link = e.target.value)
        } else {
            message.innerText = 'Please enter the valid link'
        }
    }

    function handleSelect(e) {
        setSelect(select = e.target.value)
    }

    function twoFigureNum(number) {
        let num = number.toString()
        return num.length === 1 ? `0${num}` : num
    }

    function handleSubmit(e) {
        e.preventDefault()
        const message = document.querySelector('.message')
        const textarea = document.querySelector('textarea')
        const photoInput = document.querySelector('.photo-input')
        message.innerText = ''
        if ((text && link && select)) {
            let today = new Date();
            let data = {
                id: uniqid(),
                nickname: select,
                content: text,
                image: link,
                date: `${twoFigureNum(today.getDate())}.${twoFigureNum(today.getMonth() + 1)}.${today.getFullYear()}`,
            }
            axios.post('http://localhost:4004/addNews', data).then(({data}) => dispatch(addPost(data)))
            textarea.value = ''
            photoInput.value = ''
            setText(text = '')
            setLink(link = '')
        } else {
            message.innerText = 'Please fill out the form'
        }
    }

    return (
        <div className='container'>
            <h2 className="title">Create new post:</h2>
            <form method="post" action="news">
                <div className="post-block">
                    <textarea onChange={handleTextChange} name="content" placeholder="Type the text here..."></textarea>
                    <div className="autor-block">
                        <p className="no-margin"><input onChange={handleLink} name="image" placeholder="Link to the photo" className="photo-input"></input></p>
                        <select onChange={handleSelect} required defaultValue="Choose an author" name="nickname">
                            <option defaultValue="Choose an author" disabled hidden>Choose an author</option>
                            {users.map(user => <option key={uniqid()} defaultValue={user.nickname}>{user.nickname}</option>)}
                        </select>
                    </div>
                </div>
                <p className="message"></p>
                <button onClick={handleSubmit} type="submit" className="btn">Add post</button>
            </form>
        </div>
    )
}

export default AddNews

