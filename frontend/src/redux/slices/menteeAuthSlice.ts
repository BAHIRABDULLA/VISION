import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface Mentee{
    fullName?:string;
    email:string;
    role?:string
}

interface AuthState {
    token:string | null
    isAuthenticated:boolean;
    user:Mentee | null;
}

const initialState:AuthState = {
    token:null,
    isAuthenticated:false,
    user:null,
}

const authSlice = createSlice({
    name:'menteeAuth',
    initialState,
    reducers:{
        login:(state,action:PayloadAction<{token:string;user:Mentee}>)=>{
            state.token = action.payload.token;
            state.isAuthenticated= true;
            state.user = action.payload.user;
        },
        logout:(state)=>{
            state.token = null
            state.isAuthenticated= false;
            state.user= null
        }
    }
})

export const {login,logout} = authSlice.actions
export default authSlice.reducer