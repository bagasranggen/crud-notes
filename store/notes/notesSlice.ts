import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface NotesState {
    noteSelectedId: string;
}

const initialState: NotesState = {
    noteSelectedId: '',
};

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        select: (state: any, action: PayloadAction<string>) => {
            state.noteSelectedId = action.payload;
        },

        // delete: async() => {

        // },
        // increment: (state) => {
        //     // Redux Toolkit allows us to write "mutating" logic in reducers. It
        //     // doesn't actually mutate the state because it uses the Immer library,
        //     // which detects changes to a "draft state" and produces a brand new
        //     // immutable state based off those changes
        //     state.value += 1
        // },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
        // decremenByAmount: (state, action: PayloadAction<number>) => {
        //     state.value -= action.payload
        // },
    },
});

// Action creators are generated for each case reducer function
export const { select } = notesSlice.actions;

// Selector
export const selectValue = (state: RootState) => state.notes.noteSelectedId;

export default notesSlice.reducer;