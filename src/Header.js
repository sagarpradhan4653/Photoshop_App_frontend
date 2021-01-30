import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaughWink } from '@fortawesome/free-solid-svg-icons';




function Header(props) {
    console.log("hello",props.tokenForHeader);
    return (
        <>
        <nav class="navbar navbar-expand-lg navbar-light bg-warning ">
            <div class="container-fluid">
                <a class="navbar-brand" ><FontAwesomeIcon icon={faLaughWink} /> PhotoShop</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                    <a class="nav-link" >{props.tokenForHeader && <Link to='/Logout'><a >Logout</a></Link>}</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" >{!props.tokenForHeader && <Link to='/'><a >Login</a></Link>}</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" >{!props.tokenForHeader && <Link to='/Register'><a >Register</a></Link>}</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link">{!props.tokenForHeader && <Link to='/Editor'><a >Editor</a></Link>}</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        </>
    )
}


const mapStateToProps = (state)=>{
    return {

        tokenForHeader: state.tokenKey.newToken != null ? true : false
    }
}


export default connect(mapStateToProps)(Header)
