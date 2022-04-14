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
    logInCard = <LinkCard url="/api/auth/login" title="Log In" description="Get the most out of our planet by logging in!" />
  }
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <Head>
        <title>Welcome to Mars</title>
        <link rel="icon" href="/mars-favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col w-full items-center justify-center flex-1 px-20 text-center bg-mars-landscape bg-cover">
        <div className="bg-gray-100 bg-opacity-70 p-6 px-24 rounded-xl flex flex-col items-center">
          {/* <img src="/img/mars-logo.png" className="w-32 h-32"></img> */}
          <h1 className="text-6xl font-bold">
            Welcome to{' '}
            <span className="text-blue-600">
              Mars!
            </span>
          </h1>

          <p className="mt-3 text-2xl">
            We are about{' '}
            <code className="p-2 font-mono text-lg border-2 border-blue-600 rounded-md">
              140 million miles
            </code>
            {' '}from earth.
          </p>
          <p className="mt-3 text-2xl">
          Come visit us soon.
          </p>
        </div>
        

        <div className="flex flex-wrap items-center justify-around max-w-3xl mt-6 sm:w-full">
          <LinkCard url="/about" title="About Us" description="Learn about all the amazing things our planet has to offer." />
          { logInCard }
        </div>
      </main>

      <Footer />
    </div>
  )
}
