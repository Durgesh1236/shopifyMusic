import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../context/User'
import { SongData } from '../context/Song'

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { fetchSong, fetchAlbums } = SongData();
    const { registerUser, btnLoading } = UserData();
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        registerUser(name, email, password, navigate);
    }

    return (
        <div className='flex items-center justify-center h-screen max-h-screen'>
            <div className=" text-white max-w-md bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
                <h2 className='text-3xl font-semibold text-center mb-8'>Register to Shopify</h2>

                <form className='mt-8' onSubmit={submitHandler}>

                    <div className="mb-4">
                        <label className='block text-sm font-medium mb-1'>
                            Name
                        </label>
                        <input type="text" onChange={(e) => setName(e.target.value)} placeholder='Your Name' value={name} className='auth-input' required />
                    </div>

                    <div className="mb-4">
                        <label className='block text-sm font-medium mb-1'>
                            Email or Username
                        </label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email or Username' value={email} className='auth-input' required />
                    </div>

                    <div className="mb-4">
                        <label className='block text-sm font-medium mb-1'>
                            Password
                        </label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' className='auth-input' required />
                    </div>

                    <button disabled={btnLoading} className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>
                        {
                            btnLoading ?
                                "Please Wait..."
                                : "Register"
                        }
                    </button>
                </form>

                <div className="text-center mt-6 flex justify-center">
                <p className="text-sm text-gray-400 pr-3">Already have account?</p>
                    <Link to="/login" className="text-sm text-gray-400 hover:text-green-500 text-decoration-line: underline">Login Here</Link>
                </div>
            </div>
        </div>
    )
}

export default Register
