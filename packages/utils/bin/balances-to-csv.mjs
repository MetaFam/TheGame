import { createPublicClient, http, formatUnits } from 'viem'
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  avalanche,
  bsc
} from 'viem/chains'
import { erc20Abi } from 'viem'
import fs from 'fs'
import path from 'path'

// Chain configurations
const CHAINS = {
  1: mainnet,
  137: polygon,
  10: optimism,
  42161: arbitrum,
  8453: base,
  43114: avalanche,
  56: bsc
}

// Common tokens across chains (example addresses - verify before use)
const CHAIN_TOKENS = {
  // Mainnet
  1: [
    '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
    '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'  // USDC
  ],
  // Polygon
  137: [
    '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', // USDT
    '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', // DAI
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'  // USDC
  ],
  // Add other chains as needed
}

function getClient(chainId) {
  const chain = CHAINS[chainId]
  if (!chain) {
    throw new Error(`Unsupported chain ID: ${chainId}`)
  }

  const rpcUrl = process.env[`RPC_URL_${chainId}`] || process.env.RPC_URL
  if (!rpcUrl) {
    throw new Error(`No RPC URL provided for chain ${chainId}. Set RPC_URL_${chainId} or RPC_URL environment variable.`)
  }

  return createPublicClient({
    chain,
    transport: http(rpcUrl)
  })
}

async function getTokenBalances(walletAddress, chainId) {
  const client = getClient(chainId)
  const chain = CHAINS[chainId]
  const tokens = CHAIN_TOKENS[chainId] || []

  try {
    // Get native token balance
    const nativeBalance = await client.getBalance({ address: walletAddress })
    const formattedNativeBalance = formatUnits(nativeBalance, chain.nativeCurrency.decimals)

    console.log(`Fetching token balances on ${chain.name}...`)

    // Get token data and balances
    const tokenData = await Promise.all(
      tokens.map(async (tokenAddress) => {
        try {
          const [balance, symbol, decimals] = await Promise.all([
            client.readContract({
              address: tokenAddress,
              abi: erc20Abi,
              functionName: 'balanceOf',
              args: [walletAddress]
            }),
            client.readContract({
              address: tokenAddress,
              abi: erc20Abi,
              functionName: 'symbol'
            }),
            client.readContract({
              address: tokenAddress,
              abi: erc20Abi,
              functionName: 'decimals'
            })
          ])

          return {
            symbol,
            address: tokenAddress,
            balance: formatUnits(balance, decimals)
          }
        } catch (error) {
          console.warn(`Warning: Failed to fetch data for token ${tokenAddress}:`, error.message)
          return null
        }
      })
    )

    return {
      chainId,
      chainName: chain.name,
      nativeCurrency: chain.nativeCurrency.symbol,
      nativeBalance: formattedNativeBalance,
      tokens: tokenData.filter(Boolean)
    }
  } catch (error) {
    console.error(`Error fetching balances on ${chain.name}:`, error)
    throw error
  }
}

async function exportBalanceCSV(walletAddress, chainId) {
  try {
    console.log(`\nFetching balances for ${walletAddress} on chain ID ${chainId}...`)
    const balances = await getTokenBalances(walletAddress, chainId)

    // Prepare CSV rows
    const rows = [
      ['Chain', 'Token', 'Address', 'Balance'],
      [
        balances.chainName,
        balances.nativeCurrency,
        'Native',
        balances.nativeBalance
      ],
      ...balances.tokens.map(token => [
        balances.chainName,
        token.symbol,
        token.address,
        token.balance
      ])
    ]

    // Convert to CSV string
    const csvContent = rows
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')

    // Create output directory if it doesn't exist
    const outputDir = path.join(process.cwd(), 'output')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir)
    }

    // Save file
    const fileName = `token_balances_${balances.chainName}_${walletAddress}_${new Date().toISOString().split('T')[0]}.csv`
    const filePath = path.join(outputDir, fileName)

    fs.writeFileSync(filePath, csvContent)
    console.log(`CSV exported successfully to: ${filePath}`)

    // Log the balances to console
    console.log('\nToken Balances:')
    console.log(`${balances.nativeCurrency}:`, balances.nativeBalance)
    balances.tokens.forEach(token => {
      console.log(`${token.symbol}: ${token.balance}`)
    })

  } catch (error) {
    console.error('Error exporting CSV:', error)
    throw error
  }
}

// Check if required arguments are provided
const walletAddress = process.argv[2]
const chainId = parseInt(process.argv[3])

if (!walletAddress || !chainId) {
  console.error('Please provide both wallet address and chain ID as arguments')
  console.log('Usage: node script.js <wallet-address> <chain-id>')
  console.log('\nSupported Chain IDs:')
  Object.entries(CHAINS).forEach(([id, chain]) => {
    console.log(`${id}: ${chain.name}`)
  })
  process.exit(1)
}

if (!CHAINS[chainId]) {
  console.error(`Unsupported chain ID: ${chainId}`)
  console.log('\nSupported Chain IDs:')
  Object.entries(CHAINS).forEach(([id, chain]) => {
    console.log(`${id}: ${chain.name}`)
  })
  process.exit(1)
}

// Run the script
exportBalanceCSV(walletAddress, chainId)
  .catch(error => {
    console.error('Script failed:', error)
    process.exit(1)
  })