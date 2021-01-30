import ReducerA from './ReducerA'
import { combineReducers } from 'redux'

// we passed value into store define corresponding reducers 
// when value comes from mapDispatchToProps then it to different reducers

export default combineReducers({
    tokenKey:ReducerA,
})