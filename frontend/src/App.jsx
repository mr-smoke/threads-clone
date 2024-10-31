import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <div className="bg-black text-white min-h-screen flex justify-center">
        <div className="w-[620px]">
          <header className="flex justify-center pt-6 pb-12">
            <img src="/light-logo.svg" alt="logo" className="w-6 h-6" />
          </header>
          <Routes>
            <Route path="/:id" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
