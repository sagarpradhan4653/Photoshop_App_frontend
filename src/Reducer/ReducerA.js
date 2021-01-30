import NewAction from './NewAction'


function ReducerA(state={},action){
    switch(action.type){
        case 'TOKEN_KEY':{
            const { token} = action.payload
            const authDetails = {
                newToken: token

            }
            // localStorage.setItem('NewToken', authDetails.newToken)
            return authDetails
        }
        case 'DONE_LOGOUT':{
            return { tokenKey: null }
        }

        // case 'AUTH_START':{
        //     const authState = { newToken: null}
        //     authState.newToken = localStorage.getItem('NewToken') ? localStorage.getItem('NewToken') : null
        //     return authState

        // }
        default:
            return state
    }
}


export default ReducerA
