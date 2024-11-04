// Ethereum Methods Database
// Sources:
// - Ethereum Yellow Paper & EIPs: https://eips.ethereum.org/
// - Uniswap Docs: https://docs.uniswap.org/
// - MakerDAO Docs: https://docs.makerdao.com/
// - Aave Docs: https://docs.aave.com/
// - Compound Docs: https://compound.finance/docs
// - WETH Documentation: https://weth.io/
// - Lido Docs: https://docs.lido.fi/
// - StakeWise Docs: https://docs.stakewise.io/
// - OpenZeppelin Contracts: https://docs.openzeppelin.com/contracts/
// - Curve Finance Docs: https://curve.readthedocs.io/
// - Chainlink Docs: https://docs.chain.link/

// Basic Transfer Methods
const TRANSFER_TYPES = {
  NATIVE_TRANSFER: {
    signature: null,
    description: 'Direct transfer of native chain token (ETH, BNB, etc.)',
    flowType: 'BOTHFLOW'
  },
  ERC20_TRANSFER: {
    signature: '0xa9059cbb',
    description: 'Standard ERC20 token transfer',
    flowType: 'BOTHFLOW'
  },
  ERC20_TRANSFER_FROM: {
    signature: '0x23b872dd',
    description: 'ERC20 transfer on behalf of another address (requires approval)',
    flowType: 'BOTHFLOW'
  }
};

// Token Creation and Management Methods
const TOKEN_CREATION_METHODS = {
  CREATE_ERC20: {
    signature: '0x60806040',
    description: 'Deploy new ERC20 token contract',
    flowType: 'OUTFLOW'
  },
  CREATE_ERC721: {
    signature: '0x60806040',
    description: 'Deploy new ERC721 (NFT) contract',
    flowType: 'OUTFLOW'
  },
  CREATE_ERC1155: {
    signature: '0x60806040',
    description: 'Deploy new ERC1155 (Multi-token) contract',
    flowType: 'OUTFLOW'
  },
  MINT_TOKEN: {
    signature: '0x40c10f19',
    description: 'Mint new tokens (if contract allows)',
    flowType: 'OUTFLOW'
  },
  BURN_TOKEN: {
    signature: '0x42966c68',
    description: 'Burn/destroy existing tokens',
    flowType: 'INFLOW'
  },
  PAUSE_TOKEN: {
    signature: '0x8456cb59',
    description: 'Pause token transfers (if supported)',
    flowType: 'OUTFLOW'
  },
  UNPAUSE_TOKEN: {
    signature: '0x3f4ba83a',
    description: 'Unpause token transfers',
    flowType: 'OUTFLOW'
  }
};

// Wrapped Token Methods
const WRAPPED_TOKEN_METHODS = {
  DEPOSIT: {
    signature: '0xd0e30db0',
    description: 'Deposit native token (e.g., ETH) to receive wrapped version (e.g., WETH)',
    flowType: 'OUTFLOW'
  },
  DEPOSIT_TO: {
    signature: '0xb760faf9',
    description: 'Deposit native token and send wrapped tokens to a specific address',
    flowType: 'OUTFLOW'
  },
  WITHDRAW: {
    signature: '0x2e1a7d4d',
    description: 'Withdraw native token by burning wrapped token',
    flowType: 'INFLOW'
  },
  WITHDRAW_TO: {
    signature: '0x205c2878',
    description: 'Withdraw native token to a specific address',
    flowType: 'INFLOW'
  }
};

