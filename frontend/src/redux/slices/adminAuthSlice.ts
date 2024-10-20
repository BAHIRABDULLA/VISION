import { createSlice,PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
    token:string | null
    isAuthenticated:boolean;
    admin:string | null
}

const initialState:AuthState = {
    token:null,
    isAuthenticated:false,
    admin:null,
}

const authSlice = createSlice({
    name:'adminAuth',
    initialState,
    reducers:{
        login:(state,action:PayloadAction<{token:string;admin:string,}>)=>{
            state.token = action.payload.token;
            state.isAuthenticated= true;
            state.admin = action.payload.admin;
        },
        logout:(state)=>{
            state.token = null
            state.isAuthenticated= false;
            state.admin= null
        }
    }
})

export const {login,logout} = authSlice.actions
export default authSlice.reducer