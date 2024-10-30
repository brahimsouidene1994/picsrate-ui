import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ALBUM } from '../actions'
import PictureObject from '../../models/picture'

interface AlbumState {
  value: Array<PictureObject>
}

// Define the initial state using that type
const initialState: AlbumState = {
  value: []
}

export const albumSlice = createSlice({
  name: ALBUM,
  initialState,
  reducers: {
    setAlbum: (state, action: PayloadAction<Array<PictureObject>>) => {
      state.value = action.payload
    },
    clearAlbum: state => {
      state.value = []
    },
    deleteOneFromAlbum: (state, action: PayloadAction<String>) => {
      // state.value = action.payload
      if (state.value.length > 0) {
        state.value = state.value.filter((pic: PictureObject) => String(pic._id) !== action.payload);
      }
    },
    addOneToAlbum: (state, action: PayloadAction<PictureObject>) => {
      state.value.push(action.payload)
    }
  }
},
)

// Action creators are generated for each case reducer function
export const { setAlbum, clearAlbum, deleteOneFromAlbum, addOneToAlbum } = albumSlice.actions

export default albumSlice.reducer