// Uniswap V2 Methods
const UNISWAP_V2_METHODS = {
  SWAP_EXACT_TOKENS_FOR_TOKENS: {
    signature: '0x38ed1739',
    description: 'Swap exact amount of input tokens for output tokens',
    flowType: 'BOTHFLOW'
  },
  SWAP_TOKENS_FOR_EXACT_TOKENS: {
    signature: '0x8803dbee',
    description: 'Swap tokens for exact amount of output tokens',
    flowType: 'BOTHFLOW'
  },
  SWAP_EXACT_ETH_FOR_TOKENS: {
    signature: '0x7ff36ab5',
    description: 'Swap exact amount of ETH for tokens',
    flowType: 'BOTHFLOW'
  },
  SWAP_TOKENS_FOR_EXACT_ETH: {
    signature: '0x4a25d94a',
    description: 'Swap tokens for exact amount of ETH',
    flowType: 'BOTHFLOW'
  },
  ADD_LIQUIDITY: {
    signature: '0xe8e33700',
    description: 'Add liquidity to token-token pair',
    flowType: 'OUTFLOW'
  },
  ADD_LIQUIDITY_ETH: {
    signature: '0xf305d719',
    description: 'Add liquidity to ETH-token pair',
    flowType: 'OUTFLOW'
  },
  REMOVE_LIQUIDITY: {
    signature: '0xbaa2abde',
    description: 'Remove liquidity from token-token pair',
    flowType: 'INFLOW'
  },
  REMOVE_LIQUIDITY_ETH: {
    signature: '0x02751cec',
    description: 'Remove liquidity from ETH-token pair',
    flowType: 'INFLOW'
  }
};

// Uniswap V3 Methods
const UNISWAP_V3_METHODS = {
  MINT: {
    signature: '0x88316456',
    description: 'Create new position and mint NFT position token',
    flowType: 'OUTFLOW'
  },
  INCREASE_LIQUIDITY: {
    signature: '0x219f5d17',
    description: 'Add liquidity to existing position',
    flowType: 'OUTFLOW'
  },
  DECREASE_LIQUIDITY: {
    signature: '0x0c49ccbe',
    description: 'Remove liquidity from existing position',
    flowType: 'INFLOW'
  },
  COLLECT_FEES: {
    signature: '0x4f1eb3d8',
    description: 'Collect accumulated fees',
    flowType: 'INFLOW'
  },
  SWAP_EXACT_INPUT: {
    signature: '0xc04b8d59',
    description: 'Swap exact amount of input tokens',
    flowType: 'BOTHFLOW'
  },
  SWAP_EXACT_OUTPUT: {
    signature: '0x09b81346',
    description: 'Swap for exact amount of output tokens',
    flowType: 'BOTHFLOW'
  }
};

// Uniswap V4 Methods
const UNISWAP_V4_METHODS = {
  LOCK_LIQUIDITY: {
    signature: '0x6b5c432c',
    description: 'Lock liquidity in a concentrated position',
    flowType: 'OUTFLOW'
  },
  UNLOCK_LIQUIDITY: {
    signature: '0x2f4f5723',
    description: 'Unlock previously locked liquidity',
    flowType: 'INFLOW'
  },
  SWAP_WITH_HOOKS: {
    signature: '0x7c025200',
    description: 'Swap tokens with custom hooks',
    flowType: 'BOTHFLOW'
  },
  FLASH: {
    signature: '0x490e6cbc',
    description: 'Execute flash swap with hooks',
    flowType: 'BOTHFLOW'
  }
};

// NFT Methods (ERC721)
const ERC721_METHODS = {
  TRANSFER: {
    signature: '0x23b872dd',
    description: 'Transfer NFT from one address to another',
    flowType: 'BOTHFLOW'
  },
  SAFE_TRANSFER: {
    signature: '0x42842e0e',
    description: 'Safely transfer NFT with additional checks',
    flowType: 'BOTHFLOW'
  },
  MINT: {
    signature: '0x40c10f19',
    description: 'Mint new NFT',
    flowType: 'OUTFLOW'
  },
  BURN: {
    signature: '0x42966c68',
    description: 'Burn/destroy NFT',
    flowType: 'INFLOW'
  }
};

// Multi-Token Methods (ERC1155)
const ERC1155_METHODS = {
  TRANSFER_SINGLE: {
    signature: '0xf242432a',
    description: 'Transfer single token type',
    flowType: 'BOTHFLOW'
  },
  TRANSFER_BATCH: {
    signature: '0x2eb2c2d6',
    description: 'Transfer multiple token types',
    flowType: 'BOTHFLOW'
  },
  MINT: {
    signature: '0x731133e9',
    description: 'Mint new tokens',
    flowType: 'OUTFLOW'
  },
  BURN: {
    signature: '0xf5298aca',
    description: 'Burn tokens',
    flowType: 'INFLOW'
  }
};

