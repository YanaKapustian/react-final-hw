import React from "react";
import "./News.scss"
import uniqid from 'uniqid';
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPosts } from "../redux/actions";

const News = () => {
    const [news, setNews] = useState([])
    const [users, setUsers] = useState([])
    let [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        async function getData() {
            setLoading(true)
            await axios.get('http://localhost:4004/users').then(({data}) => {
                setUsers(data)
            }).catch(err => console.log('Something went wrong', err))
            await axios.get('http://localhost:4004/news').then(({data}) => {
                setNews(data)
                setLoading(false)
                dispatch(getPosts(data))
            }).catch(err => console.log('Something went wrong', err))
        }
        getData()
    }, [])

    useEffect(() => {
        const message = document.querySelector('.message-state') 
        loading ? message.innerText = 'Loading...' : message.innerText = ''
    }, [loading])

    useEffect(() => {
        const message = document.querySelector('.message-state') 
        news.length === 0 ? message.innerText = 'There is no news' : message.innerText = ''
    }, [news])
    
    const posts = [...news]
    posts.reverse()

    return (
        <div className="container">
            <h2 className="message-state"></h2>
            {posts.map((post) => {
                let user = users.find(user => user.nickname === post.nickname)
                return <div className="post" key={uniqid()}>
                    <img src={user.photo} alt="" className="photo"/>
                    <div>
                        <div className="header">{user.name} <span>{post.nickname} · {post.date} {post.status ? `(${post.status})` : null}</span></div>
                        <div className="content"><NavLink className="link-update" to={`/news/${post.id}`}>{post.content}</NavLink></div>
                        <img src={post.image} alt="" className="image"/>
                    </div>
                </div>
            })}
        </div>
    )
}

export default News;