import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const slides = [
    {
      image:
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1800&q=80',
      title: 'Education Opens Doors',
      subtitle: 'Supporting children with long-term educational opportunities in the UK and overseas.',
    },
    {
      image:
        'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1800&q=80',
      title: 'Standing With Families',
      subtitle: 'From Ukraine support to local mentoring, every project is built around real needs.',
    },
    {
      image:
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=80',
      title: 'From Hope To Qualification',
      subtitle: 'Helping young people move from uncertainty into classrooms, skills and confidence.',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToPrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative min-h-[72vh] overflow-hidden bg-slate-900 text-white">
      {slides.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === activeSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/40" />
        </div>
      ))}

      <div className="relative mx-auto flex min-h-[72vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-white/35 bg-white/10 px-4 py-1 text-sm tracking-[0.2em] text-amber-200 uppercase">
            Registered Charity No. 1069814
          </p>

          <h1
            className="mb-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
            style={{ fontFamily: 'Merriweather, Georgia, serif' }}
          >
            {slides[activeSlide].title}
          </h1>

          <p className="mb-8 max-w-2xl text-lg text-slate-100 sm:text-xl">
            {slides[activeSlide].subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/donate"
              className="rounded-full bg-amber-400 px-7 py-3 font-semibold text-slate-900 transition hover:bg-amber-300"
            >
              Support A Child Today
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-white/70 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              About TheoTrust
            </Link>
          </div>
        </div>

        <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 gap-3 md:flex lg:right-10">
          <button
            type="button"
            onClick={goToPrevSlide}
            className="rounded-full border border-white/40 bg-black/35 p-3 transition hover:bg-black/55"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goToNextSlide}
            className="rounded-full border border-white/40 bg-black/35 p-3 transition hover:bg-black/55"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="absolute bottom-7 left-4 flex gap-2 sm:left-6 lg:left-8">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeSlide ? 'w-10 bg-amber-300' : 'w-2.5 bg-white/65'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;