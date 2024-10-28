import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import styles from "../styles";
import userContext from "../contextAPI";

function Header() {
  const navigate = useNavigate();
  const { isLogin, setSearchInfo } = useContext(userContext);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [city, setCity] = useState("");
  const [isOpenDateRange, setIsOpenDateRange] = useState(false);
  const [isOpenQuantityInput, setIsOpenQuantityInput] = useState(false);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState(1);
  function handleSearchBtn(e) {
    e.preventDefault();
    setSearchInfo({
      city,
      dateStart: date[0].startDate,
      dateEnd: date[0].endDate,
      peopleQuantity: adult + Math.floor(children / 2),
      roomQuantity: room,
    });
    navigate("/search");
  }
  const quantityInput = (
    <div className="absolute bottom-0 bg-white translate-y-[100%] z-30 p-2 border">
      <div className="flex justify-between p-1">
        <label htmlFor="">Adult</label>
        <input
          type="number"
          min={1}
          value={adult}
          onChange={(e) => setAdult(Number(e.target.value))}
          className="focus:outline-none w-1/3 border border-black p-1"
        />
      </div>
      <div className="flex justify-between p-1">
        <label htmlFor="">Children</label>
        <input
          type="number"
          min={0}
          value={children}
          onChange={(e) => setChildren(Number(e.target.value))}
          className="focus:outline-none w-1/3 border border-black p-1"
        />
      </div>
      <div className="flex justify-between p-1">
        <label htmlFor="">Room</label>
        <input
          type="number"
          min={1}
          value={room}
          onChange={(e) => setRoom(Number(e.target.value))}
          className="focus:outline-none w-1/3 border border-black p-1"
        />
      </div>
    </div>
  );

  return (
    <header className="pt-12 pl-4 pb-20 text-white relative z-10 bg-blue-700 w-full">
      <div className="pb-6">
        <h1 className="pb-6">A lifetime of discounts? It's Genius.</h1>
        <p className="pb-4">
          Get rewarded for your travels - unlock instant savings of 10% or more
          with a free account
        </p>
        {!isLogin && (
          <button
            type="button"
            className={styles.button}
            onClick={() => navigate("/register")}>
            Sign in / Register
          </button>
        )}
      </div>
      <form className="flex items-center justify-between py-4 px-8 w-full">
        <div className="flex items-center w-full gap-8 border-[2px] border-[#fab005] border-solid rounded-[5px] bg-white px-2 py-4 text-gray-600 justify-around">
          <div className="flex gap-2 items-center w-1/3">
            <label htmlFor="stay">
              <i className="fa fa-bed"></i>
            </label>
            <input
              type="text"
              id="stay"
              className="focus:outline-none"
              placeholder="Where are you going?"
              onChange={(e) => {
                setCity(e.target.value);
              }}
              value={city}
            />
          </div>
          <div className="relative flex gap-2 items-center w-1/3">
            <label htmlFor="date">
              <i className="fa fa-calendar"></i>
            </label>
            <input
              type="text"
              id="date"
              className="focus:outline-none"
              placeholder="06/22/2023 to 06/24/2023"
              onClick={() => {
                setIsOpenDateRange((prev) => !prev);
              }}
            />
            {isOpenDateRange && (
              <DateRange
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                className={`absolute bottom-0 translate-y-[100%] z-30`}
                minDate={new Date()}
                onChange={(item) => setDate([item.selection])}
                ranges={date}
              />
            )}
          </div>
          <div className="flex gap-2 items-center w-1/3 relative">
            <label htmlFor="quantity">
              <i className="fa fa-female"></i>
            </label>
            <input
              type="text"
              id="quantity"
              className="focus:outline-none"
              onClick={() => {
                setIsOpenQuantityInput((prev) => !prev);
              }}
              value={`${adult} adult - ${children} children - ${room} room`}
              readOnly
            />
            {isOpenQuantityInput && quantityInput}
          </div>
          <button
            type="button"
            onClick={handleSearchBtn}
            className={styles.altButton}>
            Search
          </button>
        </div>
      </form>
    </header>
  );
}
export default Header;
