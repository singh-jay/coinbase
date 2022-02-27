import React, { useState } from 'react'
import styled from 'styled-components'
import { Send } from './modal/Send'
export const TransferModal = () => {
  const [action, setAtion] = useState('send')
  const selectedStyle = {
    color: '#3773f5',
  }
  const unselectedStyle = {
    border: '1px solid #282b2f',
  }
  const SendModal = <h2>send</h2>
  const ReceiveModal = <h2>receive</h2>
  const selectedModal = (option) => {
    switch (option) {
      case 'send':
        return <Send />
      case 'receive':
        return <h2>receive</h2>
      default:
        return <h2>send</h2>
    }
  }
  return (
    <Wrapper>
      <Selector>
        <Option
          style={action === 'send' ? selectedStyle : unselectedStyle}
          onClick={() => setAtion('send')}
        >
          <p>Send</p>
        </Option>
        <Option
          style={action === 'receive' ? selectedStyle : unselectedStyle}
          onClick={() => setAtion('receive')}
        >
          <p>Receive</p>
        </Option>
      </Selector>
      <ModalMain>{selectedModal(action)}</ModalMain>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 35rem;
  width: 27rem;
  color: #fff;
  border: 1px solid #282b2f;
  display: flex;
  flex-direction: column;
`

const Selector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
`
const Option = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background-color: #111214;
  }
`

const ModalMain = styled.div`
  padding: 1rem;
  flex: 1;
`
