import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counter/counterSlice'
import notesSlice from './notes/notesSlice'

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        notes: notesSlice,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch