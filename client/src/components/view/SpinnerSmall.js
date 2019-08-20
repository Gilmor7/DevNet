import React from 'react'
import styled, { keyframes } from 'styled-components'

const SpinnerSmall = () => {
    return (
        <Loader>
            Loading...
        </Loader>
    )
}

export default SpinnerSmall


const load3 = keyframes`  
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Loader = styled.div`
  font-size: 5px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 5em;
  height: 5em;
  border-radius: 50%;
  background: #000080;
  background: -moz-linear-gradient(left, #000080 10%, rgba(0,0,128, 0) 42%);
  background: -webkit-linear-gradient(left, #000080 10%, rgba(0,0,128, 0) 42%);
  background: -o-linear-gradient(left, #000080 10%, rgba(0,0,128, 0) 42%);
  background: -ms-linear-gradient(left, #000080 10%, rgba(0,0,128, 0) 42%);
  background: linear-gradient(to right, #000080 10%, rgba(0,0,128, 0) 42%);
  position: relative;
  
  animation: ${load3} 1.1s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

&:before {
  width: 50%;
  height: 50%;
  background: #000080;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}
&:after {
  background: white;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
`





