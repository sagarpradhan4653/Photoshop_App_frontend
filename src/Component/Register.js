import React, {  useState }  from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRegistered, faUser,faKey } from '@fortawesome/free-solid-svg-icons'


function Register(props) {

    const handleSubmit = (e)=>{
        e.preventDefault()
        const userDetailsPost = {
            username: e.currentTarget['username'].value,
            password: e.currentTarget['password'].value
        }        

        axios.post('https://sagarphotoshop.herokuapp.com/users/',userDetailsPost) // passing the userdetails into database
        .then(response=>{
            console.log(response.data);
            

            props.history.push('/')
        })
        
    }


    return (
        <>  

            <div id="login-container" className="row justify-content-center">
                <div className="col-xl-6 col-lg-7 col-md-9">
                    <div className="card shadow-lg bg-primary p-3 mb-5">
                        <div className="card-body p-4 p-md-5 mx-3 rounded">
                            <h1><FontAwesomeIcon icon={faRegistered} /> Register </h1><br/><br/><br/>
                            <form className="row g-6" onSubmit={handleSubmit}>
                                <div className="col-md-6">
                                    <label for="validationDefaultUsername" className="form-label"><FontAwesomeIcon icon={faUser} />  Username</label>
                                    <input type="text" name="username" placeholder="Type Your Username" className="form-control" id="validationDefaultUsername"  aria-describedby="inputGroupPrepend2" required/>
                                </div>
                                <div className="col-md-6">
                                    <label for="validationDefault02" className="form-label"><FontAwesomeIcon icon={faKey} />  Password</label>
                                    <input type="password" name="password" placeholder="Type Your Password" className="form-control" id="validationDefault05" required/>
                                </div>
                                <div className="col-12 mt-4">
                                    <button className="btn btn-danger mt-3" type="submit">SUBMIT</button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}



export default Register

