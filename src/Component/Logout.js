import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Header from '../Header'
import { Redirect } from 'react-router-dom'


function Logout(props) {

    useEffect(()=>{
        props.logOutDone() // when click on logout it automatically run the tokenkey will replace with null value
    },[])


    return (
        <div>
            <Header/>
            <Redirect to="/" />

        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logOutDone: () => dispatch({ type: 'DONE_LOGOUT' })
    }
}

export default connect(null,mapDispatchToProps)(Logout)
