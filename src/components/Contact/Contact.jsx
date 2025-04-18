import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import DescriptionAlerts from '../Alert/DescriptionAlerts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

// Constants for EmailJS
const EMAILJS_CONFIG = {
  serviceId: 'service_mp0ge2s',
  templateId: 'template_9jwfhz2',
  publicKey: 'A3VYjsdt5hmHAsclW'
};

// Validation rules
const VALIDATION_RULES = {
  name: {
    maxLength: 50,
    required: 'Name is required',
    maxLengthError: 'Name must not exceed 50 characters'
  },
  email: {
    pattern: /\S+@\S+\.\S+/,
    required: 'Email is required',
    invalid: 'Invalid email format'
  },
  message: {
    maxLength: 1000,
    required: 'Message is required',
    maxLengthError: 'Message must not exceed 1000 characters'
  }
};

export const Contact = () => {
  const form = useRef(null);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ status: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const validateForm = () => {
    const formData = new FormData(form.current);
    const newErrors = {};

    // Name validation
    const name = formData.get('user_name')?.trim();
    if (!name) {
      newErrors.name = VALIDATION_RULES.name.required;
    } else if (name.length > VALIDATION_RULES.name.maxLength) {
      newErrors.name = VALIDATION_RULES.name.maxLengthError;
    }

    // Email validation
    const email = formData.get('user_email')?.trim();
    if (!email) {
      newErrors.email = VALIDATION_RULES.email.required;
    } else if (!VALIDATION_RULES.email.pattern.test(email)) {
      newErrors.email = VALIDATION_RULES.email.invalid;
    }

    // Message validation
    const message = formData.get('message')?.trim();
    if (!message) {
      newErrors.message = VALIDATION_RULES.message.required;
    } else if (message.length > VALIDATION_RULES.message.maxLength) {
      newErrors.message = VALIDATION_RULES.message.maxLengthError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      if (form.current) {
        await emailjs.sendForm(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          form.current,
          EMAILJS_CONFIG.publicKey
        );
        
        setAlert({ 
          status: 'success', 
          message: 'Your message has been sent successfully. I will reply soon.' 
        });
        setShowOverlay(true);
        form.current.reset();
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setAlert({ 
        status: 'error', 
        message: 'Failed to send message. Please try again later.' 
      });
      setShowOverlay(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setAlert({ status: '', message: '' });
        setShowOverlay(false);
      }, 3000);
    }
  };

  return (
    <section className="bg-primary-color text-secondary-color p-6 overflow-hidden relative">
      <h1 className="font-bold text-1xl sm:text-2xl md:text-3xl lg:text-3xl mb-10 text-secondary-color text-center">Contact Me</h1>

      <div className="flex flex-col md:flex-row items-center justify-center md:px-10 mb-10">
        <div className="items-center md:items-start text-white lg:pr-10">
          <p className="mb-6 text-sm md:text-base">Feel free to contact me if you have any questions, feedback, or collaboration opportunities. I'd be happy to hear from you!</p>
          <div className="hidden md:block">
            <div className="mt-4 flex items-center">
              <i className="fas fa-envelope mr-2"></i>
              <span>
                Email: <a href="mailto:adibbagus42@gmail.com">adibbagus42@gmail.com</a>
              </span>
            </div>
            <div className="mt-2 flex items-center">
              <i className="fas fa-user mr-2"></i>
              <span>Name: Adib Bagus Sudiyono</span>
            </div>
            <div className="mt-2 flex items-center">
              <i className="fas fa-map-marker-alt mr-2"></i>
              <span>Location: Batang, Central Java, Indonesia</span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md lg:w-1/2 mx-auto md:mt-0 relative z-10">
          <motion.form 
            ref={form} 
            onSubmit={sendEmail} 
            className="bg-white rounded-lg shadow-xl lg:p-8 p-4 relative" 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <label className="block text-primary-color mb-2">
                Name<span className="text-red">*</span>
              </label>
              <input 
                autoComplete="given-name" 
                type="text" 
                name="user_name" 
                className="text-primary-color w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green" 
                disabled={isLoading}
              />
              {errors.name && <p className="text-red text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-primary-color mb-2">
                Email<span className="text-red">*</span>
              </label>
              <input 
                autoComplete="email" 
                type="email" 
                name="user_email" 
                className="text-primary-color w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green" 
                disabled={isLoading}
              />
              {errors.email && <p className="text-red text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-primary-color mb-2">
                Message<span className="text-red">*</span>
              </label>
              <textarea 
                name="message" 
                className="text-primary-color w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green h-32" 
                disabled={isLoading}
              />
              {errors.message && <p className="text-red text-xs mt-1">{errors.message}</p>}
            </div>
            <motion.button
              type="submit"
              className={`w-full border border-2 border-solid border-green text-green py-2 rounded-md cursor-pointer transition-colors hover:bg-green hover:text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'} <FontAwesomeIcon icon={faPaperPlane} />
            </motion.button>

            {showOverlay && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center rounded-lg"
              >
                <DescriptionAlerts 
                  status={alert.status} 
                  message={alert.message}
                  className="text-center"
                />
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
