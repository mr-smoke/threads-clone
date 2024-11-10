import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UpdateUser from "./pages/UpdateUser";
import { Toaster } from "./components/ui/toaster";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div className="bg-black text-white min-h-screen flex justify-center">
        <Sidebar />
        <Header />
        <div className="w-[620px] flex flex-col mt-16">
          {/* <header className="flex justify-center pt-6 pb-12">
            <img src="/light-logo.svg" alt="logo" className="w-6 h-6" />
          </header> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Profile />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/update" element={<UpdateUser />} />
          </Routes>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
