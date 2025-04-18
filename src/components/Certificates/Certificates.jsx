import React, { useState } from 'react';
import CustomModal from '../CustomModal/CustomModal';
import dataJson from '../../data/data.json';
import Masonry from 'react-masonry-css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import './Certificates.css';

const Certificates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showMore, setShowMore] = useState(false); // State to toggle between "Show More" and "Show Less"
  const itemsToShow = showMore ? dataJson.certificates.length : 4; // Number of items to show based on state

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
    400: 1,
  };

  return (
    <section className="p-5 overflow-hidden">
      <h1 className="font-bold text-1xl sm:text-2xl md:text-3xl lg:text-3xl mb-10 text-primary-color text-center">My Certificates</h1>
      <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {dataJson.certificates.slice(0, itemsToShow).map((certificate) => (
          <div key={certificate.id} className="image-wrapper">
            <img
              src={certificate.src}
              alt={certificate.alt}
              className="masonry-image cursor-pointer transform hover:scale-105 hover:shadow-lg transition-transform border border-solid border-primary-color rounded-md"
              onClick={() => openModal(certificate.src)}
              loading="lazy"
              width="100%"
              height="auto"
            />
          </div>
        ))}
      </Masonry>
      <div className="text-center mt-4">
        <button onClick={toggleShowMore} className="text-primary-color mx-auto flex flex-col items-center justify-center opacity-50 hover:opacity-100">
          {showMore ? (
            <>
              <FontAwesomeIcon icon={faChevronUp} className="text-3xl mb-2" />
              <span>Show Less</span>
            </>
          ) : (
            <>
              <span>Show More</span>
              <FontAwesomeIcon icon={faChevronDown} className="text-3xl mb-2" />
            </>
          )}
        </button>
      </div>
      {selectedImage && <CustomModal isOpen={isModalOpen} onClose={closeModal} image={selectedImage} />}
    </section>
  );
};

export default Certificates;
