import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import SinglePost from "./pages/SinglePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UpdateUser from "./pages/UpdateUser";
import { Toaster } from "./components/ui/toaster";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Freeze from "./pages/Freeze";

function App() {
  return (
    <>
      <div className="bg-black text-white min-h-screen flex justify-center">
        <Sidebar />
        <Header />
        <div className="bg-gray-900 rounded-xl w-[620px] h-max flex flex-col mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Profile />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/update" element={<UpdateUser />} />
            <Route path="/freeze" element={<Freeze />} />
          </Routes>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
