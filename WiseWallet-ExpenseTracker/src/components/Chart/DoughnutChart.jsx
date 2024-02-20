import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.font.size = 13;

function DoughnutChart(props) {
  const transactionState = props.chartData;
  console.log(transactionState);
  console.log(typeof transactionState);
  const transactions = transactionState?.transactionState;
  console.log(transactions);
  console.log(typeof transactions);

  const costByCategory = (category) => {
    const filteredTransactions = transactions?.filter(
      (transaction) => transaction?.category === category
    );
    return filteredTransactions?.reduce((sum, transaction) => {
      return sum + transaction.amount;
    }, 0);
  };

  const AMOUNT_BY_CATEGORY = {
    "Food & Drinks": transactions && costByCategory("Food & Drinks"),
    Shopping: transactions && costByCategory("Shopping"),
    Travel: transactions && costByCategory("Travel"),
    Health: transactions && costByCategory("Health"),
    Savings: transactions && costByCategory("Savings"),
  };

  const data = {
    labels: Object.keys(AMOUNT_BY_CATEGORY),
    datasets: [
      {
        data: Object.values(AMOUNT_BY_CATEGORY),
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    font: {
      size: 25,
    },
    layout: {
      padding: {
        right: 20,
      },
    },
    aspectRatio: 0.85,
  };

  console.log(data);
  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default DoughnutChart;