// Approval Methods
const APPROVAL_METHODS = {
  ERC20_APPROVE: {
    signature: '0x095ea7b3',
    description: 'Approve spender for ERC20 tokens',
    flowType: 'OUTFLOW'
  },
  ERC721_APPROVE: {
    signature: '0x095ea7b3',
    description: 'Approve operator for single NFT',
    flowType: 'OUTFLOW'
  },
  ERC721_APPROVE_ALL: {
    signature: '0xa22cb465',
    description: 'Approve operator for all NFTs',
    flowType: 'OUTFLOW'
  },
  ERC1155_APPROVE_ALL: {
    signature: '0xa22cb465',
    description: 'Approve operator for all token types',
    flowType: 'OUTFLOW'
  }
};

// Governance Methods
const GOVERNANCE_METHODS = {
  PROPOSE: {
    signature: '0x7d5e81e2',
    description: 'Create new governance proposal',
    flowType: 'OUTFLOW'
  },
  CAST_VOTE: {
    signature: '0x56781388',
    description: 'Vote on governance proposal',
    flowType: 'OUTFLOW'
  },
  EXECUTE: {
    signature: '0xfe0d94c1',
    description: 'Execute approved governance proposal',
    flowType: 'OUTFLOW'
  },
  CANCEL: {
    signature: '0x40e58ee5',
    description: 'Cancel governance proposal',
    flowType: 'OUTFLOW'
  },
  DELEGATE: {
    signature: '0x5c19a95c',
    description: 'Delegate voting power',
    flowType: 'OUTFLOW'
  }
};

// Bridge Methods
const BRIDGE_METHODS = {
  BRIDGE_TOKENS: {
    signature: '0x8b9e4f93',
    description: 'Bridge tokens to another chain',
    flowType: 'OUTFLOW'
  },
  CLAIM_BRIDGED_TOKENS: {
    signature: '0x2e1a7d4d',
    description: 'Claim tokens bridged from another chain',
    flowType: 'INFLOW'
  },
  REVERSE_BRIDGE: {
    signature: '0x9dc29fac',
    description: 'Return tokens to original chain',
    flowType: 'BOTHFLOW'
  }
};

// MakerDAO Methods
const MAKER_METHODS = {
  CREATE_VAULT: {
    signature: '0x610b5925',
    description: 'Create new CDP/Vault',
    flowType: 'OUTFLOW'
  },
  DEPOSIT_COLLATERAL: {
    signature: '0x6e2bdb95',
    description: 'Add collateral to vault',
    flowType: 'OUTFLOW'
  },
  WITHDRAW_COLLATERAL: {
    signature: '0x9f678cca',
    description: 'Remove collateral from vault',
    flowType: 'INFLOW'
  },
  GENERATE_DAI: {
    signature: '0x7f8661a1',
    description: 'Borrow DAI against collateral',
    flowType: 'INFLOW'
  },
  PAYBACK_DAI: {
    signature: '0x3b4da69f',
    description: 'Repay borrowed DAI',
    flowType: 'OUTFLOW'
  }
};

// Staking Methods
const STAKING_METHODS = {
  // Basic Staking
  STAKE: {
    signature: '0xa694fc3a',
    description: 'Stake tokens in protocol',
    flowType: 'OUTFLOW'
  },
  UNSTAKE: {
    signature: '0x2e1a7d4d',
    description: 'Withdraw staked tokens',
    flowType: 'INFLOW'
  },
  CLAIM_REWARDS: {
    signature: '0x2e7ba6ef',
    description: 'Claim accumulated staking rewards',
    flowType: 'INFLOW'
  },
  EXIT: {
    signature: '0xe9fad8ee',
    description: 'Withdraw all tokens and claim rewards',
    flowType: 'INFLOW'
  },
  
  // Liquid Staking
  SUBMIT: {
    signature: '0x4f498c73',
    description: 'Submit ETH for liquid staking derivatives',
    flowType: 'OUTFLOW'
  },
  REQUEST_WITHDRAWALS: {
    signature: '0x19aa6257',
    description: 'Request withdrawal of staked tokens',
    flowType: 'OUTFLOW'
  },
  CLAIM_WITHDRAWAL: {
    signature: '0x0962ef79',
    description: 'Claim completed withdrawal',
    flowType: 'INFLOW'
  }
};

