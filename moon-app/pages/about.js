import Head from 'next/head'
import { useUser } from '@auth0/nextjs-auth0';
import Header from '../components/header';
import Footer from '../components/footer';

export default function About() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  
  let content;
  if (user) {
    content = <ul className="text-left mt-3 text-xl list-disc">
                <li>We are about a quarter of the size of Earth, but we still look pretty big from Earth.</li>
                <li>Looking to instantly lose weight? If you weighed 100 lbs on Earth, you will only weigh 38 lbs here on Mars.</li>
                <li>Need more time to get everything done? Come to Mars where our year lasts 687 days.</li>
                <li>While packing for your trip, don't forget oxygen since our atmosphere is made up of 96% carbon dioxide.</li>
              </ul>
  } else {
    content = <p className="mt-3 text-2xl">
                You must be <a href="/api/auth/login" className="text-yellow-200">logged in</a> to see all the amazing things your moon has to offer.
              </p>
  }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
        <Head>
            <title>Facts About The Moon</title>
            <link rel="icon" href="/moon-favicon.ico" />
        </Head>
        <Header />
        <main className="flex flex-col w-full items-center justify-center flex-1 px-20 text-center bg-moon-landscape bg-cover">
            <div className="bg-gray-300 bg-opacity-80 p-6 px-24 rounded-xl flex flex-col">
                <h1 className="text-left text-6xl font-bold">
                    Facts About The Moon
                </h1>
                { content }
            </div>
        </main>

        <Footer />
        </div>

    );
};