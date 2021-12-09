import { Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/index";
import Applicants from "./pages/Table";

export default function App() {
  return (
          <div
      style={{
        overflowY: "auto",
        overflowX: "hidden"
      }}
    >
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/applicants" exact component={Applicants} />
        
      </BrowserRouter>
    </div>
  
  );
}