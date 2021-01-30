import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Editor from './Component/Editor';
import Login from './Component/Login';
import Register from './Component/Register';
import Logout from './Component/Logout';
import Header from './Header';
import { useEffect } from 'react';
import { connect } from 'react-redux';


function App(props) {


  // implimenting local storage token system
  useEffect(() => {
    props.autoStart()
  }, [])
console.log(props.state);



  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/Editor' component={Editor} />
          <Route path='/Register' component={Register} />
          <Route path='/Logout' component={Logout} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoStart: () => dispatch({ type: 'AUTH_START' })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
