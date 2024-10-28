import { useContext, useEffect, useState } from "react";
import TransactionRow from "../comps/TransactionRow";
import userContext from "../contextAPI";
import Layout from "../comps/Layout";
import domain from "../domain";

function Transaction() {
  const { userId, isLogin } = useContext(userContext);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    async function getTransactions() {
      try {
        const res = await fetch(`${domain}/transaction/client/${userId}`);
        if (!res.ok) throw new Error("cant fetch transactions");
        const data = await res.json();
        setTransactions(data.data);
      } catch (err) {
        alert(err.message);
      }
    }
    if (isLogin) getTransactions();
  }, [userId, isLogin]);
  return (
    <Layout>
      {!isLogin && (
        <h2 className="text-[32px] text-center my-20">Please login first</h2>
      )}
      {/* {Transaction table} */}
      {isLogin && (
        <div className="max-w-[900px] mx-auto my-12">
          <h2 className="capitalize font-bold text-[24px]">
            your transactions({transactions.length})
          </h2>
          {transactions.length > 0 && (
            <table className="w-full">
              <thead>
                <tr className="border border-white text-white bg-cyan-500">
                  <th className="border border-white px-2 py-2">STT</th>
                  <th className="border border-white px-1 py-2">Hotel</th>
                  <th className="border border-white px-1 py-2">Rooms</th>
                  <th className="border border-white px-1 py-2">Date</th>
                  <th className="border border-white px-1 py-2">Total Price</th>
                  <th className="border border-white px-1 py-2">Payment</th>
                  <th className="border border-white px-1 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => {
                  return (
                    <TransactionRow
                      transaction={transaction}
                      index={index}
                      key={transaction._id}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </Layout>
  );
}

export default Transaction;
