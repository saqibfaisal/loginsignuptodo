import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../screen/login";
import Signup from "../screen/signup";
function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}
export default AppRouter;