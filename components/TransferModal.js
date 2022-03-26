import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CoinSelector } from './modal/CoinSelector'
import { Send } from './modal/Send'
import { TailSpin } from 'react-loading-icons'
import { Receive } from './modal/Receive'
export const TransferModal = ({
  walletAddress,
  sanityTokens,
  thirdWebTokens,
}) => {
  const [action, setAction] = useState('send')
  const [selectedToken, setSelectedToken] = useState({})
  useEffect(() => {
    if (sanityTokens) {
      setSelectedToken(sanityTokens[0])
    }
  }, [sanityTokens])
  const selectedStyle = {
    color: '#3773f5',
  }
  const unselectedStyle = {
    border: '1px solid #282b2f',
  }
  const selectedModal = option => {
    switch (option) {
      case 'send':
        return (
          <Send
            selectedToken={selectedToken}
            walletAddress={walletAddress}
            thirdWebTokens={thirdWebTokens}
            setAction={setAction}
          />
        )
      case 'receive':
        return (
          <Receive
            selectedToken={selectedToken}
            walletAddress={walletAddress}
            setAction={setAction}
          />
        )
      case 'select':
        return (
          <CoinSelector
            selectedToken={selectedToken}
            walletAddress={walletAddress}
            sanityTokens={sanityTokens}
            thirdWebTokens={thirdWebTokens}
            setSelectedToken={setSelectedToken}
            setAction={setAction}
          />
        )
      case 'transferring':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              fontSize: '1.2rem',
            }}
          >
            <h2>Transfer in progress...</h2>
            <TailSpin
              height='80'
              width='80'
              stroke='#3773f5'
              ariaLabel='loading'
            />
          </div>
        )
      case 'transferred':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              fontSize: '2rem',
              fontWeight: '600',
              color: '#27ad75',
            }}
          >
            Transfer complete
          </div>
        )
      default:
        return <h2>send</h2>
    }
  }
  return (
    <Wrapper>
      <Selector>
        <Option
          style={action === 'send' ? selectedStyle : unselectedStyle}
          onClick={() => setAction('send')}
        >
          <p>Send</p>
        </Option>
        <Option
          style={action === 'receive' ? selectedStyle : unselectedStyle}
          onClick={() => setAction('receive')}
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
