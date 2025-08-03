import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onBlur"
  });

  const [serverState, setServerState] = useState({
    submitting: false,
    status: null
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleServerResponse = (ok, msg) => {
    setServerState({
      submitting: false,
      status: { ok, msg }
    });
    if (ok) {
      reset();
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };

  const onSubmit = (data, e) => {
    const form = e.target;
    setServerState({ submitting: true });

    // EmailJS configuration
    const template_params = {
      "reply_to": data.email,
      "from_name": data.name,
      "to_name": "Vee/Ra",
      "message": data.message,
      "subject": data.subject
    };

    const service_id = "vee/ra";
    const template_id = "template_uviwld5";
    const user_id = "user_E7hnIvNfEqvZm2avmHiqG";

    emailjs.send(service_id, template_id, template_params, user_id)
      .then(() => {
        handleServerResponse(true, "Thank you! Your message has been sent successfully.");
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        handleServerResponse(false, "Sorry, there was an error sending your message. Please try again or email us directly at info@veera.co.za");
      });
  };

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isErrors = Object.keys(errors).length !== 0;

  return (
    <div className="contact-form">
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form__form">
        <div className={`contact-form__group ${(isErrors && errors.name) ? 'has-error' : ''} ${formData.name ? 'has-value' : ''}`}>
          <input
            type="text"
            name="name"
            id="name"
            {...register('name', {
              onChange: (e) => onChangeHandler(e),
              required: 'Full Name Required'
            })}
            className="contact-form__input"
          />
          <label htmlFor="name" className="contact-form__label">Full Name</label>
          {errors.name && <span className="contact-form__error">{errors.name.message}</span>}
        </div>

        <div className={`contact-form__group ${(isErrors && errors.email) ? 'has-error' : ''} ${formData.email ? 'has-value' : ''}`}>
          <input
            type="email"
            name="email"
            id="email"
            {...register('email', {
              onChange: (e) => onChangeHandler(e),
              required: 'Email Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address"
              }
            })}
            className="contact-form__input"
          />
          <label htmlFor="email" className="contact-form__label">Email Address</label>
          {errors.email && <span className="contact-form__error">{errors.email.message}</span>}
        </div>

        <div className={`contact-form__group ${(isErrors && errors.subject) ? 'has-error' : ''} ${formData.subject ? 'has-value' : ''}`}>
          <input
            type="text"
            name="subject"
            id="subject"
            {...register('subject', {
              onChange: (e) => onChangeHandler(e),
              required: 'Subject Required'
            })}
            className="contact-form__input"
          />
          <label htmlFor="subject" className="contact-form__label">Subject</label>
          {errors.subject && <span className="contact-form__error">{errors.subject.message}</span>}
        </div>

        <div className={`contact-form__group ${(isErrors && errors.message) ? 'has-error' : ''} ${formData.message ? 'has-value' : ''}`}>
          <textarea
            name="message"
            id="message"
            {...register('message', {
              onChange: (e) => onChangeHandler(e),
              required: 'Message Required',
              minLength: { value: 10, message: "Message must be at least 10 characters" }
            })}
            className="contact-form__textarea"
            rows="5"
          />
          <label htmlFor="message" className="contact-form__label">Your Message</label>
          {errors.message && <span className="contact-form__error">{errors.message.message}</span>}
        </div>

        <div className="contact-form__submit">
          <button 
            className="contact-form__button" 
            type="submit" 
            disabled={serverState.submitting}
          >
            {serverState.submitting ? 'Sending...' : 'Send Message'}
          </button>
          
          {serverState.status && (
            <div className={`contact-form__message ${!serverState.status.ok ? "error" : "success"}`}>
              {serverState.status.msg}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm; 