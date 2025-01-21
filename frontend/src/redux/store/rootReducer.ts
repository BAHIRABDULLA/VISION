import { combineReducers } from "@reduxjs/toolkit";
import menteeAuthReducer from '../slices/menteeAuthSlice'
import mentorAuthReducer from '../slices/mentorAuthSlice'
import adminAuthReducer from '../slices/adminAuthSlice'
import themeReducer from '../slices/themeSlice'
import mentorApplicationReducer from '../slices/mentorApplicationSlice'

const rootReducer = combineReducers({
    menteeAuth:menteeAuthReducer,
    mentorAuth:mentorAuthReducer,
    adminAuth:adminAuthReducer,
    theme:themeReducer,
    mentorApplication:mentorApplicationReducer
})

export default rootReducer