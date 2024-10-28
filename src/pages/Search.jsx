import { useContext, useEffect, useState } from "react";
import userContext from "../contextAPI";
import styles from "../styles";
import utilities from "../utilities";
import { useNavigate } from "react-router-dom";
import Layout from "../comps/Layout";
import domain from "../domain";

function Search() {
  const [hotels, setHotels] = useState([]);
  const { searchInfo } = useContext(userContext);
  useEffect(() => {
    async function searchHotels() {
      try {
        const res = await fetch(`${domain}/hotel/client/search`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(searchInfo),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setHotels(data.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    searchHotels();
  }, [searchInfo]);
  return (
    <Layout>
      <div className="flex mt-12 mb-12 gap-4">
        <SearchPopup hotels={hotels} />
        <SearchList hotels={hotels} />
      </div>
    </Layout>
  );
}
function SearchPopup({ hotels }) {
  const { searchInfo, setSearchInfo } = useContext(userContext);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [destination, setDestination] = useState(1000);
  const [adult, setAdult] = useState(searchInfo.peopleQuantity);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState(searchInfo.roomQuantity);
  function handleFilter() {
    setSearchInfo((prev) => {
      return {
        ...prev,
        minPrice,
        maxPrice,
        distance: destination,
        peopleQuantity: Math.floor(adult + children / 2),
      };
    });
  }

  return (
    <div className="bg-yellow-500 w-1/3 flex flex-col p-4 self-start rounded-[20px]">
      <h2 className="text-[24px] font-bold">Search</h2>
      <div>
        <label htmlFor="">Destination</label>
        <br />
        <input
          type="number"
          className="w-4/5 my-2 mx-auto p-2"
          onChange={(e) => setDestination(Number(e.target.value))}
          value={destination}
        />
      </div>
      <div>
        <h4 className="font-semibold text-[20px]">Options</h4>
        <div className="flex justify-between m-2 items-center">
          <label>Min price per night</label>
          <input
            type="number"
            className="w-[60px] p-1 ml-1"
            onChange={(e) => setMinPrice(Number(e.target.value))}
            value={minPrice}
          />
        </div>
        <div className="flex justify-between m-2 items-center">
          <label>Max price per night</label>
          <input
            type="number"
            className="w-[60px] p-1 ml-1"
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            value={maxPrice}
          />
        </div>
        <div className="flex justify-between m-2 items-center">
          <label>Adult</label>
          <input
            type="number"
            placeholder="1"
            className="w-[60px] p-1 ml-1"
            onChange={(e) => setAdult(Number(e.target.value))}
            value={adult}
          />
        </div>
        <div className="flex justify-between m-2 items-center">
          <label>Children</label>
          <input
            type="number"
            placeholder="0"
            className="w-[60px] p-1 ml-1"
            onChange={(e) => setChildren(Number(e.target.value))}
            value={children}
          />
        </div>
        <div className="flex justify-between m-2 items-center">
          <label>Room</label>
          <input
            type="number"
            placeholder="1"
            className="w-[60px] p-1 ml-1"
            onChange={(e) => setRoom(Number(e.target.value))}
            value={room}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={handleFilter}
            className={`${styles.altButton}`}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
function SearchList({ hotels }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-around w-2/3">
      {hotels.map((item, i) => (
        <div
          className="flex p-2 border border-gray-400 border-solid rounded-[10px] mb-4 gap-4"
          key={`search-result-${i}`}>
          <img
            src={item.photos[0]}
            alt=""
            className="w-1/4 h-[200px]"
            onClick={() => navigate(`/detail/${item._id}`)}
          />
          <div className="w-1/2">
            <h3 className="text-[20px] text-blue-700">{item.name}</h3>
            <p className="mb-2 text-sm">{`${item.distance}m from center`}</p>
            <div className="p-2 bg-green-600 text-white inline-block rounded-[10px] mb-2">
              {item.roomType[0].title}
            </div>
            <br />
            <h4>{item.description}</h4>
            <p className="text-sm mt-2 mb-2">{item.roomType[0].desc}.</p>
            {item.featured ? (
              <div className="text-green-600 text-sm">
                <strong>Featured</strong>
                <p>
                  You can get something special, so lock in this great price
                  today!
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="w-1/4 flex flex-col justify-between">
            <div className="flex justify-between items-center font-semibold text-[20px]">
              <h3>{`${utilities.getRateText(Number(item.rating))}`}</h3>
              <span className="p-1 text-white bg-blue-700 rounded-[5px]">
                {item.rating.toFixed(1)}
              </span>
            </div>
            <div className="text-right">
              <h2 className="text-[24px] font-semibold">{`$${item.cheapestPrice}`}</h2>
              <p className="text-sm text-gray-500">Includes taxes and fees</p>
              <button
                className={`${styles.altButton} w-full rounded-[5px]`}
                onClick={() => {
                  navigate(`/book/${item._id}`);
                }}>
                See availability
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Search;
