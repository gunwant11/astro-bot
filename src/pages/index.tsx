import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

import { decodeKeyJson } from '../utils/decodeKeyJson';

// export async function getServerSideProps() {
//   decodeKeyJson();
//   return {
//     props: {},
//   };
// }

export default function Home() {

  const router = useRouter();

  return (
    <main
      className={`flex min-h-screen flex-col  items-center justify-between  ${inter.className}`}
    >
      <Navbar />
      <img src="/images/bg.jpg" alt="background" className="w-full h-screen absolute z-0" />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex gap-10 flex-col">
        <h1 className="text-4xl font-bold text-center">
          Welcome to Astro Bot </h1>
        <div className="flex flex-col items-center justify-between">
          <p className="text-2xl font-bold text-center">
            A chatbot that helps you with your daily tasks.
          </p>
          <p className="text-2xl font-bold text-center">
            Ask me anything and I will help you.
          </p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push("/chat")}>
          Get Started
        </button>

      </div>


    </main>
  );
}
