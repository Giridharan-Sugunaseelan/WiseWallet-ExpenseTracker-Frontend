import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTransation,
  fetchTransactions,
} from "../../redux/features/transaction/transactionSlice";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import UpdateModal from "../comp/Modal/UpdateModal";
import { setCurrentTransaction } from "../../redux/features/transaction/currentTransactionSlice";
import styles from "./TransactionComponent.module.css";

function TransactionComponent() {
  const dispatcher = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    dispatcher(fetchTransactions());
  }, []);

  function removeTransaction(id) {
    dispatcher(deleteTransation(id));
  }

  // function handleTransaction(transaction) {
  //   dispatcher(setCurrentTransaction(transaction));
  // // }

  return (
    <>
      <Header />
      <div
        className={`container text-center mt-5 ${styles.transactionContainer}`}
      >
        <div className="row">
          <div className="col-md-10">
            <div className={`table-responsive ${styles.transactionContainer}`}>
              <table className="table table-bordered">
                <thead>
                  <tr className="table-dark">
                    <th>S.No</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    {/* <th>Edit</th> */}
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.map((transaction, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{transaction.date}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.category}</td>
                        {/* <td>
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#update-modal"
                            onClick={() => {
                              setIsModalOpen((prev) => !prev);
                              console.log("setting transaction: ", transaction);
                              handleTransaction(transaction);
                            }}
                          >
                            <i className="fa-regular fa-pen-to-square"></i>
                          </button>
                        </td> */}
                        <td>
                          <button
                            className={styles.deleteButton}
                            onClick={() => removeTransaction(transaction.id)}
                          >
                            <img
                              width="20"
                              height="20"
                              src="https://img.icons8.com/ios-filled/20/FFFFFF/delete-forever.png"
                              alt="delete-forever"
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={`${styles.addButton}`}>
          <button
            className={`btn btn-primary ${styles.add}`}
            data-bs-toggle="modal"
            data-bs-target="#reg-modal"
          >
            <p>+</p>
          </button>
        </div>
      </div>
      {/* {isModalOpen && <UpdateModal />} */}
      <Footer />
    </>
  );
}

export default TransactionComponent;
