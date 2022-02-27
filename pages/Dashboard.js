import React, { useEffect, useState, useMemo } from 'react'
import { Header } from '../components/Header'
import styled from 'styled-components'
import { Main } from '../components/Main'
import { Sidebar } from '../components/Sidebar'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { ethers } from 'ethers'
// const sdk = new ThirdwebSDK(
//   new ethers.Wallet(
//     // Your wallet private key
//     process.env.NET_PUBLIC_METAMASK_KEY,
//     // RPC URL
//     ethers.getDefaultProvider(
//       'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
//     )
//   )
// )
export const Dashboard = ({ address }) => {
  const [sanityTokens, setsanityTokens] = useState([])
  const [thirdWebTokens, setThirdWebTokens] = useState([])
  const { provider } = useWeb3()
  const [balance, setBalance] = useState(0)

  const sdk = useMemo(() => {
    if (provider) {
      return new ThirdwebSDK(provider.getSigner())
    }

    return undefined
  }, [provider])
  useEffect(() => {
    let getData = async () => {
      try {
        const response = await fetch(
          `https://27z8j83y.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D'coins'%5D%7B%0A%20%20name%2C%0A%20%20symbol%2C%0A%20%20contractAddress%2C%0A%20%20usdPrice%2C%0A%20%20logo%0A%7D`
        )
        const data = await response.json()
        if (data.result.length > 0) {
          setsanityTokens(data.result)
          if (sdk) {
            setThirdWebTokens(
              data.result.map((token) =>
                sdk.getTokenModule(token.contractAddress)
              )
            )
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
    return getData()
  }, [])

  return (
    <Wrapper>
      <Sidebar />
      <MainContainer>
        <Header
          walletAddress={address}
          sanityTokens={sanityTokens}
          thirdWebTokens={thirdWebTokens}
        />
        <Main
          walletAddress={address}
          sanityTokens={sanityTokens}
          thirdWebTokens={thirdWebTokens}
        />
      </MainContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #0a0b0d;
  color: #fff;
  display: flex;
  overflow: hidden;
`
const MainContainer = styled.div`
  flex: 1;
`
