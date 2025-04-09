"use client";

import React, { useState, useEffect } from 'react';
import { DataItem } from '@/utils/excelUtils';

interface SlickSliderProps {
  data: DataItem[];
  filter?: string;
}

const SlickSlider: React.FC<SlickSliderProps> = ({ data, filter }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredData = filter 
    ? data.filter(item => item.mediaType === filter)
    : data;

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === filteredData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? filteredData.length - 1 : prev - 1));
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  if (filteredData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-gray-500">
          No {filter ? filter.toLowerCase() : ''} items available
        </span>
      </div>
    );
  }

  const currentItem = filteredData[currentIndex];

  return (
    <div className="relative w-full max-w-md mx-auto border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg">
      <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
        {currentItem.image ? (
          <img
            src={currentItem.image}
            alt={currentItem.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <span className="text-gray-500">No image available</span>
        )}
      </div>

      <div className="p-4 text-center bg-white">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{currentItem.name}</h3>
        <p className="text-gray-600">{currentItem.title}</p>
        <p className="text-sm text-gray-500 mt-1">{currentItem.mediaType}</p>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-full hover:bg-black transition-colors"
        aria-label="Previous slide"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-full hover:bg-black transition-colors"
        aria-label="Next slide"
      >
        &gt;
      </button>

      <div className="flex justify-center space-x-2 p-4 bg-white">
        {filteredData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlickSlider;
