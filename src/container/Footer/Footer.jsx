import React, { useState } from 'react';
import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: ''});
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { name, email, message } = formData;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  const handleSubmit = () => {
    setLoading(true);
    const contact = {
      _type: 'contact',
      name: formData.name,
      email: email,
      message: message,
    }

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmit(true);
      })
  }


  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:iphonerijuraj@gmail.com" className='p-text'>iphonerijuraj@gmail.com</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel:+918777836723" className='p-text'>+918777836723</a>
        </div>
      </div>

    {!isFormSubmit ?
      <div className="app__footer-form app__flex">
        <div className="app__flex">
          <input type="text" name="name" className="p-text" placeholder='Your Name' value={name} onChange={handleChangeInput} />
        </div>
        <div className="app__flex">
          <input type="email" name="email" className="p-text" placeholder='Your Email' value={email} onChange={handleChangeInput} />
        </div>
        <div>
          <textarea className='p-text' placeholder='Your Message' value={message} name="message" onChange={handleChangeInput} />
        </div>
        <button type="button" className='p-text' onClick={handleSubmit}>{loading ? 'Sending' : 'Send Message'}</button>
      </div>
      : <div>
        <h3 className="head-text">Thank you for getting in touch!</h3>
      </div>}
    </>
  );
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'
);