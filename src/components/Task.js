import React from 'react'
import styled from 'styled-components'

const Tile = styled.div`
    display: flex;
    padding: .3em;
`
const Title = styled.h2`
    color: #fff;
`

const Task = ({ task }) => {


  return (
    <Tile>
        <Title>{task.title}</Title>
        {/* task.note */}
        
    </Tile>
  )
}

export default Task