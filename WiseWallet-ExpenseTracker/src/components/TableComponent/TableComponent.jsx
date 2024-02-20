import { useState, useEffect } from "react";
import styles from "./TableComponent.module.css";
function TableComponent(props) {
  const transactions = props?.list;
  const [latestTransactions, setLatestTransactions] = useState([]);
  useEffect(() => {
    if (transactions) {
      // Create a new array with the sorted transactions in descending order based on date
      const sortedTransactions = [...transactions].sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      // Select the latest five transactions
      const latestFiveTransactions = sortedTransactions.slice(0, 5);
      setLatestTransactions(latestFiveTransactions);
    }
  }, [transactions]);
  return (
    <>
      <div className={`container table-container`}>
        <h2 className={styles.header}>Recent Transactions</h2>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">S.No</th>
              <th className="text-center">Date</th>
              <th className="text-center">Description</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Category</th>
            </tr>
          </thead>
          <tbody>
            {latestTransactions?.map((transaction, index) => {
              return (
                <tr key={index + 1} className="text-center">
                  <td>{index + 1}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableComponent;
