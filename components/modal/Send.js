import React from 'react'
import styled from 'styled-components'
export const Send = () => {
  return (
    <Wrapper>
      <Amount>
        <InputContainer>
          <Input placeholder='0' type='number' />
          <span>ETH</span>
        </InputContainer>
        {!0 && <Warning>Amount is required field</Warning>}
      </Amount>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Amount = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const InputContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  & > span {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    color: #3773f5;
  }
`

const Input = styled.input`
  border: none;
  background: none;
  outline: none;
  color: #fff;
  font-size: 2rem;
  text-wrap: 'wrap';
  text-align: right;
  width: 100%;
  margin-right: 1rem;
  &::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`
const Warning = styled.div`
  padding: 1rem 0 2rem 0;
  text-align: center;
  color: #8a919e;
`
const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`
