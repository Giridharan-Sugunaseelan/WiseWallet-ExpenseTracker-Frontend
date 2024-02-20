import styles from "./Card.module.css";

function Card(props) {
  let category = categories(props.title);

  function categories(cat) {
    switch (cat) {
      case "Balance":
        return styles.balance;

      case "Food&Drinks":
        return styles.food;

      case "Shopping":
        return styles.shopping;

      case "Health":
        return styles.health;

      case "Travel":
        return styles.travel;

      case "Savings":
        return styles.savings;

      default:
        break;
    }
  }

  return (
    <>
      <div
        className={`${category} ${styles.card} card`}
        data-bs-toggle="modal"
        data-bs-target="#reg-modal"
      >
        <div className={styles.textAndData}>
          <p>{props.title}</p>
          <div className={styles.data}>
            <p>₹ {props.amount}</p>
          </div>
        </div>
        <div className={styles.icon}>
          <i className={`fa-solid ${props.icon}`}></i>
        </div>
      </div>
    </>
  );
}

export default Card;