// Flash Loan Methods
const FLASH_LOAN_METHODS = {
  FLASH_LOAN: {
    signature: '0x5cffe9de',
    description: 'Execute flash loan',
    flowType: 'BOTHFLOW'
  },
  FLASH_LOAN_MULTIPLE: {
    signature: '0x94da7864',
    description: 'Execute flash loan with multiple assets',
    flowType: 'BOTHFLOW'
  }
};

// Curve Finance Methods
const CURVE_METHODS = {
  EXCHANGE: {
    signature: '0x3df02124',
    description: 'Swap tokens in Curve pool',
    flowType: 'BOTHFLOW'
  },
  ADD_LIQUIDITY: {
    signature: '0x0b4c7e4d',
    description: 'Add liquidity to Curve pool',
    flowType: 'OUTFLOW'
  },
  REMOVE_LIQUIDITY: {
    signature: '0x5b36389c',
    description: 'Remove liquidity from Curve pool',
    flowType: 'INFLOW'
  },
  CLAIM_FEES: {
    signature: '0xd294f093',
    description: 'Claim accumulated trading fees',
    flowType: 'INFLOW'
  }
};

// Compound Methods
const COMPOUND_METHODS = {
  SUPPLY: {
    signature: '0x1249c58b',
    description: 'Supply assets to Compound',
    flowType: 'OUTFLOW'
  },
  WITHDRAW: {
    signature: '0x852a12e3',
    description: 'Withdraw supplied assets',
    flowType: 'INFLOW'
  },
  BORROW: {
    signature: '0xc5ebeaec',
    description: 'Borrow assets from Compound',
    flowType: 'INFLOW'
  },
  REPAY_BORROW: {
    signature: '0x0e752702',
    description: 'Repay borrowed assets',
    flowType: 'OUTFLOW'
  }
};

// Function to print method information
function printMethodInfo(categoryName, methods) {
  console.log(`\n${categoryName}:`);
  console.log('-'.repeat(categoryName.length + 1));
  
  for (const [methodName, methodInfo] of Object.entries(methods)) {
    console.log(`\n${methodName}:`);
    console.log(`  Signature: ${methodInfo.signature || 'N/A'}`);
    console.log(`  Description: ${methodInfo.description}`);
    console.log(`  Flow Type: ${methodInfo.flowType}`);
  }
}

// Print all method categories
console.log('ETHEREUM METHOD SIGNATURES AND DESCRIPTIONS\n');
console.log('==========================================');

printMethodInfo('TRANSFER TYPES', TRANSFER_TYPES);
printMethodInfo('TOKEN CREATION METHODS', TOKEN_CREATION_METHODS);
printMethodInfo('WRAPPED TOKEN METHODS', WRAPPED_TOKEN_METHODS);
printMethodInfo('UNISWAP V2 METHODS', UNISWAP_V2_METHODS);
printMethodInfo('UNISWAP V3 METHODS', UNISWAP_V3_METHODS);
printMethodInfo('UNISWAP V4 METHODS', UNISWAP_V4_METHODS);
printMethodInfo('ERC721 METHODS', ERC721_METHODS);
printMethodInfo('ERC1155 METHODS', ERC1155_METHODS);
printMethodInfo('APPROVAL METHODS', APPROVAL_METHODS);
printMethodInfo('GOVERNANCE METHODS', GOVERNANCE_METHODS);
printMethodInfo('BRIDGE METHODS', BRIDGE_METHODS);
printMethodInfo('MAKER METHODS', MAKER_METHODS);
printMethodInfo('STAKING METHODS', STAKING_METHODS);
printMethodInfo('FLASH LOAN METHODS', FLASH_LOAN_METHODS);
printMethodInfo('CURVE METHODS', CURVE_METHODS);
printMethodInfo('COMPOUND METHODS', COMPOUND_METHODS);