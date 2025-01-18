import React from 'react'
import Hero from "./components/Hero.jsx";

const App = () => {
    return (
        <main className="relative min-h-screen overflow-x-hidden w-screen">
            <Hero/>

            <section className="z-0 min-h-screen bg-blue-500"/>
        </main>
    )
}
export default App
