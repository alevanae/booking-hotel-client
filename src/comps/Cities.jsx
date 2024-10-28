import { useContext, useEffect, useState } from "react";
import userContext from "../contextAPI";
import { useNavigate } from "react-router-dom";
import domain from "../domain";

export default function Cities() {
  const [cities, setCities] = useState([]);
  const { setSearchInfo } = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchCitiesData() {
      try {
        const res = await fetch(`${domain}/hotel/client/cities`);
        const cityData = await res.json();
        if (!res.ok) throw new Error(cityData.message);
        const ourCities = cityData.data.map((city) => {
          let imgUrl = "";
          if (city.city === "Ha Noi") imgUrl = "https://imgur.com/jiQhI1g.jpeg";
          if (city.city === "Da Nang")
            imgUrl = "https://imgur.com/YPtAG6w.jpeg";
          if (city.city === "Ho Chi Minh")
            imgUrl = "https://imgur.com/RcE0q1k.jpeg";
          return {
            name: city.city,
            subText: `${city.count} propert${city.count > 1 ? "ies" : "y"}`,
            image: imgUrl,
          };
        });
        setCities(ourCities);
        // https://imgur.com/YPtAG6w da nang
        // https://imgur.com/jiQhI1g ha noi
        // https://imgur.com/RcE0q1k ho chi minh
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchCitiesData();
  }, []);
  function searchCity(city) {
    setSearchInfo((prev) => {
      return { ...prev, city };
    });
    navigate("/search");
  }
  return (
    <div className="my-12 flex gap-[3%] justify-center">
      {cities.map((item, i) => (
        <div
          className="w-[30%] border-[1px] border-white border-solid rounded-[20px] relative overflow-hidden"
          key={`city-${i}`}
          onClick={() => searchCity(item.name)}>
          <img
            src={item.image}
            className="w-full h-full"
            alt={`${item.name} with ${item.subText}`}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 hover:bg-opacity-10"></div>
          <div className="absolute bottom-[10%] left-[10%] text-white font-bold">
            <h2 className="text-[28px]">{item.name}</h2>
            <h3 className="text-[24px]">{item.subText}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
