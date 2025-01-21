import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    firstComponentData: {
        file: '',
        jobTitle: '',
        company: '',
        location: '',
        category: '',
        experience: '',
        skills: [],
        bio: '',
        country: '',
        socialMediaUrls: {
            linkedin: '',
            x: '',
            github: '',
            portfolio: ''
        }
    },

}

const mentorApplicationSlice = createSlice({
    name: 'mentorApplication',
    initialState,
    reducers: {
        setFirstComponentData: (state, action) => {
            state.firstComponentData = { ...state.firstComponentData, ...action.payload };
        },
        resetSkills: (state) => {
            state.firstComponentData.skills = [];
        },

        resetApplicationData: () => initialState
    }
});


export const { setFirstComponentData, resetSkills, resetApplicationData } = mentorApplicationSlice.actions
export default mentorApplicationSlice.reducer