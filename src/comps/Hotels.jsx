import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import domain from "../domain";

export default function Hotels() {
  const [top3Hotels, setTop3Hotels] = useState([]);
  useEffect(() => {
    async function getTop3Hotels() {
      try {
        const res = await fetch(`${domain}/hotel/client/top-rate`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setTop3Hotels(data.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    getTop3Hotels();
  }, []);

  return (
    <div className="hotels-container">
      <h2 style={{ marginBottom: "1.5rem" }}>
        <strong>Homes guests love</strong>
      </h2>
      <div className="flex justify-between mb-12 gap-8">
        {top3Hotels.map((hotel, i) => (
          <div className="w-1/3" key={hotel._id}>
            <img
              src={Object.values(hotel.photos[0]).join("")}
              alt={`${hotel.name} in ${hotel.city}`}
              className="w-full h-[250px]"
            />
            <Link className="uppercase" to={`/detail/${hotel._id}`}>
              {hotel.name}
            </Link>
            <p style={{ margin: "0.5rem 0" }}>{hotel.city}</p>
            <h4 className="font-bold">{`Start from $${hotel.cheapestPrice}`}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
