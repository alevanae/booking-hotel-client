import styles from "../styles";

export default function FormToSubcribe() {
  return (
    <div className="my-12 mx-auto text-center text-white relative bg-blue-700 p-4">
      <h2 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        Save time, save money!
      </h2>
      <p style={{ fontSize: "1rem", marginBottom: "0.7rem" }}>
        Sign up and we'll send the best deals to you
      </p>
      <form action="submit">
        <input
          type="email"
          placeholder="Your email"
          className="w-[40%] text-[1rem] mr-2 border-r-[10px] p-2 border-none focus:outline-none"
        />
        <button className={styles.altButton}>Subcribe</button>
      </form>
    </div>
  );
}
