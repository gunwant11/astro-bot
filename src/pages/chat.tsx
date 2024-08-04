import ChatInterface from '@/components/ChatInterface'
import Navbar from '@/components/Navbar'

import React from 'react'

type Props = {}

const Chat = (props: Props) => {


    return (
        <div className='relative flex max-h-screen  h-screen flex-col items-center justify-center '>
            <img src="/images/bg.jpg" alt="background" className="w-full h-screen absolute z-0" />
            <Navbar />
            <div className='max-w-4xl z-10 h-[calc(100%-64px)] w-full'>
                <ChatInterface />
            </div>
        </div>

    )
}

export default Chat