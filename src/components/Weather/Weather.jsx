import React, { useState, useEffect } from 'react';
import getWeather from '../../services/api';
import AOS from 'aos';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [timeColor, setTimeColor] = useState('red');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather();
        setWeather(data);

        // Init AOS after data is fetched
        if (AOS) {
          console.log('AOS is defined:', AOS);
          AOS.init();
          AOS.refresh();
        } else {
          console.error('AOS is undefined');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    // Fetch weather data on component mount
    fetchWeather();

    // Check current time and update color
    const checkTime = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      if (currentHour >= 7 && currentHour < 19) {
        setTimeColor('green');
      } else {
        setTimeColor('red');
      }
      setCurrentTime(currentTime);
    };

    // Initial checkTime call
    checkTime();

    // Set interval to update time color every minute
    const intervalId = setInterval(checkTime, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };
  console.log(weather);

  return (
    <div className="mx-3 font-thin mb-0">
      {weather && (
        <>
          <div className="hidden sm:grid sm:grid text-[10px] sm:text-xs md:text-xs lg:text-base">
            <div className="flex" data-aos="fade-down" data-aos-duration="1000">
              <span className="font-bold mb-0 mt-auto">{weather.main.temp.toFixed(1)}°C</span>
              <img className="w-6 sm:w-8 md:w-8 lg:w-12" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
              <span className="mb-0 mt-auto">
                Batang, Central Java, <span className="font-bold">Indonesia</span>
              </span>
            </div>

            <div className="flex" data-aos="fade-down" data-aos-duration="800">
              <div className={`p-1 rounded-full my-auto mr-1 ${timeColor === 'green' ? 'bg-green' : 'bg-red'}`}></div>
              <div>
                {timeColor === 'green' ? <span>Available</span> : <span>Not Available</span>} <span className="font-bold">For Work Now</span>
              </div>
            </div>
            <div data-aos="fade-down-left" data-aos-duration="600">
              <a href="mailto:adibbagus42@gmail.com">adibbagus42@gmail.com</a>
            </div>
          </div>

          <div className="sm:hidden text-[10px] sm:text-xs md:text-sm lg:text-base">
            <div className="flex mb-1 mt-2" data-aos="fade-down" data-aos-duration="800">
              <div className={`p-1 rounded-full my-auto mr-1 ${timeColor === 'green' ? 'bg-green' : 'bg-red'}`}></div>
              <div>
                {timeColor === 'green' ? <span>Available</span> : <span>Not Available</span>} <span className="font-bold">For Work Now</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
