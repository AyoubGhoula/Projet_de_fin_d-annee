"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from "next/router";

export default function Example() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
     const [payer, setPayer] = useState('');
     const [avatar, setAvatar] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('participant');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phone);
        formData.append('payer', payer);
        if (avatar) formData.append('avatar', avatar);
        formData.append('date_of_birth', dateOfBirth);
        formData.append('address', address);
        formData.append('role', role);
    
        try {
            console.log("Form data being submitted:", {
                name,
                email,
                password,
                phone,
                payer,
                avatar,
                dateOfBirth,
                address,
                role
            });
            const response = await axios.post('http://127.0.0.1:8000/api/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            window.location.href = '/sign-in';
        } catch (error) {
            if (error.response) {
                console.error('Validation Errors:', error.response.data.errors);
            } else {
                console.error('Error:', error);
            }
        }
    };
    
    useEffect(() => {
        const roleElement = document.getElementById('role') as HTMLSelectElement | null;

        // Check if the role element exists before adding the event listener
        if (roleElement) {
            const handleChange = function () {
                const organizerFields = document.getElementById('organizer-fields');
                if (organizerFields) {
                    if (this.value === 'organizer') {
                        organizerFields.classList.remove('hidden'); // Show organizer fields
                    } else {
                        organizerFields.classList.add('hidden'); // Hide organizer fields
                    }
                } else {
                    console.error('Organizer fields element not found.');
                }
            };

            roleElement.addEventListener('change', handleChange);

            // Cleanup function to remove the event listener when the component unmounts
            return () => {
                roleElement.removeEventListener('change', handleChange);
            };
        } else {
            console.error('Role element not found.');
        }
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <section className="bg-white dark:bg-gray-900">
            {/*<div className="overflow-y-auto bg-black bg-opacity-50 overflow-x-hidden fixed inset-0 flex  justify-center z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative rounded-lg shadow bg-gray-900">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                
              >
              
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="max-w-md mx-auto border  mt-20 rounded">
    <form className="shadow-md px-4 py-6">
    <h3 className='mb-2 justify-center ml-4'> Your verification code has been sent to your email. Please check your inbox to proceed.</h3>
        <div className="flex justify-center gap-2 mb-6">
            <input className="w-12 h-12 text-center bg-slate-700 border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500" type="text"  pattern="[0-9]"   required/>
            <input className="w-12 h-12 text-center  bg-slate-700 border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500" type="text"  pattern="[0-9]"   required/>
            <input className="w-12 h-12 text-center   bg-slate-700 border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500" type="text"  pattern="[0-9]"   required/>
            <input className="w-12 h-12 text-center  bg-slate-700 border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500" type="text"  pattern="[0-9]"   required/>
        </div>
        <div className="flex items-center justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Verify
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-4" href="#">
                Resend 
            </a>
        </div>
    </form>
</div>
            </div>
          </div>
        </div>*/} 
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto ">
                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="flex justify-center mx-auto mt-5">
                        {/* <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" /> */}
                        <div className='flex items-center font-bold bg-gradient-to-r  from-cyan-500 to-blue-500 bg-clip-text text-transparent text-2xl'>EventMaster</div>
                    </div>
                    
                    <div className="flex items-center justify-center mt-6">
                        <Link href="/sign-in" className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300">
                            sign in
                        </Link>

                        <Link href="/sign-up" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                            sign up
                        </Link>
                    </div>
                            {/* name Field */}
                            <div className="flex gap-4">
                            <div className="flex-1">
                            <div className='m-2 mt-10'>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">first name</label>
                                        <input
                                            type="first name"
                                            name="first name"
                                            id="first name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="first name"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                            </div>
                            </div>
                            <div className="flex-1">
                            <div className='m-2 mt-10'>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name</label>
                                        <input
                                            type="name"
                                            name="name"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="name"
                                            required
                                            
                                        />
                            </div>
                            </div></div>

                     {/* Email Field */}
                     <div className='m-2 '>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                {/* Numéro de Téléphone Field */}
                                <div className='m-2' >
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="+1 234 567 890"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-4">
                            <div className="flex-1">
                                {/* Password Field */}
                                <div className='m-2' >
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        minLength={8}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                </div>
                                <div className="flex-1">
                                {/* Confirm Password Field */}
                                <div className='m-2' >
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input
                                        type="password"
                                        name="confirm-password"
                                        id="confirm-password"
                                        placeholder="••••••••"
                                        minLength={8}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                </div>
                                </div>
                                {/* Role Selection */}
                                <div className='m-2' >
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sign up as</label>
                                    <select
                                        id="role"
                                        name="role"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="participant">Participant</option>
                                        <option value="organizer">Organizer</option>
                                    </select>
                                </div>

                                {/* Organizer-Specific Fields */}
                                <div id="organizer-fields" className={role === 'organizer' ? '' : 'hidden m-2 '}>
                                <label className=" block mb-2 ml-2 text-sm font-medium text-gray-900 dark:text-white">Organization logo</label>
                                <input type="file" name="file-input" id="file-input" className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10  focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                    file:bg-gray-50 file:border-0
                                    file:me-4
                                    file:py-3 file:px-4
                                    dark:file:bg-neutral-700 dark:file:text-neutral-400"/>
                                        <div className='m-2 mt-4' >
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organization Name</label>
                                        <input
                                            type="text"
                                            name="organization"
                                            id="organization"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Your organization name"
                                        />
                                    </div>
                                    <div className='m-2' >
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website (optional)</label>
                                        <input
                                            type="url"
                                            name="website"
                                            id="website"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="https://yourwebsite.com"
                                        />
                                    </div>
                                </div>

                                {/* Terms and Conditions */}
                                <div className="flex items-start m-2 mt-5">
                                    <div className="flex items-center h-5 ">
                                        <input
                                            id="terms"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm ">
                                        <label className="font-light text-gray-500 dark:text-gray-300">
                                            I accept the{" "}
                                            <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                                Terms and Conditions
                                            </a>
                                        </label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full px-12 py-3 m-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                >
                                    Create an account
                                </button>

                                {/* Already Have an Account */}
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400 m-2">
                                    Already have an account?{" "}
                                    <Link href="/sign-in" className="font-medium text-blue-500 hover:underline">
                                        Login here
                                    </Link>
                                </p>
                </form>
            </div>
        </section>
    );
}
