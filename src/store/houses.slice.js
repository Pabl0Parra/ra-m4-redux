/* eslint-disable default-param-last */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { urls } from '../constants'

export const getHouses = createAsyncThunk(
  'houses/getHouses',
  async (options = { page: 1, max: 9 }, { rejectWithValue }) => {
    const { page, max } = options
    try {
      const res = await fetch(`${urls.houses}?_page=${page}&_limit=${max}`)
      const data = await res.json()
      const totalItems = res.headers.get('X-Total-Count')
      const hasMoreItems = page * max <= totalItems
      return { data, hasMoreItems }
    } catch (err) {
      console.log('Error loading the houses list: ', err)
      return rejectWithValue('Error loading the houses list')
    }
  },
)

const initialState = {
  reqStatus: 'initial',
  isLoading: false,
  isSuccess: false,
  isError: false,
  hasMoreItems: true,
  houses: {
    byId: {},
    allIds: [],
    filterByType: null,
    filterByCity: null,
    cities: [],
    types: [],
  },
}

export const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.houses.filterByCity = action.payload ? action.payload : null
    },
    setType: (state, action) => {
      state.houses.filterByType = action.payload ? action.payload : null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHouses.pending, (state) => {
      state.reqStatus = 'loading'
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(getHouses.fulfilled, (state, action) => {
      state.reqStatus = 'success'
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.hasMoreItems = action.payload.hasMoreItems

      action.payload.data.forEach((house) => {
        state.houses.byId[house.id] = house
        if (!state.houses.allIds.includes(house.id)) {
          state.houses.allIds.push(house.id)

          if (!state.houses.types.includes(house.type)) {
            state.houses.types.push(house.type)
          }

          if (!state.houses.cities.includes(house.city)) {
            state.houses.cities.push(house.city)
          }
        }
      })
    })
    builder.addCase(getHouses.rejected, (state) => {
      state.reqStatus = 'failed'
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
    })
  },
})

export const { setCity, setType } = housesSlice.actions
export default housesSlice.reducer
