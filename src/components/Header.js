import React, { useState } from 'react';
// Import methods from FCL
import { unauthenticate, logIn, account, query, config } from "@onflow/fcl";

// Specify the API endpoint - this time we will use Testnet
const api = "https://rest-testnet.onflow.org";

// This is the endpoint, which will be responsible for wallet authorization
const handshake = "https://flow-wallet-testnet.blocto.app/authn";

// Configure FCL to use mainnet as the access node
config()
  // connect to Flow testnet
  .put("accessNode.api", api)
  .put("challenge.handshake", handshake);



const Header = () => {
    const [walletConnected, setWalletConnected] = useState(false);
    const [userAddress, setUserAddress] = useState('');
    const [userBalance, setUserBalance] = useState('');

    const connectWallet = async () => {
        console.clear();
      
        // just in case we have authenticated user, we will log him out first
        await unauthenticate();
      
        // calling "logIn" will invoke "Sign in with Blocto - Testnet" popup
        const wallet = await logIn();
      
        console.log({ wallet });
        const result = await account(wallet.addr);
        console.log({result})
        const flowBalance = result.balance / Math.pow(10, 8);
        console.log({ flowBalance });
        setWalletConnected(true);
        setUserAddress(wallet.addr);
        setUserBalance(flowBalance);

    
    
    }


    return (
        <header style={styles.header}>
        <h1 style={styles.logo}>FlowBallot</h1>
        <nav style={styles.nav}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/proposals" style={styles.navLink}>Proposals</a>
          <a href="/about" style={styles.navLink}>About</a>
        </nav>
        {walletConnected ? (
          <div style={styles.walletInfo}>
            <p style={styles.userAddress}>{userAddress}</p>
            <p style={styles.userBalance}>{userBalance}</p>
          </div>
        ) : (
          <button onClick={connectWallet} style={styles.connectWalletButton}>Connect Wallet</button>
        )}
      </header>
    )
}

const styles = {
    header: {
        backgroundColor: '#00ffab',
        padding: '20px',
      },
      logo: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#ffffff',
        margin: '0',
      },
      nav: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '10px',
      },
      navLink: {
        color: '#ffffff',
        margin: '0 10px',
        textDecoration: 'none',
        fontSize: '20px',
        fontWeight: 'bold',
      },
      main: {
        flex: '1',
        padding: '40px',
        textAlign: 'center',
      },
      heading: {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '20px',
      },
      paragraph: {
        fontSize: '30px',
        marginBottom: '10px',
      },
      button: {
        padding: '10px 20px',
        fontSize: '18px',
        backgroundColor: '#00ffab',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      },
      connectWalletButton: {
        padding: '10px 20px',
        fontSize: '18px',
        backgroundColor: '#8FDAC2',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      },
      walletInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      userAddress: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#ffffff',
        margin: '0',
      },
      userBalance: {
        fontSize: '14px',
        color: '#ffffff',
        margin: '0',
      },
}

export default Header;