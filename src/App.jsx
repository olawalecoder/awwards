import React from 'react'
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Navbar from "./components/Navbar.jsx";
import Features from "./components/Features.jsx";

const App = () => {
    return (
        <main className="relative min-h-screen overflow-x-hidden w-screen">
            <Navbar />
            <Hero />
            <About />
            <Features />
        </main>
    )
}
export default App
