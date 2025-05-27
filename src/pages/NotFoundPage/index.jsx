import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css"; 

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1>Oops! Page Not Found</h1>
      <p>The page you are looking for might have been moved or deleted.</p>
      <Link to="/" className={styles.link}>Go Back to Home</Link>
    </div>
  );
};

export default NotFoundPage;