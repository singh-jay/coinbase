import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaWallet } from 'react-icons/fa'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '../../lib/sanity'
import Image from 'next/image'
export const Send = ({
  selectedToken,
  setAction,
  thirdWebTokens,
  walletAddress,
}) => {
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [imageUrl, setImageUrl] = useState(null)
  const [activeThirdWebToken, setActiveThirdWebToken] = useState(null)
  const [balance, setBalance] = useState()

  useEffect(() => {
    if (selectedToken.logo) {
      const url = imageUrlBuilder(client).image(selectedToken.logo).url()
      if (url) {
        setImageUrl(url)
      }
    }
  }, [selectedToken])
  useEffect(() => {
    const activeToken = thirdWebTokens.find(
      token => token.address === selectedToken.contractAddress
    )
    if (activeToken) {
      setActiveThirdWebToken(activeToken)
    }
  }, [thirdWebTokens, selectedToken.contractAddress])
  useEffect(() => {
    const getBalance = async () => {
      const balance = await activeThirdWebToken.balanceOf(walletAddress)
      if (balance) {
        setBalance(balance.displayValue)
      }
    }
    if (activeThirdWebToken) {
      getBalance()
    }
  }, [activeThirdWebToken, walletAddress])

  const transferCrypto = async () => {
    if (activeThirdWebToken && amount && recipient) {
      setAction('transferring')
      const tx = await activeThirdWebToken.transfer(
        recipient,
        amount.toString().concat('00000000000000000')
      )
      setAction('transferred')
    } else {
      console.log('missing data')
    }
  }
  return (
    <Wrapper>
      <Amount>
        <InputContainer>
          <Input
            placeholder='0'
            type='number'
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <span>{selectedToken.symbol}</span>
        </InputContainer>
        <Warning style={{ visibility: amount ? 'hidden' : 'visible' }}>
          Amount is a required field
        </Warning>
      </Amount>
      <TransferForm>
        <Row>
          <FieldName>To</FieldName>
          <Icon>
            <FaWallet />
          </Icon>
          <Receipient
            placeholder='Address'
            type={'text'}
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
          />
        </Row>
        <Divider />
        <Row>
          <FieldName>Pay with</FieldName>
          <CoinSelectList onClick={() => setAction('select')}>
            <Icon>
              {imageUrl && (
                <Image src={imageUrl} width={100} height={100} alt='Coin' />
              )}
            </Icon>
            <CoinName>{selectedToken.name}</CoinName>
          </CoinSelectList>
        </Row>
      </TransferForm>
      <Row>
        <Continue onClick={transferCrypto}>Continue</Continue>
      </Row>
      <Row>
        <BalanceTitle>{selectedToken.symbol} Balance</BalanceTitle>
        <Balance>
          {balance} {selectedToken.symbol}
        </Balance>
      </Row>
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
  align-items: flex-end;

  & > span {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #3773f5;
  }
`

const Input = styled.input`
  border: none;
  background: none;
  outline: none;
  color: #fff;
  font-size: 3.5rem;
  text-align: right;
  max-width: 45%;
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
const TransferForm = styled.div`
  border: 1px solid #282b2f;
  border-radius: 0.4rem;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #8a919e;
  padding: 1rem 0;
  font-size: 1.2rem;
`
const FieldName = styled.div`
  flex: 0.5;
  padding-left: 2rem;
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
const Receipient = styled.input`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  color: #fff;
  font-size: 1.2rem;
  margin-right: 0.5rem;
`
const CoinSelectList = styled.div`
  display: flex;
  flex: 1.3;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`
const CoinName = styled.div`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  color: #fff;
  font-size: 1.2rem;
  margin-right: 0.5rem;
`
const Continue = styled.button`
  color: #fff;
  background-color: #3773f5;
  width: 100%;
  padding: 1rem;
  text-align: center;
  border-radius: 0.4rem;
  font-size: 1.2rem;

  &:hover {
    cursor: pointer;
    background-color: #4a80f6;
  }
`
const BalanceTitle = styled.div``

const Balance = styled.div``
