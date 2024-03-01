import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../index.css";
import Home from "../pages/Home/Home";
import EditProduct from "../pages/EditProduct/EditProduct";
import MakeProduct from "../pages/MakeProduct/MakeProduct";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editProduct/:productId" element={<EditProduct />} />
          <Route path="/makeProduct/" element={<MakeProduct/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
