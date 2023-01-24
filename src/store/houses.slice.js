import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import urls from '../constants/urls'

export const getHouses = createAsyncThunk(
  'houses/getHouses',
  async ({ rejectWithValue }, options = { page: 1, max: 9 }) => {
    const { page, max } = options
    try {
      const response = await fetch(`${urls.houses}?page=${page}&max=${max}`)
      const data = await response.json()
      const totalItems = response.headers.get('X-Total-Count')
      const hasMoreItems = page * max <= totalItems
      return { data, hasMoreItems }
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const initialState = {
  reqStatus: 'initial',
  hasMoreItems: true,
  houses: {
    byId: {},
    allIds: [],
    byType: {},
    byCity: {},
  },
  filters: {
    filterByType: '',
    filterByCity: '',
  },
}

export const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    setFilterByType: (state, action) => {
      state.filterByType = action.payload
    },
    setFilterByCity: (state, action) => {
      state.filterByCity = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHouses.pending, (state) => {
      state.reqStatus = 'loading'
    })
    builder.addCase(getHouses.fulfilled, (state, action) => {
      state.reqStatus = 'success'
      state.hasMoreItems = action.payload.hasMoreItems

      action.payload.forEach((house) => {
        state.houses.byId[house.id] = house
        if (!state.houses.allIds.includes(house.id)) {
          state.houses.allIds.push(house.id)

          if (state.houses.byType[house.type] === undefined) {
            state.houses.byType[house.type] = [house.id]
          } else {
            state.houses.byType[house.type].push(house.id)
          }

          if (state.houses.byCity[house.city] === undefined) {
            state.houses.byCity[house.city] = [house.id]
          } else {
            state.houses.byCity[house.city].push(house.id)
          }
        }
      })
    })
    builder.addCase(getHouses.rejected, (state) => {
      state.reqStatus = 'failed'
    })
  },
})

export const { setFilterByType, setFilterByCity } = housesSlice.actions
export default housesSlice.reducer
