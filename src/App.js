import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import SignUp from "./pages/signup/Signup"
import SignIn from "./pages/signin/SignIn"
import Feedback from "./components/feedback/Feedback"
import Reports from "./pages/reports/Reports"
import Report from "./pages/report/Report";



function App() {
  const loggedin = ()=>{
   if(localStorage.getItem('token') === null){
     return false;
   }
   else{
     return true
   }
  }
 
  console.log(loggedin())
  return (
    <Router>
      {loggedin() ? <Topbar/> : null}
      <Switch>
      <div className="container">
      {loggedin() ? <Sidebar/> : null}
     
          <Route exact path="/">
            { loggedin() ? <Home /> : <Redirect to = "/signin"/>}
          </Route>
          <Route path="/users" exact>
          {loggedin() ? <UserList /> : <Redirect to = '/signin'/>}
          </Route>
          <Route path="/user/:userId" exact>
          {loggedin() ? <User /> : <Redirect to = '/signin'/>}
          </Route>
          <Route path="/report/:reportid" exact>
          {loggedin() ? <Report /> : <Redirect to = '/signin'/>}
          </Route>
          <Route path="/newUser" exact>
            <NewUser />
          </Route>
          <Route path="/posts" exact>
          {loggedin() ? <ProductList /> : <Redirect to = '/signin'/>}
          </Route>
          <Route path="/post/:postId" exact>
          {loggedin() ? <Product /> : <Redirect to = '/signin'/>}
          </Route>
          <Route path="/newproduct" exact>
          {loggedin() ? <NewProduct /> : <Redirect to = '/signin'/>}
          </Route>
          <Route path="/feedback" exact>
          {loggedin() ? <Feedback /> : <Redirect to = '/signin'/>}
          </Route>
          <Route path="/reports" exact>
            {loggedin() ? <Reports /> : <Redirect to = '/signin'/>}
          </Route>
          <Route path = "/signin" exact>
              {loggedin() ? <Redirect to = "/"/> : <SignIn/>}
          </Route>
          <Route path = "/signup" exact>
              {loggedin() ? <Redirect to = "/"/> : <SignUp/> }
          </Route>
          </div>
      
        </Switch>
     
    </Router>
  );
}

export default App;
