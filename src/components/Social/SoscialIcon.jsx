import React from 'react';
import { Icon } from '@iconify/react';

const SocialIcons = () => {
  return (
    <div className="flex justify-center items-center space-x-4">
      <a href="https://www.linkedin.com/in/adibbaguss/" target="_blank" rel="noopener noreferrer">
        <Icon icon="devicon:linkedin" className="text-3xl  hover:text-4xl" />
      </a>
      <a href="https://www.instagram.com/adibbagus_" target="_blank" rel="noopener noreferrer">
        <Icon icon="skill-icons:instagram" className="text-3xl  hover:text-4xl" />
      </a>
      <a href="https://github.com/adibbaguss" target="_blank" rel="noopener noreferrer">
        <Icon icon="icon-park:github" className="text-3xl  hover:text-4xl" />
      </a>
      <a href="https://t.me/adb_24" target="_blank" rel="noopener noreferrer">
        <Icon icon="logos:telegram" className="text-3xl  hover:text-4xl" />
      </a>
      <a href="https://www.shutterstock.com/g/Adib+Baguss?sort=newest" target="_blank" rel="noopener noreferrer">
        <Icon icon="simple-icons:shutterstock" className="text-3xl  hover:text-4xl bg-red text-white p-1 rounded" />
      </a>
    </div>
  );
};

export default SocialIcons;
