import React, {useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios";
import "./News.scss"

const UpdateNews = () => {
   const {id} = useParams()
   let [post, setPost] = useState({})
   let [news, setNews] = useState([])
   const navigate = useNavigate();
    useEffect(() => {
        async function findPost() {
            await axios.get('http://localhost:4004/news').then(({data}) => {
             setNews(news = data)
            })
            let post = await news.find(post => post.id === id)
            setPost(post)
        }
        findPost()
    }, [])
   
   let [text, setText] = useState('')
   let [link, setLink] = useState('')

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

    function handleSubmit(e) {
        e.preventDefault()
        const message = document.querySelector('.message')
        message.innerText = ''
        if (!text) text = post.content;
        if (!link) link = post.image;
        if ((text && link)) {
            let data = {
                _id: post._id,
                id: post.id,
                content: text, 
                image: link,
                status: "changed",
            }
            //server throws 500 error, but works properly
            axios.put(`http://localhost:4004/news/${post._id}`, data).then(() => navigate('/news')).catch(() => navigate('/news'))
        } else {
            message.innerText = 'Please fill out the form'
        }
    }

    function handleDelete(e) {
        e.preventDefault()
        axios.delete(`http://localhost:4004/news/${post._id}`).then(() => navigate('/news'))
    }

    return (
        <div className='container'>
            <h2 className="title">Edit the post:</h2>
            <form>
                <div className="post-block">
                    <textarea onChange={handleTextChange} defaultValue={post.content} name="content" placeholder="Type the text here..."></textarea>
                    <div className="autor-block">
                        <p className="no-margin"><input onChange={handleLink} defaultValue={post.image} name="image" placeholder="Link to the photo" className="photo-input"></input></p>
                        <select required defaultValue={post.nickname} name="nickname">
                            <option defaultValue="Choose an author">{post.nickname}</option>
                        </select>
                    </div>
                </div>
                <p className="message"></p>
                <div className="btn-block">
                    <button onClick={handleSubmit} type="submit" className="btn">Save</button>
                    <button onClick={handleDelete} type="submit" className="btn">Delete</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateNews;