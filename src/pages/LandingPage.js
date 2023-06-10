import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="landing-page" style={styles.container}>
      <Header />
      <main style={styles.main}>
        <h1 style={styles.heading}>Welcome to the Majority Voting App</h1>
        <p style={styles.paragraph}>FlowBallot is a decentralized majority voting application built on the Flow blockchain. It provides a transparent and secure platform for organizations and communities to conduct fair and democratic voting processes. With FlowBallot, members can actively participate in decision-making by casting their votes on various proposals.</p>
        <p style={styles.paragraph}>Start voting on proposals and see the results!</p>
        <button style={styles.button}>Get Started</button>
      </main>
      <Footer />
    </div>
  );
};

// CSS styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#00ffab',
  },
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
};

export default LandingPage;
