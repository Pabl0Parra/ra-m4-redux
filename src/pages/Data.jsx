import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text } from '../components/atoms'
import { Body } from '../components/layout'
import { getHouses } from '../store/houses.slice'

function Data() {
  const dispatch = useDispatch()
  const houses = useSelector((state) => state.houses.houses)
  const { allIds, byId } = houses

  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  return (
    <Body>
      {allIds.map((id) => (
        <Text>{byId[id].title}</Text>
      ))}
    </Body>
  )
}

export default Data
