import styled from "styled-components";

export const Module = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
    padding: 40px;
`

export const Title = styled.h1`
  font-size: 1.5em;
  color: #fff;
  padding: .5em:
`

export const Input = styled.input`
  width: 100%;
  padding: 10px 0;
  font-size: 1.3em;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
`

export const Label = styled.label`
  font-size: 1.3em;
  padding: 10px 0;
  color: #fff;
  pointer-events: none;
`

export const Button = styled.button`
  background-color: ${props => props.primary ?  props.theme.colors.primary : props.theme.colors.secondary};
  color: #fff;
  font-weight: bold;
  font-size: 1em;
  padding: .7em;
  border: none;
  outline: none;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 1em;
`