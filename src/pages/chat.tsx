import ChatInterface from '@/components/ChatInterface'
import Navbar from '@/components/Navbar'
import UserInput from '@/components/UserInput'

import React from 'react'

type Props = {}

const Chat = (props: Props) => {


    return (
        <div className='flex min-h-screen  bg-indigo-950  h-screen flex-col items-center justify-center '>
            <Navbar />
            <div className='max-w-4xl h-full w-full'>
                <ChatInterface />
            </div>
        </div>

    )
}

export default Chat