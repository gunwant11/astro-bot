import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
    return (
        <div className='bg-gray-800 p-4 w-full flex justify-between items-center'>
            <div className='text-white text-2xl'>Chatbot</div>
            <div className='text-white text-xl'>About</div>

        </div>
    )
}

export default Navbar