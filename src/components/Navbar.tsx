import { Github } from 'lucide-react'
import { Almendra } from 'next/font/google';
import { useRouter } from 'next/navigation';
import React from 'react'
const inter = Almendra({ weight: "400", subsets: ["latin"] });
type Props = {}

const Navbar = (props: Props) => {
    const router = useRouter();
    return (
        <div className='bg-gray-950/20 z-10 p-4  px-10 w-full flex justify-between items-center  '>
            <div className={`text-white text-2xl ${inter.className}`} onClick={() => router.push('/')} > Astro Bot </div>
            <a href='https://github.com/gunwant11/astro-bot' className='text-white text-xl cursor-pointer '><Github /></a>

        </div>
    )
}

export default Navbar