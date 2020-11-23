import React from "react";

function Footer() {
  const today = new Date().getFullYear();
  return (
    <footer className="footer fixed-bottom mt-auto py-3">
      <div className="footer-container">
        <span className="text-muted">
          {today.toString()}&nbsp;&copy;&nbsp;
          <a
            href="/"
            rel="noopener noreferrer"
            className="kt-link"
            style={{ color: "#6c757d" }}
          >
            Sharity
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
