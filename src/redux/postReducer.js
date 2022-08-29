import { ADD_POST, ADD_USER, GET_POSTS, GET_USERS } from "./types"

const initialState = {
  posts: [],
  users: [],
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
          let posts = [...state.posts]
          
          posts.unshift({
              nickname: action.payload.nickname,
              content: action.payload.content,
              image: action.payload.image,
              date: action.payload.date,
          })
          return Object.assign({}, state, {posts})
        }
        case ADD_USER: {
          let users = [...state.users]
          users.unshift({
            name: action.payload.name,
            photo: action.payload.photo,
            nickname: action.payload.nickname,
          })
          return Object.assign({}, state, {users})
        }
        case GET_POSTS: {
          let posts = action.payload.data;
          return Object.assign({}, state, {posts})
        }
        case GET_USERS: {
          let users = action.payload.data;
          return Object.assign({}, state, {users})
        }
        default: return state;
    }
}




// const initialState = {
//   posts: [
//     {
//       id: uniqid(),
//       nickname: "@yana_kapustian",
//       content: "I was lucky to visit Norway this summer. The views were spectacular!",
//       image: 'https://images.unsplash.com/photo-1611771341253-dadb347165a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
//       date: "15.07.2022",
//     },
//     {
//       id: uniqid(),
//       nickname: "@girl_with_flowers",
//       content: "Finally graduated! Now I'm a bachelor of Computer Science!",
//       image: 'https://images.unsplash.com/photo-1618355776464-8666794d2520?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGdyYWR1YXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       date: "24.06.2022",
//     },
//     {
//       id: uniqid(),
//       nickname: "@stranger",
//       content: "Meet Rosie! My new cat!",
//       image: 'https://images.unsplash.com/photo-1518288774672-b94e808873ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=738&q=80',
//       date: "20.06.2022",
//     },
//   ],
//   users: [
//     {
//       name: "Yana Kapustian",
//       photo: 'https://i.ibb.co/yYK0g5Y/1-40.jpg',
//       nickname: "@yana_kapustian",
//     },
//     {
//       name: "Emily Smith",
//       photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
//       nickname: "@girl_with_flowers",
//     },
//     {
//       name: "Liam Weikko",
//       photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
//       nickname: "@stranger",
//     }
//   ]
// }
