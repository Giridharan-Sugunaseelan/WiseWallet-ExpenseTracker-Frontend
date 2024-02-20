import { useSelector } from "react-redux";

const useCurrentTransaction = () => {
  const currentTransaction = useSelector(
    (state) => state.currentTransaction.transaction
  );

  return currentTransaction;
};

export default useCurrentTransaction;
