import Container from './container'

export default function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
        className="flex items-center justify-center"
        href="https://auth0.com"
        target="_blank"
        rel="noopener noreferrer"
        >
        <img src="/powered-by-auth0--black.png" alt="Auth0 Logo" className="h-8" />
        </a>
    </footer>
  )
}
