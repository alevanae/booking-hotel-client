import utilities from "../utilities";

function TransactionRow({ transaction, index }) {
  const start = new Date(transaction.dateStart);
  const end = new Date(transaction.dateEnd);
  return (
    <tr className={`${index % 2 === 0 ? "bg-red-100" : ""}`}>
      <td className="py-2 px-1 border">{index + 1}</td>
      <td className="py-2 px-1 border">{transaction.hotelId.name}</td>
      <td className="py-2 px-1 border">{transaction.roomNumbers.join(", ")}</td>
      <td className="py-2 px-1 border">
        {utilities.formattedDate(start)} - {utilities.formattedDate(end)}
      </td>
      <td className="py-2 px-1 border">{transaction.totalPrice}</td>
      <td className="py-2 px-1 border">{transaction.payment}</td>
      <td className="py-2 px-1 border">
        <span
          className={`${transaction.status === "booked" ? "bg-red-400" : ""} ${
            transaction.status === "checking" ? "bg-green-400" : ""
          } ${
            transaction.status === "checkout" ? "bg-gray-400" : ""
          } text-green-700 capitalize p-1 rounded-[5px]`}>
          {transaction.status}
        </span>
      </td>
    </tr>
  );
}

export default TransactionRow;
