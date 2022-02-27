import { useWeb3 } from '@3rdweb/hooks'
import styled from 'styled-components'
import { Dashboard } from './Dashboard'

export default function Home() {
  const { address, connectWallet } = useWeb3()
  return (
    <Wrapper>
      {address ? (
        <Dashboard address={address} />
      ) : (
        <WalletConnect>
          <Button onClick={() => connectWallet('injected')}>
            Connect Wallet
          </Button>
          <Details>
            You need Chrome to be <br /> able to run this app.
          </Details>
        </WalletConnect>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  max-width: 100vw;
  background-color: #0a0b0d;
  color: #fff;
  display: grid;
  place-items: center;
`

const WalletConnect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Button = styled.div`
  background-color: #3773f5;
  color: #000;
  border: 1px solid #282b2f;
  border-radius: 0.4rem;
  padding: 0.8rem;
  font-size: 1.3rem;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
`

const Details = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 1rem;
  text-align: center;
  color: #282b2f;
`
