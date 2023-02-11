import { Route, Routes } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import Users from "./components/Users";
import UserUpdate from "./components/UserUpdate";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
    <NavBar></NavBar>
      <Routes>
        <Route path="/newusers" element={<CreateUser></CreateUser>}></Route>
        <Route path="/users" element={<Users></Users>}></Route>
        <Route path="/userUpdate/:userId" element={<UserUpdate></UserUpdate>}></Route>
      </Routes>
    </>
  );
}

export default App;
