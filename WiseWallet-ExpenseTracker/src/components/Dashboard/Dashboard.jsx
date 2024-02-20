import Header from "../Home/Header";
import Footer from "../Home/Footer";
import styles from "./Dashboard.module.css";
import Card from "../comp/Cards/Card.jsx";
import TableComponent from "../TableComponent/TableComponent.jsx";
import ModalWindow from "../comp/Modal/ModalWindow.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../redux/features/user/userSlice.js";
import { fetchTransactions } from "../../redux/features/transaction/transactionSlice.js";
import DoughnutChart from "../Chart/DoughnutChart.jsx";

function Dashboard() {
  const dispatcher = useDispatch();
  const userState = useSelector((state) => state.user);
  const transactionState = useSelector(
    (state) => state.transactions?.transactions
  );

  useEffect(() => {
    dispatcher(fetchUser());
    dispatcher(fetchTransactions());
  }, []);

  const costByCategory = (category) => {
    const filteredTransactions = transactionState?.filter(
      (transaction) => transaction?.category === category
    );
    return filteredTransactions?.reduce((sum, transaction) => {
      return sum + transaction.amount;
    }, 0);
  };

  const AMOUNT_BY_CATEGORY = {
    "Food & Drinks": transactionState && costByCategory("Food & Drinks"),
    Shopping: transactionState && costByCategory("Shopping"),
    Travel: transactionState && costByCategory("Travel"),
    Health: transactionState && costByCategory("Health"),
    Savings: transactionState && costByCategory("Savings"),
  };

  return (
    <>
      <Header />
      <div className={styles.gridContainer}>
        <Card
          title="Balance"
          amount={userState?.user?.balance}
          icon="fa-money-bill-wave"
        />
        <Card
          title={"Food&Drinks"}
          amount={AMOUNT_BY_CATEGORY["Food & Drinks"]}
          icon="fa-utensils"
        />
        <Card
          title={"Shopping"}
          amount={AMOUNT_BY_CATEGORY["Shopping"]}
          icon="fa-cart-shopping"
        />
        <div className={styles.piechart}>
          {transactionState && (
            <DoughnutChart chartData={{ transactionState }} />
          )}
        </div>
        <Card
          title={"Health"}
          amount={AMOUNT_BY_CATEGORY["Health"]}
          icon="fa-capsules"
        />
        <Card
          title={"Travel"}
          amount={AMOUNT_BY_CATEGORY["Travel"]}
          icon="fa-plane"
        />
        <Card
          title={"Savings"}
          amount={AMOUNT_BY_CATEGORY["Savings"]}
          icon="fa-building-columns"
        />
        <div className={styles.recentTransactions}>
          <TableComponent list={transactionState} />
        </div>
        <ModalWindow />
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
