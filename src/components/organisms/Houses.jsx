import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { FlexBox, Grid } from '../../styles'
import { getHouses } from '../../store/houses.slice'
import filterHouses from '../../helpers/filterHouses'

const HousesStyled = styled(FlexBox)``

function Houses() {
  const dispatch = useDispatch()
  const { houses, hasMoreItems, isLoading, isSuccess, isError } = useSelector(
    (state) => state.houses,
  )
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(getHouses({ page: currentPage, max: 9 }))
  }, [dispatch, currentPage])

  return (
    <HousesStyled>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {isSuccess && (
        <Grid gridGap="32px">
          {houses.allIds
            .filter((id) =>
              filterHouses(
                houses.byId[id],
                houses.filterByCity,
                houses.filterByType,
              ),
            )
            .map((id) => (
              <HouseCard
                key={id}
                title={houses.byId[id].title}
                price={`${houses.byId[id].price}€`}
                img={houses.byId[id].image}
                link=""
              />
            ))}
        </Grid>
      )}
      <FlexBox align="center">
        {hasMoreItems && (
          <Button
            style={{ marginTop: '2rem' }}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Load more
          </Button>
        )}
      </FlexBox>
    </HousesStyled>
  )
}

export default styled(Houses)``
