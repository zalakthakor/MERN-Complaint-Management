import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Signin from "./Components/Signin/Signin";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import Users from "./Components/Users/Users";
import Complaint from "./Components/Complaint/Complaint";
import Close from "./Components/Complaint/Close";
import Edituser from "./Components/Users/Edituser";
import Users1 from "./Components/Users/Users1";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signin" element={<Signin />} />

          <Route exact path="/complaints" element={<Complaint />} />
          <Route exact path="/close" element={<Close />} />
          <Route exact path="/user" element={<Users1 />} />

          <Route exact path="/edituser/:id" element={<Edituser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
