import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./components/Header";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { UserContextProvider } from "./components/UserContext";
import CreatePost from "./Pages/CreatePost";
import "./App.css";
import Posts from "./Pages/Posts";
import EditPost from "./Pages/EditPost";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/posts" element={<Posts />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/create" element={<CreatePost />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;