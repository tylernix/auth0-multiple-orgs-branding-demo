import Head from 'next/head'
import { useUser } from '@auth0/nextjs-auth0';
import LinkCard from '../components/link-card';
import Header from '../components/header';
import Footer from '../components/footer';

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (error) return <div>{error.message}</div>;

  let logInCard;
  if (isLoading) {
    logInCard = <LinkCard title="Loading..." />
  }
  else if (user) {
    logInCard = <LinkCard url="/api/auth/logout" title="Log Out" description={'Thanks ' + user.email + ' for visiting! Hope to see you again.'} />
  } else {
    logInCard = <LinkCard url="/api/auth/login" title="Log In" description="Get the most out of your favorite moon by logging in!" />
  }
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <Head>
        <title>Welcome to the Moon</title>
        <link rel="icon" href="/moon-favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col w-full items-center justify-center flex-1 px-20 text-center bg-moon-landscape bg-cover">
        <div className="bg-gray-300 bg-opacity-80 p-6 px-20 rounded-xl flex flex-col items-center">
          {/* <img src="/img/moon-logo.png" className="w-32 h-32"></img> */}
          <h1 className="text-6xl font-bold">
            Welcome to the{' '}
            <span className="text-yellow-200">
              Moon!
            </span>
          </h1>

          <p className="mt-3 text-2xl">
            We are about{' '}
            <code className="p-2 font-mono text-lg border-2 border-yellow-200 rounded-md">
              239,000 miles
            </code>
            {' '}from earth.
          </p>
          <p className="mt-3 text-2xl">
          Hope to see you soon.
          </p>
        </div>
        

        <div className="flex flex-wrap items-center justify-around max-w-3xl mt-6 sm:w-full">
          <LinkCard url="/about" title="About Us" description="Learn about all the amazing things your moon has to offer." />
          { logInCard }
        </div>
      </main>

      <Footer />
    </div>
  )
}
