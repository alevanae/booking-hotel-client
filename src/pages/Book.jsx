import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../contextAPI";
import styles from "../styles";
import { DateRange } from "react-date-range";
import Layout from "../comps/Layout";
import utilities from "../utilities";
import domain from "../domain";
// searchInfo.dateEnd
function Book() {
  const { hotelId } = useParams();
  const { isLogin, searchInfo, user, userId } = useContext(userContext);
  const [hotel, setHotel] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [roomBill, setRoomBill] = useState(0);
  const [date, setDate] = useState([
    {
      startDate: searchInfo.dateStart,
      endDate: searchInfo.dateEnd,
      key: "selection",
    },
  ]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [unavailableRoom, setUnavailableRoom] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const navigate = useNavigate();

  const diffDate = date[0].endDate
    ? Math.ceil(date[0].endDate - date[0].startDate) / (1000 * 60 * 60 * 24) + 1
    : 1;
  const totalBill = diffDate * roomBill;

  // fetch Hotel
  useEffect(() => {
    async function getHotel() {
      try {
        const res = await fetch(`${domain}/hotel/client/${hotelId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setHotel(data.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    getHotel();
  }, [hotelId]);
  // fetch unavailable room
  useEffect(() => {
    async function fetchUnavailableRoom() {
      try {
        const dateInfo = {
          dateStart: date[0].startDate,
          dateEnd: date[0].endDate,
          hotelId,
        };
        const res = await fetch(`${domain}/transaction/unavailable-room`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dateInfo),
        });
        if (!res.ok) throw new Error("cant not fetch unavailable room");
        const data = await res.json();
        setUnavailableRoom(data.data);
      } catch (err) {
        alert(err.message);
      }
    }
    fetchUnavailableRoom();
  }, [date, hotelId]);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const transaction = {
        userId,
        totalPrice: totalBill,
        dateStart: date[0].startDate,
        dateEnd: date[0].endDate,
        roomNumbers: selectedRooms,
        payment: paymentMethod,
        roomTypes,
      };
      console.log(transaction);
      const res = await fetch(`${domain}/transaction/client/${hotelId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });
      if (!res.ok) throw new Error("cant not book room now");
      alert("Thank you for booking our hotel");
      navigate("/transaction");
    } catch (err) {
      alert(err.message);
    }
  }
  function handleCheckbox(e, price, roomType) {
    const room = e.target.value;
    if (e.target.checked) {
      setSelectedRooms([...selectedRooms, room]);
      setRoomTypes((prev) => [...prev, roomType]);
      setRoomBill((prev) => prev + price);
    } else {
      setSelectedRooms(selectedRooms.filter((item) => item !== room));
      setRoomTypes((prev) => utilities.removeOneDuplicate(prev, roomType));
      setRoomBill((prev) => prev - price);
    }
  }

  return (
    <Layout>
      {isLogin && hotel && (
        <form className="p-4 max-w-[1000px] mx-auto" onSubmit={handleSubmit}>
          {/* {Header} */}
          <div className="flex justify-between">
            <div className="w-2/3 p-2 bg-gray-50">
              <h2 className="font-bold text-[24px] mb-4">{hotel.name}</h2>
              <p>{hotel.desc}</p>
            </div>
            <div className="w-1/4 p-2 bg-blue-50 flex flex-col justify-around ">
              <p className="mb-4 text-[24px]">
                <strong>${hotel.cheapestPrice}</strong>(1 nights)
              </p>
              <button
                className={`${styles.altButton} rounded-[5px]`}
                type="button">
                Reserve or Book Now!
              </button>
            </div>
          </div>
          <div className="flex w-full justify-between">
            {/* {Pick date} */}
            <div className="w-1/2 mb-20">
              <h2 className="capitalize text-[24px] pb-4 font-bold">Dates</h2>
              <DateRange
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                minDate={new Date()}
                onChange={(item) => setDate([item.selection])}
                ranges={date}
              />
            </div>
            {/* {User info} */}
            <div className="w-1/2">
              <h2 className="capitalize text-[24px] pb-4 font-bold">
                reserve info
              </h2>
              <div>
                <div className="flex flex-col mb-4 gap-2">
                  <label>Your Full Name:</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Full Name"
                    defaultValue={user.fullName}
                  />
                </div>
                <div className="flex flex-col mb-4 gap-2">
                  <label>Your Email:</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Email"
                    defaultValue={user.email}
                  />
                </div>
                <div className="flex flex-col mb-4 gap-2">
                  <label>Your Phone Number:</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Phone Number"
                    defaultValue={user.phoneNumber}
                  />
                </div>
                <div className="flex flex-col mb-4 gap-2">
                  <label>Your Identity Card Number:</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Card Number"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* {Select rooms} */}
          <div>
            <h2 className="capitalize font-bold text-[24px]">Select Rooms</h2>
            <div className="flex flex-wrap">
              {hotel.roomType.map((room) => (
                <div
                  key={hotel._id + room._id}
                  className="flex justify-between w-1/2 py-4">
                  <div className="w-2/3">
                    <h2 className="font-semibold">{room.title}</h2>
                    <div>
                      <p>{room.desc}</p>
                      <p>
                        Max people: <strong>{room.maxPeople}</strong>
                      </p>
                      <strong>${room.price}</strong>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-center items-center w-1/3">
                    {room.roomNumbers.map((roomNumber) => (
                      <div key={roomNumber} className="flex flex-col">
                        <label>{roomNumber}</label>
                        <input
                          type="checkbox"
                          value={roomNumber}
                          onChange={(e) => {
                            handleCheckbox(e, room.price, room._id);
                          }}
                          disabled={unavailableRoom.find(
                            (item) => item === roomNumber
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <h2 className="font-bold text-[24px] capitalize">
            total bill: ${totalBill}
          </h2>
          {/* {choose payment method} */}
          <div>
            <select
              className="px-2 py-1 focus:outline-none bg-gray-300"
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}>
              <option value="" disabled>
                Select your payment method
              </option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
            </select>
            <button
              className={`${styles.altButton} rounded-[5px] ml-8`}
              type="submit">
              reserve now
            </button>
          </div>
        </form>
      )}
      {!isLogin && (
        <div className="max-w-[500px] mx-auto flex flex-col max-h-[500px] justify-center items-center pt-[200px]">
          <p className="text-[32px] font-bold">You must login first</p>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className={styles.altButton}>
            Login
          </button>
        </div>
      )}
    </Layout>
  );
}

export default Book;
