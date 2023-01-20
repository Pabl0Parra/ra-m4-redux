import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filterByType: null,
    filterByCity: null,
  },
  reducers: {
    setFilterByType: (state, action) => {
      state.filterByType = action.payload
    },
    setFilterByCity: (state, action) => {
      state.filterByCity = action.payload
    },
  },
})

export const { setFilterByType, setFilterByCity } = filterSlice.actions
export default filterSlice.reducer
