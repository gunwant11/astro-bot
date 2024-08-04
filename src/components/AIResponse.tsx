import { Message } from 'ai'
import React from 'react'
import { motion } from 'framer-motion'
type Props = {
    message: Message
}

const AIResponse = (props: Props) => {
    return (
        <motion.div
            transition={{ duration: 1 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className=' w-4/5 self-start text-white flex gap-2'>
            <img src='/icons/bot.svg' alt='bot' className='w-10 h-10 p-1.5  bg-blue-900 rounded-full' />
            <div className='bg-blue-950 p-2 px-3 rounded-lg ' >{props.message.content}</div>
        </motion.div>
    )
}

export default AIResponse