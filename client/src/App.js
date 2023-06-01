import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Error from "./pages/Error";
import { useSelector } from "react-redux";

function App() {
  const { profile } = useSelector((state) => state.profile);

  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", lest: "-8rem" }}></div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={profile ? <Home /> : <Auth />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={profile ? <Profile /> : <Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
