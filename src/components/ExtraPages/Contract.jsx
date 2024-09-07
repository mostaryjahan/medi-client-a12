import emailjs from 'emailjs-com';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Include the email as reply_to for EmailJS
    const emailData = {
      from_name: formData.name,
      reply_to: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs.send(
      'service_cdg3nyc', // Service ID
      'template_v4xqtr9', // Template ID
      emailData,
      '9E8lqT-Rdu04Oq3kS' // Public Key
    )
    .then((result) => {
      console.log(result.text);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your email has been sent successfully.',
        timer: 1500,
        timerProgressBar: true, 
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, (error) => {
      console.log(error.text);
      alert('Failed to send email. Please try again.');
    });
  };

  return (
    <div className='mb-8'> 
      <div className="mx-auto flex justify-center  items-center   dark:text-gray-200 w-full md:w-2/3 mt-14 px-2">
        <div className="font-mon p-4 rounded-md shadow-md w-full sm:w-3/4 border-2 ">
          <h2 className="text-2xl font-mon font-bold mb-4 text-center">Contact Us</h2>
          <form className="space-y-4 " onSubmit={handleSubmit}>
            <div className='flex gap-2 '>
              <div className='w-full'>
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-200">Name: </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className='w-full'>
                <label htmlFor="subject " className="block text-gray-700 dark:text-gray-200">Subject: </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 ">Email: </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-200">Message: </label>
              <textarea
                id="message"
                name="message"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="4"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-700 dark:bg-purple-400 dark:text-black py-2 px-4 hover:text-white hover:border  text-white font-bold rounded-md hover:bg-gray-800"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
