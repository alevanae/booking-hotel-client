import { useEffect, useState } from "react";
import domain from "../domain";

export default function Properties() {
  const [properties, setProperties] = useState([
    {
      name: "Hotels",
      count: 0,
      image: "./images/type_1.webp",
    },
    {
      name: "Apartments",
      count: 0,
      image: "./images/type_2.jpg",
    },
    {
      name: "Resorts",
      count: 0,
      image: "./images/type_3.jpg",
    },
    {
      name: "Villas",
      count: 0,
      image: "./images/type_4.jpg",
    },
    {
      name: "Cabins",
      count: 0,
      image: "./images/type_5.jpg",
    },
  ]);

  useEffect(() => {
    async function getHotelTypes() {
      try {
        const res = await fetch(`${domain}/hotel/client/types`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        const updatedProperties = properties.map((item) => {
          const type = data.data.find((type) =>
            item.name.toLowerCase().includes(type.name)
          );
          return type ? { ...item, count: type.count } : item;
        });
        setProperties(updatedProperties);
      } catch (err) {
        console.log(err.message);
      }
    }
    getHotelTypes();
  }, [properties]);
  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Browse by properties</h2>
      <div className="mb-12 flex gap-[10px] justify-between">
        {properties.map((item, i) => (
          <div
            className="w-[18%] border-[1px] border-white border-solid rounded-[20px] relative overflow-hidden pb-2"
            key={`property-${i}`}>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[170px]"
            />

            <h2>
              <strong>{item.name}</strong>
            </h2>
            <p>{`${item.count} ${item.name}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
