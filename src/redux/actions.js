import { ADD_POST, ADD_USER, GET_POSTS, GET_USERS } from "./types";

export function addPost(data) {
    let {nickname, content, image, date} = data;
    return {
        type: ADD_POST,
        payload: {nickname, content, image, date}
    }
}

export function addUser(data) {
    let {name, nickname, photo} = data;
    return {
        type: ADD_USER,
        payload: {name, nickname, photo}
    }
}

export function getPosts(data) {
    return {
        type: GET_POSTS,
        payload: {data}
    }
}

export function getUsers(data) {
    return {
        type: GET_USERS,
        payload: {data}
    }
}