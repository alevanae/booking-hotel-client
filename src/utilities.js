function formattedDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng trong JavaScript bắt đầu từ 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
function getRateText(rating) {
  if (rating === 5) return "Exceptional";
  if (rating >= 4) return "Excellent";
  if (rating >= 3) return "Good";
  if (rating >= 2) return "Fair";
  return "Basic";
}
function removeOneDuplicate(arr, elementToRemove) {
  let found = false;
  return arr.filter((element) => {
    if (element === elementToRemove && !found) {
      found = true;
      return false;
    }
    return true;
  });
}
const utilities = { formattedDate, getRateText, removeOneDuplicate };
export default utilities;
