import React, {  useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons'



function Login(props) {
    const[uname,setUserName] = useState('')


    // useEffect(()=>{
    //     if(props.sendToAuth){
    //         props.history.push('/Editor')
    //     } 

    // },[props.sendToAuth])
    
    


    const handleSubmit = (e)=>{
        e.preventDefault()
        const userDetailsAuth = {
            username: e.currentTarget['username'].value,
            password: e.currentTarget['password'].value,
            
        }

        axios.post('https://sagarphotoshop.herokuapp.com/auth/',userDetailsAuth) // passing the userdetails into database
        .then(response=>{
            props.takeTokenKey(response.data)
            console.log("login",response.data);
            props.history.push('/Editor') // push toward editor file if the token is generated
        })

        const interval = setInterval(() => {  // passing the username invalid msg to login page with one sec time interval
            {props.sendToAuth && setUserName("Username and Password Invalid")}
        }, 1000);
        return () => clearInterval(interval);
        
    }

    console.log("checktoken",props.state);


    return (
        <>
                <div id="login-container" className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-9">
                        <div className="card shadow-lg bg-warning p-3 mb-5">
                            <div className="card-body p-4 p-md-5 mx-3 rounded">
                                <h1><FontAwesomeIcon icon={faSignInAlt} /> Login</h1><br/><br/><br/>
                                <form className="row g-6" onSubmit={handleSubmit}>
                                    <div className="col-md-6">
                                        <label for="validationDefault01" className="form-label"><FontAwesomeIcon icon={faUser} /> Username</label>
                                        <input type="text" name="username" placeholder="Type Your Username" className="form-control" id="validationDefault01" required/>
                                    </div> 
                                    <div className="col-md-6">
                                        <label for="validationDefault02" className="form-label"><FontAwesomeIcon icon={faKey} /> Password</label>
                                        <input type="password" name="password" placeholder="Type Your Password" className="form-control" id="validationDefault02" required/>
                                    </div>
                                    <div className="col-12 mt-4 " >
                                        <button className="btn btn-primary mt-3" type="submit">LOGIN</button>
                                    </div>
                                </form>
                            </div>                            
                        </div>
                        <p id="p">{uname}</p>
                    </div>
                </div>
        </>
    )
}

const mapStateToProps = (state)=>{
    return{
        state,
        sendToAuth: state.tokenKey != null ? true : false
    }
}


const mapDispatchToProps=(dispatch)=>{
    return {
        takeTokenKey: t=> dispatch({type:'TOKEN_KEY',payload:t}) // passing the token to state
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
