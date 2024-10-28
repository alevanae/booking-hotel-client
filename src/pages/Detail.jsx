import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles";
import { FaLocationDot } from "react-icons/fa6";
import Layout from "../comps/Layout";
import domain from "../domain";

function Detail() {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const navigate = useNavigate();
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
  return (
    <Layout>
      {hotel ? (
        <div className="p-4">
          <h1 className="text-[28px] font-bold">{hotel.name}</h1>
          <p className="flex items-center gap-2">
            <FaLocationDot />
            {hotel.address}
          </p>
          <p className="text-[20px] text-blue-700">
            Excellent location - {hotel.distance}m from center
          </p>
          <p className="text-[20px] text-green-700">
            Book a stay over ${hotel.cheapestPrice} at this property and get a
            free airport taxi
          </p>
          <div className="flex flex-wrap mb-10">
            {hotel.photos.map((photo, index) => (
              <div key={hotelId + index} className="w-1/3 p-1">
                <img
                  src={photo}
                  alt=""
                  className="w-full object-cover h-full grow-0"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <div className="w-2/3 p-2 bg-gray-50">
              <h2 className="font-bold text-[24px] mb-4">{hotel.name}</h2>
              <p>{hotel.desc}</p>
            </div>
            <div className="w-1/4 p-2 bg-blue-50">
              <p className="mb-4 text-[24px]">
                <strong>${hotel.cheapestPrice}</strong>(1 nights)
              </p>
              <button
                className={`${styles.altButton} rounded-[5px]`}
                type="button"
                onClick={() => {
                  navigate(`/book/${hotelId}`);
                }}>
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Hotel not found</p>
      )}
    </Layout>
  );
}

export default Detail;
