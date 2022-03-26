import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import { TransferModal } from './TransferModal'
Modal.setAppElement('#__next')
export const Header = ({ walletAddress, sanityTokens, thirdWebTokens }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const modalStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#0a0b0d',
      padding: 0,
      border: 'none',
    },
    overlay: {
      backgroundColor: 'rgba(10, 11, 13, 0.75)',
    },
  }
  return (
    <Wrapper>
      <Title>Assets</Title>
      <ButtonContainer>
        <WalletLink>
          <WalletLinkTitle>Wallet Connected</WalletLinkTitle>
          <WalletAddress>
            {walletAddress.slice(0, 7)}...{walletAddress.slice(35)}
          </WalletAddress>
        </WalletLink>
        <Button style={{ backgroundColor: '#3773f5', color: '#000' }}>
          Buy / Sell
        </Button>
        <Button onClick={() => setModalOpen(true)}>Send / Receive</Button>
      </ButtonContainer>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={modalStyle}
      >
        <TransferModal
          walletAddress={walletAddress}
          sanityTokens={sanityTokens}
          thirdWebTokens={thirdWebTokens}
        />
      </Modal>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: calc(100% - 3rem);
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #282b2f;
  display: flex;
  align-items: center;
`
const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  flex: 1;
`
const ButtonContainer = styled.div`
  display: flex;
`

const Button = styled.div`
  border: 1px solid #282b2f;
  border-radius: 0.4rem;
  margin-right: 1rem;
  padding: 0.8rem;
  font-size: 1.3rem;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
`
const WalletLink = styled.div`
  border: 1px solid #282b2f;
  border-radius: 50rem;
  padding: 0 1rem;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const WalletLinkTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #27ad75;
`
const WalletAddress = styled.div`
  font-size: 0.8rem;
`
