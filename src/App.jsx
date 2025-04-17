import * as Sentry from "@sentry/react"
import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
import Navbar from "./components/Navbar"
import Model from "./components/Model.jsx";
import Features from "./components/Features.jsx";
import Chip from "./components/Chip.jsx";
import Footer from "./components/Footer.jsx";


const App = () => {
    return (
    <>
      <main className="bg-black overflow-x-hidden">
        <Navbar />
        <Hero />
        <Highlights />
        <Model />
        <Features />
        <Chip />
        <Footer />
      </main>
    </>
  )
}

export default Sentry.withProfiler(App)
