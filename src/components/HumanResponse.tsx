import { Message } from 'ai'
import React from 'react'
import { motion } from 'framer-motion'
import { UserRound } from 'lucide-react'
type Props = {
    message: Message
}

const HumanResponse = (props: Props) => {
    return (
        <motion.div
            transition={{ duration: 0.5 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className='flex gap-2  w-4/5 self-end justify-end text-white'>
            <div className='bg-blue-800 p-2 px-3 rounded-lg'>{props.message.content}</div>
            <UserRound className='w-10 h-10 p-2 text-slate-100 bg-blue-900 rounded-full' />
        </motion.div>
    )
}

export default HumanResponse