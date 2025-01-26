import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 25);
    return {
      targetDate: targetDate.getTime(),
      days: 25,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = timeRemaining.targetDate - now;

      if (difference < 0) {
        clearInterval(interval);
        setTimeRemaining({
          targetDate: new Date().getTime() + 25 * 24 * 60 * 60 * 1000,
          days: 25,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ targetDate: timeRemaining.targetDate, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Check if current page is homepage (/ or /home)
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white z-10 py-2 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Logo - Reduced height */}
        <div className="w-32 h-16 md:w-24 md:h-20 mb-2 md:mb-0">
        <a href="/">
          <img 
            src="/PEF-TECH-Logo-noBg2.png" 
            alt="CJ ART" 
            className="object-contain w-full h-full"
          />
          </a>
        </div>

        {/* Mobile: Apply Button */}
        {isHomePage && (
          <div className="md:hidden flex flex-col items-center w-full mb-2">
            <a 
              href="/apply" 
              className="bg-[#E12322] rounded-lg text-white px-6 py-2 font-bold hover:bg-[#c01f1f] transition-colors text-sm w-full text-center"
            >
              Apply Now
            </a>
          </div>
        )}

        {/* Countdown Timer */}
        <div className="flex flex-col items-center w-full md:w-auto"> 
          <div className="text-center w-full">
            <div className="text-[var(--e-global-color-accent)] font-[Manrope] text-[18px] leading-[16px] mb-2">
              Applications will close in:  
            </div>
            <div className="text-white rounded-md font-bold flex justify-center space-x-1 text-xs md:text-sm gap-1">
              {[
                { value: timeRemaining.days, label: 'Days' },
                { value: timeRemaining.hours, label: 'Hrs' },
                { value: timeRemaining.minutes, label: 'Mins' },
                { value: timeRemaining.seconds, label: 'Secs' }
              ].map(({ value, label }) => (
                <div 
                  key={label} 
                  className="bg-[#fff] text-black px-2 py-1 text-center w-12 h-12 flex flex-col justify-center"
                >
                  <span className="block">{value}</span>
                  <span className="block text-xs">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Apply Button */}
        {isHomePage && (
        <div className="hidden md:block">
          <a 
            href="/apply" 
            className="bg-[#E12322] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#c01f1f] transition-colors"
          >
            Apply Now
          </a>
        </div>
        )}
        
      </div>
    </header>
  );
};

export default Header;