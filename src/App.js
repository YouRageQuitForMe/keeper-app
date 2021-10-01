import Home from './pages/home';
import Add from './pages/add';
import { Route, BrowserRouter as Router } from 'react-router-dom'

function App() {
  return(
  <Router>
    <Route path="/add" component={Add}></Route>
    <Route path="/" exact component={Home}></Route>
  </Router>
  )}

  
export default App;