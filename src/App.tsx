import AddressBook from "./components/addressbook/AddressBook";
import Tabs from "./components/tabs/Tabs";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import UserForm from "./components/userform/UserForm";
import "@cloudscape-design/global-styles/index.css"
import Books from "./components/books/Books";

function App() {
  
  return (
  
   <Router>
    
   <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/page1">Page 1</Link>
        </li>
        <li>
          <Link to="/page2">Page 2</Link>
        </li>
        <li>
          <Link to="/page3">Page 3</Link>
        </li>
      </ul>
    </nav>
   
      <Routes>
        <Route path="/" element={<Tabs />} />
        <Route path="/page3" element={ <Books  />} />
        <Route path="/page1" element={ <AddressBook  />} />
        <Route path="/page2" element={ <UserProvider><UserForm /></UserProvider>} />
      </Routes>
     
    </Router>
 
  );
}

export default App;
