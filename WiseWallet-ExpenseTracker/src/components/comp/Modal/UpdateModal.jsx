import { useState } from "react";
import { addTransaction } from "../../../service/transactionservice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useCurrentTransaction from "../../TransactionComponent/useCurrentTransaction";
function UpdateModal() {
  // const transactionState = useSelector((state) => state.currentTransaction.transaction);
  const transaction = useCurrentTransaction();
  const [currentTransaction, setCurrentTransaction] = useState(transaction);
  const isModalOpen = useSelector(
    (state) => state.currentTransaction.isUpdateModalOpen
  );
  const dispatcher = useDispatch();
  const [type, setType] = useState(currentTransaction.type);
  const categories =
    type === "expense"
      ? ["Food & Drinks", "Shopping", "Health", "Travel", "Savings"]
      : ["Salary", "Business Income", "Other"];
  const [category, setCategory] = useState(currentTransaction.category);
  const [description, setDescription] = useState(
    currentTransaction.description
  );
  const [amount, setAmount] = useState(currentTransaction.amount);
  const handleButtonClick = () => {
    const transaction = { amount, category, type, description };
    dispatcher(addTransaction(transaction));
  };
  useEffect(() => {
    setCategory(type === "expense" ? "Food & Drinks" : "Salary");
  }, [type]);
  useEffect(() => {
    // how to get current transaction here again when isModalOpen changes
    if (isModalOpen) {
      console.log("Current Transaction:" + currentTransaction);
    }
  }, [transaction, isModalOpen]);

  useEffect(() => {
    setCurrentTransaction(transaction);
    console.log("Present Current Transaction: " + transaction);
  }, [transaction]);

  return (
    <>
      <div
        className="modal fade"
        id="update-modal"
        tabIndex={-1}
        aria-labelledby="modal-title"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modal-title">
                Edit Transaction
                {/* {transaction.category} */}
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="type">Type:</label>
                <select
                  id="type"
                  className="form-select"
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  className="form-select"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  className="form-control"
                  onChange={(event) => setDescription(event.target.value)}
                  value={description}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="amount">Amount:</label>
                <div className="input-group">
                  <span className="input-group-text">{"₹"}</span>
                  <input
                    type="number"
                    id="amount"
                    className="form-control"
                    placeholder="Enter Amount"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleButtonClick}
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateModal;
