import React from 'react'
import { AnimatedGridPattern } from "./components/AnimatedGridPattern"
import { ArrowRight, Calendar, FileText, Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0d0221] via-[#261447] to-[#451952] overflow-hidden px-10">
      <AnimatedGridPattern
        width={50}
        height={50}
        numSquares={100}
        maxOpacity={0.5}
        duration={3}
        className="absolute inset-0 z-0"
        gridColor="#1a0836"
        squareColors={["#2e1065", "#3b0764", "#4c0519"]}
      />
      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen text-gray-200 space-y-12">
        <h1 className="text-5xl md:text-7xl font-black text-center mb-6 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c084fc] via-[#d8b4fe] to-[#c084fc] animate-gradient-x silver-text">
            INTELLI<span className="text-[#f0abfc]">MEETS</span>
          </span>
        </h1>
        <p className="text-2xl text-center mb-12 max-w-2xl font-light leading-relaxed silver-text-subtle">
        Boost virtual meeting efficiency with AI-driven organization and smart documentation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-6xl">
          <FeatureCard 
            icon={<Calendar className="w-8 h-8 text-[#f0abfc]" />}
            title="Remote Collaboration"
            description="Collaborate in real-time with seamless video and audio for effortless communication."
          />
          <FeatureCard 
            icon={<FileText className="w-8 h-8 text-[#f0abfc]" />}
            title="AI Documentation"
            description="Generate comprehensive meeting notes using cutting-edge AI technology"
          />
          <FeatureCard 
            icon={<Download className="w-8 h-8 text-[#f0abfc]" />}
            title="Easy Export"
            description="Download well-organized meeting docs in PDF format with one click"
          />
        </div>
        <button onClick={()=>{
          navigate('/meeting')
        }} className="bg-gradient-to-r from-[#4c0519] to-[#3b0764] hover:from-[#3b0764] hover:to-[#4c0519] text-white text-lg font-semibold py-6 px-8 rounded-lg transition-all duration-300 flex items-center">
          GET STARTED <ArrowRight className="ml-2 w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-[#1a0836] bg-opacity-50 rounded-lg p-6 backdrop-blur-sm">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-2xl font-semibold ml-3 silver-text-subtle text-[#d8b4fe]">{title}</h3>
    </div>
    <p className="text-base opacity-90 leading-relaxed silver-text-light text-gray-300">{description}</p>
  </div>
)

export default LandingPage

