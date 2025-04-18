import React, { useState, useEffect, useRef } from 'react';
import ReactCardFlip from 'react-card-flip';
import { motion } from 'framer-motion';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import projectsData from '../../data/project.json';

// Add FontAwesome icons to the library
library.add(faChevronDown, faChevronUp);

function Project({ title, description, technologies, image, github, preview }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div ref={cardRef}>
      {isVisible ? (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          {/* Front of the card */}
          <div className="bg-white shadow-lg border border-1 p-4 rounded-lg mb-4 overflow-hidden cursor-pointer" onClick={handleClick}>
            <img 
              src={image} 
              alt={title} 
              className="rounded-lg w-full h-auto" 
              style={{ maxHeight: '300px', objectFit: 'cover' }} 
              loading="lazy"
              decoding="async"
            />
            <h4 className="font-semibold text-center text-primary-color text-sm lg:text-base mt-2">{title}</h4>
          </div>

          {/* Back of the card */}
          <div className="bg-white shadow-lg border border-1 border-solid p-4 rounded-lg mb-4 overflow-hidden cursor-pointer" onClick={handleClick}>
            <p className={`text-gray-700 text-sm lg:text-base text-justify mb-2 ${isExpanded ? '' : 'line-clamp-4'}`} dangerouslySetInnerHTML={{ __html: description }}></p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDescription();
              }}
              className="text-blue-500 hover:underline"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
            <div className="flex flex-wrap mt-2">
              {technologies.map((tech, index) => (
                <span key={index} className="bg-gray-200 text-black rounded-lg px-3 py-1 text-xs mr-2 mb-2">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-sm mt-3 mb-2 flex justify-end">
              {github ? (
                <a className="border border-2 border-solid border-green text-green p-2 font-semibold rounded-lg mr-2 hover:bg-green hover:text-primary-color" target="_blank" rel="noopener noreferrer" href={github}>
                  Github
                </a>
              ) : (
                <span className="bg-red text-white p-2 font-semibold rounded-lg mr-2 ">Not available</span>
              )}
              {preview ? (
                <a className="text-green bg-primary-color p-2 font-semibold rounded-lg" target="_blank" rel="noopener noreferrer" href={preview}>
                  Preview
                </a>
              ) : (
                <span className="bg-red text-white p-2 font-semibold rounded-lg">Not available</span>
              )}
            </p>
          </div>
        </ReactCardFlip>
      ) : (
        <div className="bg-gray-200 animate-pulse rounded-lg mb-4" style={{ height: '300px' }}></div>
      )}
    </div>
  );
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState(3); // Number of projects to display initially
  const [showAll, setShowAll] = useState(false); // To track if all projects are being displayed

  const handleFilterClick = (category) => {
    setActiveFilter(category);
    setVisibleProjects(3); // Reset to initial number when filtering
    setShowAll(false); // Reset showAll state when changing filter
  };

  const toggleShowMore = () => {
    setShowAll(!showAll);
    setVisibleProjects(showAll ? 3 : projectsData.length); // Toggle between showing all or initial projects
  };

  const uniqueCategories = ['All', ...new Set(projectsData.map((project) => project.category))];

  return (
    <section className="bg-gray-100 p-6">
      <h1 className="font-bold text-1xl sm:text-2xl md:text-3xl lg:text-3xl mb-2 text-primary-color">Projects</h1>
      <p className="text-sm text-gray-500 mb-4">-- Flip to view description --</p>
      <div className="flex overflow-x-auto p-3 mb-4">
        {uniqueCategories.map((category, index) => (
          <motion.button
            key={index}
            className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap 
            ${activeFilter === category ? 'bg-primary-color text-white' : 'border-solid border-2 border-primary-color text-primary-color'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFilterClick(category)}
          >
            {category}
          </motion.button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projectsData
          .filter((project) => activeFilter === 'All' || project.category === activeFilter)
          .slice(0, visibleProjects) // Show only a subset of projects
          .map((project) => (
            <Project
              key={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              image={project.image}
              github={project.github}
              preview={project.preview} // Ensure this prop is passed
            />
          ))}
      </div>
      <div className="text-center mt-4">
        <button onClick={toggleShowMore} className="text-primary-color mx-auto flex flex-col items-center justify-center opacity-50 hover:opacity-100">
          {showAll ? (
            <>
              <FontAwesomeIcon icon="chevron-up" className="text-3xl mb-2" />
              <span>Show less</span>
            </>
          ) : (
            <>
              <span>Show more</span>
              <FontAwesomeIcon icon="chevron-down" className="text-3xl mb-2" />
            </>
          )}
        </button>
      </div>
    </section>
  );
}

export default Projects;
