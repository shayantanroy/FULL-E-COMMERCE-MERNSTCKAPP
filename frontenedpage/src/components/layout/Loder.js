import React from 'react'
import styled, { keyframes} from 'styled-components'


const Loder = () => {
  return (
    <Div>
      <Div1>
      </Div1>
    </Div>
  )
}

export default Loder
const Div=styled.div`
width:100vw;
height:100vh;
background-color:white;
display:flex;
justify-content:center;
align-items:center;`
const Load =keyframes`

to{
    transform:rotateZ(-360deg);
}`

const Div1=styled.div`
width:100px;
height:100px;
border-bottom:5px solid rgb(37, 37, 37);
border-radius:50%;
animation:${Load} 800ms linear infinite;
`







