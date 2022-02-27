import React from 'react'
import styled from 'styled-components'
export const Promos = () => {
  return (
    <Wrapper>
      <OfferCard>
        <Title>Yield earned</Title>
        <Description>Earn up to 2.8% APY on your crypto</Description>
        <Placeholder />
        <AdditionalInfo style={{ fontSize: '1.5rem' }}>
          $0.0000066 <span>2.84% APY</span>
        </AdditionalInfo>
      </OfferCard>
      <OfferCard>
        <Title>Learn and Earn</Title>
        <Description>Earn up to 2.8% APY on your crypto</Description>
        <Placeholder />
        <AdditionalInfo style={{ color: '#3773f5' }}>
          Verify Identity
        </AdditionalInfo>
      </OfferCard>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 2rem;
  padding-right: 1rem;
`
const OfferCard = styled.div`
  width: 21rem;
  height: 11rem;
  border: 1px solid #282b2f;
  margin-bottom: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 0.1rem;
`
const Description = styled.div`
  font-size: 1.1rem;
`
const Placeholder = styled.div`
  flex: 1;
`

const AdditionalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 700;

  & > span {
    color: #8a919e;
    font-size: 1rem;
  }
`
