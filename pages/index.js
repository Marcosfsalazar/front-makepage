import Head from 'next/head'
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Link from "next/link"

export default function Home() {
  return (
    <div
        className="
        flex flex-col
        items-center
        h-screen
        min-h-screen
        max-h-screen
        "
    >
      <Head>
          <title>CardMaker</title>
      </Head>
      <header
          className="
          w-full
          h-20"
      >
        <Navbar showNav/>
      </header>
      <section
          className="
               h-full
               w-full
               flex
               flex-cow
               items-center
               justify-center
            "
      >
        <article
          className="
            flex
            flex-col
            items-center
            justify-center
            space-y-5
            font-mono
          "
        >
          <h1
            className="
              text-yellow-400
              italic
              font-bold
              text-5xl
            "
          >
            CARD MAKER
          </h1>
          <p
            className="w-3/5 text-center text-gray-500"
          >
            Construa seu site em questão de instantes!
            Precisando de um site de links pessoais ou um currículo para uma nova oportunidade?
            veio ao lugar certo!
          </p>
          <Link href="/join/register">
            <Button
              className="
                bg-green-400
                text-white
                text-center
                flex
                content-center
                hover:bg-green-600
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" />
              </svg>
              <span className="mt-0.5 font-bold">REGISTRE-SE</span>
            </Button>
          </Link>
        </article>
      </section>
    </div>
  )
}
