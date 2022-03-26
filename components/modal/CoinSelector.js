import React from 'react'
import styled from 'styled-components'
import { CoinItem } from './CoinItem'
export const CoinSelector = ({
  setAction,
  selectedToken,
  setSelectedToken,
  walletAddress,
  sanityTokens,
  thirdWebTokens,
}) => {
  return (
    <Wrapper>
      <Title>Select Asset</Title>
      <CoinList>
        {sanityTokens.map(token => (
          <CoinItem
            key={token.name}
            token={token}
            sender={walletAddress}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            sanityTokens={sanityTokens}
            thirdWebTokens={thirdWebTokens}
            setAction={setAction}
          />
        ))}
      </CoinList>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`
const CoinList = styled.div`
  display: flex;
  flex-direction: column;
`
