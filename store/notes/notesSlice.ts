import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'

// First, create the thunk
// const fetchUserById = createAsyncThunk(
//     '/api/notes',
//     async (userId: number, thunkAPI) => {
//       const response = await userAPI.fetchById(userId)
//       return response.data
//     }
//   )

export interface NotesState {
    isLoading: boolean;
    hasErrors: boolean;
    notes: Array<any>;
}

const initialState: NotesState = {
    isLoading: false,
    hasErrors: false,
    notes: [],
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        getNotes: (state) => {
            state.isLoading = true
        },
        getNotesSuccess: (state, action: PayloadAction<Array<any>>) => {
            state.notes = action.payload
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
})

// Action creators are generated for each case reducer function
export const { getNotes, getNotesSuccess } = notesSlice.actions

// Selector
export const selectValue = (state: RootState) => state.notes.notes

export default notesSlice.reducer


// Asynchronous thunk action
export function fetchRecipes() {
    return async (dispatch: any) => {
        dispatch(getNotes())

        try {
            const response = await fetch('/api/notes')
            const data = await response.json()

            dispatch(getNotesSuccess(data))
        } catch (error) {
            // dispatch(getRecipesFailure())
        }
    }
}