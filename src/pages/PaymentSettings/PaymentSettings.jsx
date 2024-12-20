import { useDispatch, useSelector } from "react-redux";
import "./PaymentSettings.css";
import { useEffect, useState } from "react";
import { getTransactions } from "../../RTK/Slices/TransactionSlice";

const PaymentSettings = () => {
  const dispatch = useDispatch();
  let data = useSelector((state) => state.transaction);
  useEffect(() => {
    dispatch(getTransactions());
  }, []);
  data = data?.object;
  console.log(data);

  return (
    <div className="profile-container">
      <h2 className="profile-header">Payment Transactions</h2>
      <div className="transaction-list">
        {data && data.length > 0 ? (
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Instructor</th>
                <th>Student</th>
                <th>Amount</th>
                <th>Executed At</th>
              </tr>
            </thead>
            <tbody>
              {data.map((transaction, index) => (
                <tr key={index} className="transaction-row">
                  <td>
                    {transaction.instructor?.instructorname.split(" ")[0] ||
                      "N/A"}
                  </td>
                  <td>
                    {transaction.student?.studentname.split(" ")[0] || "N/A"}
                  </td>
                  <td>E£{transaction.price}</td>
                  <td>{new Date(transaction.executedat).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions available.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentSettings;
