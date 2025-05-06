import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {posts: [], loading: false, error: null, post: null};

export const getPosts = createAsyncThunk('posts/getPosts', async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const res = await fetch('http://localhost:3500/posts')
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        await fetch(`http://localhost:3500/posts/${id}`, {
            method: 'DELETE'
        })
        return id
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const insertPost = createAsyncThunk('posts/insertPost', async (item, thunkAPI) => {
    const {rejectWithValue, getState} = thunkAPI
    const {auth} = getState()
    item.userId = auth.id;
    try {
        const res = await fetch('http://localhost:3500/posts', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        const data = res.json()
        return data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const editPost = createAsyncThunk('posts/editPost', async (item, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const res = await fetch(`http://localhost:3500/posts/${item.id}`, {
            method: 'PATCH',
            body: JSON.stringify(item),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        const data = res.json()
        return data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getItem = createAsyncThunk('posts/getItem', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await fetch(`http://localhost:3500/posts/${id}`)
        const data = await res.json()
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        cleanRecord: (state) => {
            state.post =null
        }
    },
    extraReducers: {
        // GET POSTS
        [getPosts.pending]: (state, action) => {
            state.loading = true
            state.error = null
        },
        [getPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload
        },
        [getPosts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        // INSERT DATA ITEM
        [insertPost.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [insertPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts.push(action.payload)
        },
        [insertPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        // DELETE POST ITEM
        [deletePost.pending]: (state, action) => {
            state.loading = true
            state.error = null
        },
        [deletePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = state.posts.filter((el) => el.id !== action.payload);
        },
        [deletePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        // Get Item
        [getItem.pending]: (state, action) => {
            state.loading = true
            state.error = null
        },
        [getItem.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload;
        },
        [getItem.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        // Edit Post Item
        [editPost.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [editPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload
        },
        [editPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
})

export default postSlice.reducer;