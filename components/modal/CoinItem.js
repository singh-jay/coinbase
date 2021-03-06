import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '../../lib/sanity'
import { FaCheck } from 'react-icons/fa'
import Image from 'next/image'
export const CoinItem = ({
  token,
  sender,
  selectedToken,
  setSelectedToken,
  sanityTokens,
  thirdWebTokens,
  setAction,
}) => {
  const [balance, setBalance] = useState('Fetching')
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    const getBalance = async () => {
      let activeThirdWebToken
      for (let thirdWebToken of thirdWebTokens) {
        if (thirdWebToken.address === token.contractAddress) {
          activeThirdWebToken = thirdWebToken
        }
      }
      if (activeThirdWebToken) {
        const balance = await activeThirdWebToken.balanceOf(sender)
        if (balance) {
          setBalance(balance.displayValue)
        }
      }
    }

    const getImageUrl = async () => {
      const url = imageUrlBuilder(client).image(token.logo).url()
      if (url) {
        setImageUrl(url)
      }
    }
    if (thirdWebTokens) {
      getBalance()
    }
    if (token) {
      getImageUrl()
    }
  }, [token, thirdWebTokens, sender])

  return (
    <Wrapper
      style={{
        backgroundColor: selectedToken.name === token.name ? '#141519' : '',
      }}
      onClick={() => {
        setSelectedToken(token)
        setAction('send')
      }}
    >
      <Main>
        <Icon>
          {imageUrl && (
            <Image src={imageUrl} width={100} height={100} alt={token.name} />
          )}
        </Icon>
        <NameDetails>
          <Name>{token.name}</Name>
          <Symbol>{token.symbol}</Symbol>
        </NameDetails>
      </Main>
      <Balance>
        {balance} {token.symbol}
      </Balance>
      <IsSelected>
        {selectedToken.contractAddress === token.contractAddress && <FaCheck />}
      </IsSelected>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 0.3rem;

  &:hover {
    background-color: #0e0f14;
  }
`
const Main = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`
const Icon = styled.div`
  margin-right: 1rem;
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;

  & > img {
    height: 120%;
    width: 120%;
    object-fit: cover;
  }
`
const NameDetails = styled.div``

const Name = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
`

const Symbol = styled.div`
  color: #888f9b;
  font-size: 0.8rem;
`

const Balance = styled.div``

const IsSelected = styled.div`
  margin-left: 0.5rem;
  color: #3773f5;
`
