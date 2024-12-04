import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface ShimmerProps {
  className?: string;
}

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
}

interface ResourceCardProps extends FeatureCardProps {
  icon: string;
}

const Shimmer: React.FC<ShimmerProps> = ({ className = '' }) => (
  <div className={`absolute inset-0 overflow-hidden ${className}`}>
    <div className="shimmer-effect" />
  </div>
);

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, href }) => (
  <Link href={href}>
    <a className="block">
      <Card className="relative p-8 text-center bg-navy-800/30 backdrop-blur border border-gold/20 
                       transition-all duration-300 hover:scale-105 hover:bg-navy-700/40 cursor-pointer 
                       overflow-hidden group">
        <Shimmer />
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-4 text-gold">{title}</h3>
          <p className="text-gray-200">{description}</p>
        </div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                        bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 
                        transition-opacity duration-1000" />
      </Card>
    </a>
  </Link>
);

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, href, icon }) => (
  <Link href={href}>
    <a className="block">
      <Card className="relative p-6 bg-navy-800/30 backdrop-blur border border-gold/20 
                       transition-all duration-300 hover:scale-105 hover:bg-navy-700/40 
                       cursor-pointer overflow-hidden group">
        <Shimmer />
        <div className="relative z-10">
          <div className="text-3xl mb-4 text-gold">{icon}</div>
          <h3 className="text-xl font-bold mb-2 text-gold">{title}</h3>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                        bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 
                        transition-opacity duration-1000" />
      </Card>
    </a>
  </Link>
);

const LandingPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-navy-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_20%,_#000B2E_80%)]" />
        <div className="stars" />
        <div className="twinkling" />
      </div>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to <span className="text-gold animate-pulse">SCOUT</span> Career Guide
          </h1>
          <p className="text-xl mb-12 text-gray-300">Your journey to career success begins here</p>

          {/* SCOUT Letters Container */}
          <div className="glass-card p-12 max-w-4xl mx-auto bg-navy-800/30 backdrop-blur 
                          border border-gold/20 relative overflow-hidden">
            <Shimmer />
            <div className="flex justify-center space-x-4 text-4xl font-bold text-gold">
              <span className="hover:animate-bounce">S</span>
              <span className="hover:animate-bounce">C</span>
              <span className="hover:animate-bounce">O</span>
              <span className="hover:animate-bounce">U</span>
              <span className="hover:animate-bounce">T</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Career Guidance"
              description="Expert guidance to help you navigate your career path"
              href="/career-guidance"
            />
            <FeatureCard 
              title="Personalized Insights"
              description="Tailored recommendations based on your unique profile"
              href="/insights"
            />
            <FeatureCard 
              title="Clear Roadmap"
              description="Step-by-step guidance to achieve your career goals"
              href="/roadmap"
            />
          </div>
        </div>
      </section>

      {/* Educational Resources Section */}
      <section id="resources" className="py-20 px-6 relative">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gold">Educational Resources</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <ResourceCard 
              title="Online Courses"
              description="Access premium learning materials and courses"
              href="/courses"
              icon="🎓"
            />
            <ResourceCard 
              title="Career Workshops"
              description="Interactive sessions with industry experts"
              href="/workshops"
              icon="👥"
            />
            <ResourceCard 
              title="Skills Assessment"
              description="Evaluate and improve your professional skills"
              href="/assessment"
              icon="📊"
            />
            <ResourceCard 
              title="Industry Insights"
              description="Stay updated with latest trends and demands"
              href="/insights"
              icon="💡"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative">
        <div className="container mx-auto">
          <Card className="p-8 max-w-2xl mx-auto bg-navy-800/30 backdrop-blur border border-gold/20 relative overflow-hidden">
            <Shimmer />
            <h2 className="text-3xl font-bold mb-6 text-center text-gold">Need Help?</h2>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name"
                  className="w-full p-3 rounded bg-navy-700/50 border border-gold/20 
  focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <input 
                  type="email" 
                  placeholder="Your Email"
                  className="w-full p-3 rounded bg-navy-700/50 border border-gold/20 
    focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <textarea 
                  placeholder="Your Message"
                  className="w-full p-3 rounded bg-navy-700/50 border border-gold/20 
                        focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold h-32"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-gold text-navy-900 py-3 rounded font-bold 
                        hover:bg-gold/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
