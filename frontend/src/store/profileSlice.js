import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    profileMade : false,
    profileData : null
}

const profileSlice = createSlice({
    name : 'profile',
    initialState,
    reducers : {
        createPrfile : (state, action) => {
            state.profileMade = true; 
            state.profileData = action.payload; 
        },
        deleteProfile : (state) => {
            state.profileMade = false; 
            state.profileData = null; 
        }
    }
});

export const { createPrfile, deleteProfile } = profileSlice.actions;
export default profileSlice.reducer;