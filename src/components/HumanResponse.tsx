import { Message } from 'ai'
import React from 'react'
import { motion } from 'framer-motion'
type Props = {
    message: Message
}

const HumanResponse = (props: Props) => {
    return (
        <motion.div
            transition={{ duration: 0.5 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className='bg-gray-700 p-2 rounded-lg  w-4/5 self-end text-white'>
            {props.message.content}
        </motion.div>
    )
}

export default HumanResponse