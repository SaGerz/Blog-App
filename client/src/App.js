import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserContextProvider from "./UserContext";
import CreatePost from "./Pages/CreatePost";
import PostPages from "./Pages/PostPages";
import Edit from "./Pages/Edit";
import Delete from "./components/Delete";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPages />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/delete/:id" element={<Delete />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
