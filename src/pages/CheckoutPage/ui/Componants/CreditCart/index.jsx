import styles from "./index.module.css";

export default function CreditCard() {
  return (
    <div>
      <div className= {styles.visa_card}>
        <div className={styles.logoContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="23"
            height="23"
            viewBox="0 0 48 48"
            className= {styles.svgLogo}
          >
            <path
              fill="#ff9800"
              d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
            ></path>
            <path
              fill="#d50000"
              d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
            ></path>
            <path
              fill="#ff3d00"
              d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
            ></path>
          </svg>
        </div>
        <div className={styles.number_container}>
          <label className={styles.input_label} htmlFor="cardNumber">
            CARD NUMBER
          </label>
          <input
            className= {styles.inputstyle}
            id= {styles.cardNumber}
            placeholder="XXXX XXXX XXXX XXXX"
            name="cardNumber"
            type="text"
          />
        </div>

        <div className= {styles.name_date_cvv_container}>
          <div className={styles.name_wrapper}>
            <label className={styles.input_label} htmlFor="holderName">
              CARD HOLDER
            </label>
            <input
              className={styles.inputstyle}
              id="holderName"
              placeholder="NAME"
              type="text"
            />
          </div>

          <div className={styles.expiry_wrapper}>
            <label className={styles.input_label} htmlFor="expiry">
              VALID THRU
            </label>
            <input
              className={styles.inputstyle}
              id= {styles.expiry}
              placeholder="MM/YY"
              type="text"
            />
          </div>
          <div className= {styles.cvv_wrapper}>
            <label className= {styles.input_label} htmlFor="cvv">
              CVV
            </label>
            <input
              className={styles.inputstyle}
              placeholder="***"
              maxLength="3"
              id= {styles.cvv}
              type="password"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
