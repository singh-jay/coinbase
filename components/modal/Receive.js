import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '../../lib/sanity'
import { FaCheck } from 'react-icons/fa'
import { BiCopy } from 'react-icons/bi'
import Image from 'next/image'
export const Receive = ({ setAction, selectedToken, walletAddress }) => {
  const [imageUrl, setImageUrl] = useState(null)
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (selectedToken.logo) {
      const url = imageUrlBuilder(client).image(selectedToken.logo).url()
      if (url) {
        setImageUrl(url)
      }
    }
  }, [selectedToken])
  return (
    <Wrapper>
      <Content>
        <QRContainer>
          <Image
            src={`https://api.qrserver.com/v1/create-qr-code?size=250x250&data=${walletAddress}`}
            width={250}
            height={250}
            alt='QR Code'
          />
        </QRContainer>
        <Divider />
        <Row>
          <CoinSelectList>
            <Icon>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  width={100}
                  height={100}
                  alt={selectedToken.name}
                />
              )}
            </Icon>
            <CoinName>{selectedToken.name}</CoinName>
          </CoinSelectList>
        </Row>
        <Divider />
        <Row>
          <div>
            <Title>{selectedToken.symbol} Address</Title>
            <Address>{walletAddress}</Address>
          </div>
          <CopyButton
            onClick={() => {
              navigator.clipboard.writeText(walletAddress)
              setCopied(true)
            }}
          >
            {copied ? <FaCheck style={{ color: '#27ad75' }} /> : <BiCopy />}
          </CopyButton>
        </Row>
      </Content>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #282b2f;
  border-radius: 0.5rem;
`
const QRContainer = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`
const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  color: #8a919e;
  font-size: 1.2rem;
`

const Icon = styled.div`
  display: grid;
  place-items: center;
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  & > img {
    height: 120%;
    width: 120%;
    object-fit: cover;
  }
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

const Title = styled.div`
  color: #fff;
  margin-bottom: 0.5rem;
`

const Address = styled.div`
  font-size: 0.8rem;
`

const CopyButton = styled.div`
  cursor: pointer;
`
