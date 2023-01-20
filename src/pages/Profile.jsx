import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Body } from '../components/layout'
import { Container, FlexBox } from '../styles'
import { Button, Text } from '../components/atoms/index'
import { InputTextGroup } from '../components/molecules'
import {
  updateName,
  updateFirstSurname,
  updateSecondSurname,
} from '../store/user.slice'

function UserProfile() {
  const user = useSelector((state) => state.user)
  return (
    <FlexBox>
      <Text>
        <strong>Nombre</strong>: {user.name}
      </Text>
      <Text>
        <strong>Apellidos</strong>: {user.surnames.first} {user.surnames.second}
      </Text>
    </FlexBox>
  )
}

function UpdateUserForm() {
  const user = useSelector((state) => state.user)
  const [userFormData, setUserFormData] = useState({ ...user })
  const dispatch = useDispatch()

  // console.log(user)
  // console.log(userFormData)
  const handleUpdate = () => {
    dispatch(updateName(userFormData.name))
    dispatch(updateFirstSurname(userFormData.surnames.first))
    dispatch(updateSecondSurname(userFormData.surnames.second))
  }
  return (
    <FlexBox as="form">
      <InputTextGroup
        id="nombre"
        label="Nombre"
        value={userFormData.name}
        onChange={(e) =>
          setUserFormData({ ...userFormData, name: e.target.value })
        }
      />
      <InputTextGroup
        id="primer-apellido"
        label="Primer Apellido"
        value={userFormData.surnames.first}
        onChange={(e) =>
          setUserFormData({
            ...userFormData,
            surnames: { ...userFormData.surnames, first: e.target.value },
          })
        }
      />
      <InputTextGroup
        id="segundo-apellido"
        label="Segundo Apellido"
        value={userFormData.surnames.second}
        onChange={(e) =>
          setUserFormData({
            ...userFormData,
            surnames: { ...userFormData.surnames, second: e.target.value },
          })
        }
      />
      <Button tyoe="button" onClick={handleUpdate}>
        Enviar
      </Button>
    </FlexBox>
  )
}

function Profile() {
  const houses = useSelector((state) => state.houses.houses)
  const { allIds, byId } = houses
  console.log(houses)
  return (
    <Body>
      <Container direction="row">
        {allIds.map((id) => (
          <Text>{byId[id].title}</Text>
        ))}
        <UserProfile />
        <UpdateUserForm />
      </Container>
    </Body>
  )
}

export default Profile
