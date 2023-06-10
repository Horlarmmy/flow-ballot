import React from "react";

const Footer = () => {
    return (
        <footer style={styles.footer}>
        <p style={styles.footerText}>© 2023 FlowBallot. All rights reserved.</p>
      </footer>
    )
}

const styles = {
    footer: {
        backgroundColor: '#00ffab',
        padding: '10px',
        marginTop: 'auto',
      },
      footerText: {
        color: '#ffffff',
        fontSize: '20px',
        textAlign: 'center',
        margin: '0',
      },
}

export default Footer;