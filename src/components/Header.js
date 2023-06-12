import React, { useState, useEffect } from 'react';
// Import methods from FCL
import { unauthenticate, logIn, account, currentUser, query } from "@onflow/fcl";
import config  from './config';


const Header = () => {
    const [walletConnected, setWalletConnected] = useState(false);
    const [userAddress, setUserAddress] = useState('');
    const [userBalance, setUserBalance] = useState('');
    const [user, setUser] = useState({loggedIn: null})

    useEffect(() => currentUser.subscribe(setUser), [])

    // const AuthedState = () => {
    //     return (
    //     <div>
    //         <div>Address: {user?.addr ?? "No Address"}</div>
    //         <button onClick={fcl.unauthenticate}>Log Out</button>
    //     </div>
    //     )
    // }

    // const UnauthenticatedState = () => {
    //     return (
    //     <div>
    //         <button onClick={fcl.logIn}>Log In</button>
    //         <button onClick={fcl.signUp}>Sign Up</button>
    //     </div>
    //     )
    // }

    const connectWallet = async () => {
      
        // calling "logIn" will invoke "Sign in with Blocto - Testnet" popup
        const wallet = await logIn();
      
        console.log({ wallet });
        const result = await account(wallet.addr);
        console.log({result})
        const flowBalance = result.balance / Math.pow(10, 8);
        console.log({ flowBalance });
        setWalletConnected(true);
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
        {user.loggedIn ? (
          <div style={styles.walletInfo}>
            <p style={styles.userAddress}>Address: {user?.addr ?? "No Address"}{userAddress}</p>
            <p style={styles.userBalance}>Bal: {user.balance}</p>
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
        alignItems: 'left',
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
        fontWeight: 'bold',
      },
}

export default Header;