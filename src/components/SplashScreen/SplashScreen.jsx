import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Portfolio Developer';
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prevProgress => prevProgress + 1);
      } else {
        setFadeOut(true);
        setTimeout(() => {
          onFinished();
        }, 500); // Wait for fade-out animation to complete
      }
    }, 30); // Total time will be ~3 seconds (30ms * 100)
    
    return () => clearTimeout(timer);
  }, [progress, onFinished]);
  
  // Typing effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [typedText, fullText]);
  
  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <div className="logo-container">
          <div className="logo-circle">
            <span className="logo-text">AB</span>
          </div>
        </div>
        <h1 className="splash-title">Adib Bagus</h1>
        <p className="splash-subtitle">
          {typedText}
          <span className="cursor">|</span>
        </p>
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="loading-text">Loading... {progress}%</p>
      </div>
      
      <div className="particles">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }} />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen; 