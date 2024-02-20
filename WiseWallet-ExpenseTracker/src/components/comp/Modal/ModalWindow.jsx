import { useState } from "react";
import { addTransaction } from "../../../service/transactionservice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
function ModalWindow() {
  const dispatcher = useDispatch();
  const [type, setType] = useState("expense");
  const categories =
    type === "expense"
      ? ["Food & Drinks", "Shopping", "Health", "Travel", "Savings"]
      : ["Salary", "Business Income", "Other"];
  const [category, setCategory] = useState(
    type === "expense" ? "Food & Drinks" : "Salary"
  );
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState({ description: "", amount: "" });

  function validate() {
    let isValid = true;
    if (description.trim() === "") {
      setError((e) => ({ ...e, description: "Description cannot be empty" }));
      isValid = false;
    }
    if (amount === "" || amount === 0) {
      setError((e) => ({ ...e, amount: "Enter Amount" }));
      isValid = false;
    }
    return isValid;
  }

  const handleButtonClick = () => {
    if (validate()) {
      const transaction = { amount, category, type, description };
      dispatcher(addTransaction(transaction));
    }
  };
  useEffect(() => {
    setCategory(type === "expense" ? "Food & Drinks" : "Salary");
  }, [type]);
  return (
    <>
      <div
        className="modal fade"
        id="reg-modal"
        tabIndex={-1}
        aria-labelledby="modal-title"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modal-title">
                Add Transaction
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
                  className={`form-control ${
                    error.description ? "is-invalid" : ""
                  }`}
                  onChange={(event) => setDescription(event.target.value)}
                  value={description}
                />
                <div className="invalid-feedback">{error.description}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="amount">Amount:</label>
                <div className="input-group">
                  <span className="input-group-text">{"₹"}</span>
                  <input
                    type="number"
                    id="amount"
                    className={`form-control ${
                      error.amount ? "is-invalid" : ""
                    }`}
                    placeholder="Enter Amount"
                    onChange={(e) => setAmount(Number(e.target.value))}
                    value={amount}
                  />
                  <div className="invalid-feedback">{error.amount}</div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
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

export default ModalWindow;
