import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Landing = () => {
  const slides = [
    {
      title: 'Manage Your Tasks Efficiently',
      description: 'Easily create, track, and complete tasks to stay organized and productive.',
      imageUrl: 'https://via.placeholder.com/800x400?text=Task+Management',
    },
    {
      title: 'Prioritize What Matters',
      description: 'Set task priorities to focus on what’s most important.',
      imageUrl: 'https://via.placeholder.com/800x400?text=Task+Prioritization',
    },
    {
      title: 'Track Your Progress',
      description: 'Visualize your progress with detailed insights and reports.',
      imageUrl: 'https://via.placeholder.com/800x400?text=Progress+Tracking',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10">
      <div className="overflow-hidden rounded-lg shadow-lg">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`w-full transition-transform duration-500 ease-in-out transform ${
              index === currentSlide ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <img src={slide.imageUrl} alt={slide.title} className="w-full h-60 object-cover" />
            <div className="p-6 bg-white">
              <h2 className="text-2xl font-bold">{slide.title}</h2>
              <p className="mt-2 text-gray-600">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none"
      >
        <FaChevronLeft className="text-gray-700" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none"
      >
        <FaChevronRight className="text-gray-700" />
      </button>

      {/* Slide Indicators */}
      <div className="flex justify-center mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 mx-1 rounded-full focus:outline-none ${
              currentSlide === index ? 'bg-violet-500' : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Landing;
