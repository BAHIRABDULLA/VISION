import { combineReducers } from "@reduxjs/toolkit";
import menteeAuthReducer from '../slices/menteeAuthSlice'
import mentorAuthReducer from '../slices/mentorAuthSlice'
import adminAuthReducer from '../slices/adminAuthSlice'

const rootReducer = combineReducers({
    menteeAuth:menteeAuthReducer,
    mentorAuth:mentorAuthReducer,
    adminAuth:adminAuthReducer
})

export default rootReducer