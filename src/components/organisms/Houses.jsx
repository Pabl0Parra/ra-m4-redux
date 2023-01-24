import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { FlexBox, Grid } from '../../styles'
import { getHouses } from '../../store/houses.slice'

const HousesStyled = styled(FlexBox)``

function Houses() {
  const dispatch = useDispatch()
  const houses = useSelector((state) => state.houses.houses)
  const { allIds, byId } = houses

  // Este estado fuera
  const [renderedHouses, setRenderedHouses] = useState(9)

  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  const handleLoadMore = () => {
    setRenderedHouses((prevCount) => prevCount + 9)
  }

  return (
    <HousesStyled>
      <Grid gridGap="32px">
        {/* No hagas slice aquí, no es necesario y no tendrias que hacer slice */}
        {/* Aquí es donde tienes que filtrar */}
        {allIds.slice(0, renderedHouses).map((id) => (
          <HouseCard
            key={byId[id].id}
            title={byId[id].title}
            price={`${byId[id].price}€`}
            img={byId[id].image}
            link=""
          />
        ))}
      </Grid>
      {renderedHouses < allIds.length && (
        <FlexBox align="center">
          <Button style={{ marginTop: '2rem' }} onClick={handleLoadMore}>
            Load more
          </Button>
        </FlexBox>
      )}
    </HousesStyled>
  )
}
export default styled(Houses)``
