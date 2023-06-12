import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { query, currentUser } from "@onflow/fcl";
import config  from '../components/config';

const ProposalList = () => {
  const [proposals, setProposals] = useState([]);
  const [creatingProposal, setCreatingProposal] = useState(false);
  const [proposalName, setProposalName] = useState('');
  const [proposalOptions, setProposalOptions] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [user, setUser] = useState({loggedIn: null})
  useEffect(() => currentUser.subscribe(setUser), [])
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const proposal = await query({
          cadence: `
          import MajorityVoting from 0xVoting

          pub fun main(): [MajorityVoting.Proposal] {
            return MajorityVoting.getProposals()
          }
          `
        })
        setProposals(proposal);
        console.log("Got proposal")
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
    };

    fetchProposals();
  }, []);

  const connectWallet = async () => {
    // Connect wallet logic here
    // For example, using FCL's wallet connection code
    await Header.connectWallet()

    // Dummy logic for demonstration purposes
    setWalletConnected(true);
  };

  const createProposal = () => {
    // Create proposal logic here
    // You can implement your own logic to create the proposal and update the state accordingly

    // Dummy logic for demonstration purposes
    const newProposal = {
      id: proposals.length + 1,
      name: proposalName,
      options: proposalOptions.split(',').map((option) => option.trim()),
    };

    setProposals([...proposals, newProposal]);
    setCreatingProposal(false);
    setProposalName('');
    setProposalOptions('');
  };

  const openProposalDetails = (proposal) => {
    setSelectedProposal(proposal);
  };

  const closePopup = () => {
    setSelectedProposal(null);
  };

  return (
    <div>
      <Header walletConnected={walletConnected} connectWallet={connectWallet} />
      <div className="proposal-list" style={styles.container}>
        <h2 style={styles.heading}>Proposal List</h2>
        {user.loggedIn ? (
          creatingProposal ? (
            <div style={styles.createProposalCard}>
              <h3 style={styles.proposalName}>Create a Proposal</h3>
              <form onSubmit={createProposal} style={styles.form}>
                <input
                  type="text"
                  placeholder="Proposal Name"
                  value={proposalName}
                  onChange={(e) => setProposalName(e.target.value)}
                  required
                  style={styles.input}
                />
                <textarea
                  placeholder="Options (comma-separated)"
                  value={proposalOptions}
                  onChange={(e) => setProposalOptions(e.target.value)}
                  required
                  style={styles.input}
                ></textarea>
                <button type="submit" style={styles.createButton}>
                  Create
                </button>
              </form>
            </div>
          ) : (
            <div style={styles.createProposalCard}>
              <button onClick={() => setCreatingProposal(true)} style={styles.createButton}>
                Create Proposal
              </button>
            </div>
          )
        ) : (
          <div style={styles.connectWalletCard}>
            <p style={styles.connectWalletText}>Please connect your wallet to create a proposal.</p>
            <button onClick={connectWallet} style={styles.connectWalletButton}>
              Connect Wallet
            </button>
          </div>
        )}

        <div className="proposals" style={styles.proposalGrid}>
          {proposals.map((proposal) => (
            <div
              className="proposal-card"
              key={proposal.id}
              style={styles.proposalCard}
              onClick={() => openProposalDetails(proposal)}
            >
              <h3 style={styles.proposalName}>{proposal.name}</h3>
              <ul style={styles.optionsList}>
                {proposal.options.map((option, index) => (
                  <li key={index} style={styles.optionItem}>
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {selectedProposal && (
        <div className="popup" style={styles.popup}>
          <div className="popup-content" style={styles.popupContent}>
            <h3 style={styles.proposalName}>{selectedProposal.name}</h3>
            <ul style={styles.optionsList}>
              {selectedProposal.options.map((option, index) => (
                <li key={index} style={styles.optionItem}>
                  {option}
                </li>
              ))}
            </ul>
            <button onClick={closePopup} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};


const styles = {
  container: {
    padding: '20px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  createProposalCard: {
    backgroundColor: '#ffffff',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '4px',
  },
  createButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#00ffab',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  connectWalletCard: {
    backgroundColor: '#ffffff',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '4px',
    textAlign: 'center',
  },
  connectWalletText: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  connectWalletButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#00ffab',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  proposalGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gridGap: '20px',
  },
  proposalCard: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // add box shadow
  },
  proposalName: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  optionsList: {
    margin: '0',
    padding: '0',
    listStyle: 'none',
  },
  optionItem: {
    fontSize: '16px',
    marginBottom: '5px',
  },
  popup: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '999',
  },
  popupContent: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '4px',
    textAlign: 'center',
  },
  closeButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#ff0000',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
  },
};

export default ProposalList;
