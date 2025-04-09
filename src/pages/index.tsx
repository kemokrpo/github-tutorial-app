import React, { useState, useEffect } from "react";
import SlickSlider from "@/components/SlickSlider/SlickSlider"; 
import { DataItem, loadExcelData } from "@/utils/excelUtils";

const HomePage: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]); 
  const [filter, setFilter] = useState<string | undefined>(undefined); 

  useEffect(() => {
    const loadData = async () => {
      const excelData = await loadExcelData("/data/PlaceHolder.xlsx"); 
      setData(excelData); 
    };
    loadData();
  }, []);

  const renderGrid = (filteredData: DataItem[]) => (
    <div className="grid grid-cols-3 gap-4">
      {filteredData.map((item, index) => (
        <div
          key={index}
          className="border p-4 rounded-lg shadow-md bg-white text-center"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-32 object-contain mb-2"
          />
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p className="text-gray-600">{item.title}</p>
          <p className="text-sm text-gray-500">{item.mediaType}</p>
        </div>
      ))}
    </div>
  );

  const filteredData = filter
    ? data.filter((item) => item.mediaType === filter)
    : data;

  return (
    <div className="p-8 space-y-8">
      {/* Filter Buttons */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-10 py-4">
        <div className="flex space-x-4 justify-center">
          <button
            onClick={() => setFilter(undefined)}
            className={`px-4 py-2 rounded ${
              !filter ? "bg-blue-600 text-green-500" : "bg-gray-200 text-red-500"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("Game")}
            className={`px-4 py-2 rounded ${
              filter === "Game" ? "bg-blue-600 text-green-500" : "bg-gray-200 text-red-500"
            }`}
          >
            Games
          </button>
          <button
            onClick={() => setFilter("Anime")}
            className={`px-4 py-2 rounded ${
              filter === "Anime" ? "bg-blue-600 text-green-500" : "bg-gray-200 text-red-500"
            }`}
          >
            Anime
          </button>
        </div>
      </div>

      
      <div className="mt-24">
        <section>
          <h2 className="text-2xl font-bold mb-4">Slick Slider (All Items)</h2>
          <SlickSlider data={data} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            Slick Slider ({filter || "All"})
          </h2>
          <SlickSlider data={data} filter={filter} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Grid (All Items)</h2>
          {renderGrid(data)}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            Grid ({filter || "All"})
          </h2>
          {renderGrid(filteredData)}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
