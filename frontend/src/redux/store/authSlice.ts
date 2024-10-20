// import { createSlice,PayloadAction } from "@reduxjs/toolkit";

// interface User{
//     fullName?:string;
//     email:string;
// }

// interface AuthState {
//     token:string | null
//     isAuthenticated:boolean;
//     user:User | null;
//     role:'mentee' | 'mentor' | 'admin'| null
// }

// const initialState:AuthState = {
//     token:null,
//     isAuthenticated:false,
//     user:null,
//     role:null
// }

// const authSlice = createSlice({
//     name:'auth',
//     initialState,
//     reducers:{
//         login:(state,action:PayloadAction<{token:string;user:User,role:'mentee'|'mentor'|'admin'}>)=>{
//             state.token = action.payload.token;
//             state.isAuthenticated= true;
//             state.user = action.payload.user;
//             state.role = action.payload.role;
//         },
//         logout:(state)=>{
//             state.token = null
//             state.isAuthenticated= false;
//             state.user= null
//             state.role = null
//         }
//     }
// })

// export const {login,logout} = authSlice.actions
// export default authSlice.reducer