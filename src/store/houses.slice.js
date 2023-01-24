import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import urls from '../constants/urls'

// Aquí en el asyncThunk puedes pasarle parametros para hacer la paginación
// La paginación o cargar más sirve para no pedir todos los datos de golpe al servidor
export const getHouses = createAsyncThunk('houses/getHouses', async () => {
  const res = await fetch(urls.houses)
  const data = await res.json()
  return data
})

const initialState = {
  reqStatus: 'initial',
  houses: {
    byId: {},
    allIds: [],
  },
}

const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHouses.pending, (state) => {
      state.reqStatus = 'loading'
    })
    builder.addCase(getHouses.fulfilled, (state, action) => {
      state.reqStatus = 'success'
      action.payload.forEach((house) => {
        state.houses.byId[house.id] = house
        if (!state.houses.allIds.includes(house.id)) {
          state.houses.allIds.push(house.id)
        }
      })
    })
    builder.addCase(getHouses.rejected, (state) => {
      state.reqStatus = 'failed'
    })
  },
})

export const { updateName, updateFirstSurname, updateSecondSurname } =
  housesSlice.actions
export default housesSlice.reducer
