import { Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/index";
import Applicants from "./pages/Table";
import DocumentUpload from "./pages/documentUpload";

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
        <Route path="/documentUpload" exact component={DocumentUpload} />


        
      </BrowserRouter>
    </div>
  
  );
}