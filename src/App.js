import { HashRouter, Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import AddUser from "./components/AddUser";
import Users from "./components/Users";
import News from "./components/News";
import AddNews from "./components/AddNews";
import Navbar from "./components/Navbar";
import UpdateNews from "./components/UpdateNews";
import UpdateUser from "./components/UpdateUser";

function App() {
  return (
    <HashRouter basename='/'>
      <Navbar></Navbar>
      <Routes>
        <Route exact path='/users' element={<Users />}></Route>
        <Route exact path="/" element={ <Navigate to="/users" /> }></Route>
        <Route exact path='/users/:nickname' element={<UpdateUser />}></Route>
        <Route exact path='/addUser' element={<AddUser />}></Route>
        <Route exact path='/news' element={<News />}></Route>
        <Route exact path='/addNews' element={<AddNews />}></Route>
        <Route exact path='/news/:id' element={<UpdateNews />}></Route>
      </Routes>
      
    </HashRouter>
  );
}

export default App;
