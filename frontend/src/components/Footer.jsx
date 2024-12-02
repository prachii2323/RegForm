import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2024 Prachi. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#333",
    textAlign: "center",
    padding: "10px 20px",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
  },
  text: {
    margin: 0,
    fontSize: "14px",
    color: "#fff", 
  },
};

export default Footer;
