import React, { useState } from 'react';
import axios from 'axios'
import { useForm } from "react-hook-form";

const ContactForm = ({url}) => {
<<<<<<< HEAD
    const { register, handleSubmit, errors } = useForm({
		mode: "onBlur"
	})
=======
    const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onBlur"
	})

>>>>>>> 5ec1c145 (trying to upload)
    const [serverState, setServerState] = useState({
		submitting: false,
		status: null
    });
<<<<<<< HEAD
    
=======

>>>>>>> 5ec1c145 (trying to upload)
	const [value, setValue] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
    });
<<<<<<< HEAD
    
=======

>>>>>>> 5ec1c145 (trying to upload)
    const handleServerResponse = (ok, msg, form) => {
		setServerState({
			submitting: false,
			status: { ok, msg }
		});
		if (ok) {
			form.reset();
			setValue({
				name: '',
				email: '',
				subject: '',
				message: ''
			})
		}
    };
<<<<<<< HEAD
    
=======

>>>>>>> 5ec1c145 (trying to upload)

    const onSubmit = (data, e) => {
		const form = e.target;
		setServerState({ submitting: true });
		axios({
			method: "post",
			url: url,
			data
		})
			.then(res => {
				handleServerResponse(true, "Thanks! for being with us", form);
			})
			.catch(err => {
				handleServerResponse(false, err.response.data.error, form);
			});
	}

    const isErrors = Object.keys(errors).length !== 0 && true;
	const onChangeHandler = e => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

<<<<<<< HEAD
    return ( 
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`form-group ${(isErrors && errors.name) ? 'has-error' : ''} ${value.name ? 'has-value' : ''}`}>
                <input 
                    type="text"
                    name="name"
                    id="name"
                    onChange={onChangeHandler}
                    ref={register({
                        required: 'Full Name Required',
=======
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`form-group ${(isErrors && errors.name) ? 'has-error' : ''} ${value.name ? 'has-value' : ''}`}>
                <input
                    type="text"
                    name="name"
                    id="name"
                    {...register('name', {
                      onChange: (e) => {onChangeHandler(e)},
                      required: 'Full Name Required'
>>>>>>> 5ec1c145 (trying to upload)
                    })}
                />
                <label htmlFor="name">Full Name</label>
                {errors.name && <span className="error">{errors.name.message}</span>}
            </div>

            <div className={`form-group ${(isErrors && errors.email) ? 'has-error' : ''} ${value.email ? 'has-value' : ''}`}>
<<<<<<< HEAD
                <input 
                    type="email"
                    name="email"
                    id="email"
                    onChange={onChangeHandler}
                    ref={register({
                        required: 'Email Required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "invalid email address"
                        }
                    })}
=======
                <input
                    type="email"
                    name="email"
                    id="email"
                    {...register('email', {
                      onChange: (e) => {onChangeHandler(e)},
                      required: 'Email Required',
                      pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "invalid email address"
                      }
                     })}
>>>>>>> 5ec1c145 (trying to upload)
                />
                <label htmlFor="email">Enter Your Email</label>
                {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div className={`form-group ${(isErrors && errors.subject) ? 'has-error' : ''} ${value.subject ? 'has-value' : ''}`}>
                <input
                    type="text"
                    name="subject"
                    id="subject"
<<<<<<< HEAD
                    onChange={onChangeHandler}
                    ref={register({
                        required: 'Subject Required',
                    })}
                /> 
                <label htmlFor="subject">Subject</label> 
=======
                    {...register('subject', {
                      onChange: (e) => {onChangeHandler(e)},
                      required: 'Subject Required'
                    })}
                />
                <label htmlFor="subject">Subject</label>
>>>>>>> 5ec1c145 (trying to upload)
                {errors.subject && <span className="error">{errors.subject.message}</span>}
            </div>

            <div className={`form-group ${(isErrors && errors.message) ? 'has-error' : ''} ${value.message ? 'has-value' : ''}`}>
                <textarea
                    name="message"
                    id="message"
<<<<<<< HEAD
                    onChange={onChangeHandler}
                    ref={register({
                        required: 'Message Required',
                        minLength: { value: 10, message: "Minimum length is 10" }
                    })}
                >
                </textarea>
                <label htmlFor="message">Write your message here.</label> 
=======
                    {...register('message', {
                      onChange: (e) => {onChangeHandler(e)},
                      required: 'Message Required',
                      minLength: { value: 10, message: "Minimum length is 10" }
                    })}
                >
                </textarea>
                <label htmlFor="message">Write your message here.</label>
>>>>>>> 5ec1c145 (trying to upload)
                {errors.message && <span className="error">{errors.message.message}</span>}
            </div>

            <div className="form-submit">
                <button className="rn-button" type="submit" disabled={serverState.submitting}>
                    Send Message
                </button>
                {serverState.status && (
                    <p className={`form-output ${!serverState.status.ok ? "errorMsg" : "success"}`}>
                        {serverState.status.msg}
                    </p>
                )}
            </div>
<<<<<<< HEAD
        </form> 
=======
        </form>
>>>>>>> 5ec1c145 (trying to upload)
    )
}

export default ContactForm;
