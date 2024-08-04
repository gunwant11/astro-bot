import Image from "next/image";
import { Almendra, Raleway } from "next/font/google";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const inter = Almendra({ weight: "400", subsets: ["latin"] });


const raleway = Raleway({ weight: "500", subsets: ["latin"] });


export default function Home() {

  const router = useRouter();

  return (
    <main
      className={`flex min-h-screen relative flex-col  items-center justify-between overflow-hidden  `}
    >
      <Navbar />
      <img src="/images/bg.jpg" alt="background" className="w-full h-screen absolute z-0" />
      <div className={` flex  items-center  justify-center lg:justify-between w-[90%] mx-auto h-[calc(100vh-4rem)] flex-col lg:flex-row `}>
        <div className="z-10 max-w-4xl w-full items-center justify-between font-mono text-sm lg:flex gap-10 flex-col">
          <div className="flex flex-col gap-4 sm:gap-2 items-center lg:items-start">
            <h1 className={` text-3xl sm:text-4xl font-medium mb-6 `}  >
              Explore the Cosmos  </h1>
            <h1
              className={` text-6xl sm:text-8xl  ${inter.className} `}
            >Astro Bot</h1>
            <div className="flex flex-col items-center lg:items-start gap-2  sm:gap-1 mb-4">
              <p className="text-2xl font-medium ">
                A Journey into Reality
              </p>
              <p className="text-xl font-medium italic text-center lg:text-left ">
                Connect, chat, and receive personalized horoscopes with Astrobot.
              </p>

            </div>
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white w-fit font-bold py-3 px-8 rounded-xl" onClick={() => router.push("/chat")}>
              Get Started
            </button>
          </div>
        </div>
        <motion.img
          // rotate infinite

          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}


          src="/images/astro.png" alt="Astro Bot" className=" absolute lg:relative lg:w-1/2 xl:w-3/4  z-10" />
      </div>


    </main>
  );
}
