/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getHouses, setCity, setType } from '../../store/houses.slice'
import selectsOptions from '../../helpers/selectsOptions'
import { colors, Container, dimensions, FlexBox } from '../../styles'
import { Button, Icon } from '../atoms'
import { SelectGroup } from '../molecules'

const SubHeaderStyled = styled(FlexBox)`
  padding-top: ${dimensions.spacing.xl};
  padding-bottom: ${dimensions.spacing.xl};
  background-color: ${colors.clearBlueBg};
  border-top: 1px solid ${colors.border.clearBlueBg};
  border-bottom: 1px solid ${colors.border.clearBlueBg};
`

const FormStyled = styled(FlexBox).attrs({ as: 'form' })`
  ${SelectGroup} {
    &:first-of-type {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      margin-right: 1rem;
    }
  }
  ${Button} {
    background-color: ${colors.blue};
  }
`

function SubHeader({ ...props }) {
  const dispatch = useDispatch()
  const [userFilters, setUserFilters] = useState({})
  const houses = useSelector((state) => state.houses.houses)

  const handleFilterChange = (event) => {
    setUserFilters((prevFormFilters) => {
      prevFormFilters[event.target.id] = event.target.value
      return prevFormFilters
    })
  }

  const handleSearch = () => {
    dispatch(setCity(userFilters.city))
    dispatch(setType(userFilters.type))
  }

  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  return (
    <SubHeaderStyled {...props}>
      <Container>
        <FormStyled direction="row" align="center">
          <SelectGroup
            id="type"
            label="Tipo"
            defaultText="Piso, chalet o garaje..."
            hideLabel
            onChange={handleFilterChange}
            options={selectsOptions(houses.types)}
          />

          <SelectGroup
            id="city"
            label="Ciudad"
            defaultText="Madrid, Barcelona o Zaragoza..."
            hideLabel
            onChange={handleFilterChange}
            options={selectsOptions(houses.cities)}
          />

          <Button onClick={handleSearch}>
            <Icon icon="search" />
          </Button>
        </FormStyled>
      </Container>
    </SubHeaderStyled>
  )
}

export default styled(SubHeader)``
