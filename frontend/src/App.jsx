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
import Conversations from "./pages/Conversations";
import Messages from "./pages/Messages";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="bg-black text-white min-h-screen flex justify-center">
        <Sidebar />
        <Header />
        <div className="bg-neutral-900 rounded-xl w-[620px] h-max flex flex-col mt-16 mb-16 md:mb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Profile />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route path="/signup" element={user ? <Home /> : <Signup />} />
            <Route path="/update" element={user ? <UpdateUser /> : <Login />} />
            <Route path="/freeze" element={user ? <Freeze /> : <Login />} />
            <Route
              path="/chat"
              element={user ? <Conversations /> : <Login />}
            />
            <Route path="/chat/:id" element={user ? <Messages /> : <Login />} />
          </Routes>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
