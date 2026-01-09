import React, { useState, useEffect } from 'react';
import { Shield, Mail, Heart, Cpu, Lock, Check, User, EyeOff } from './components/Icons';
import { Button } from './components/Common';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 border border-primary/20 text-primary">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const CountdownUnit = ({ value, label }: { value: number, label: string }) => (
  <div className="text-center">
    <div className="text-4xl md:text-5xl font-bold text-white tabular-nums">{String(value).padStart(2, '0')}</div>
    <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">{label}</div>
  </div>
);

export default function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const calculateTimeLeft = () => {
    const launchDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
    const difference = +launchDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft as {days: number, hours: number, minutes: number, seconds: number};
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
    // In a real app, you would send the email to your backend here.
    console.log(`Email submitted: ${email}`);
  };

  return (
    <div className="min-h-screen bg-dark text-white font-sans overflow-x-hidden">
      <div className="absolute inset-0 bg-grid-slate-700/[0.05] bg-[bottom_1px_center] [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>
      <div className="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(50%_50%_at_50%_50%,white,transparent)]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-dark"></div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center p-4 md:p-8">
        <header className="py-6">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            connect<span className="text-primary font-extrabold">4</span>vibe
          </h1>
        </header>

        <section className="text-center max-w-4xl mx-auto mt-10 md:mt-20">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            Authentic Connections Are <span className="text-primary">Coming Soon</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            Get ready for a new wave of social discovery. We're building a platform where genuine personalities and shared vibes create lasting connections.
          </p>

          <div className="flex justify-center gap-4 md:gap-8 my-12 animate-in fade-in duration-500 delay-300">
            <CountdownUnit value={timeLeft.days || 0} label="Days" />
            <CountdownUnit value={timeLeft.hours || 0} label="Hours" />
            <CountdownUnit value={timeLeft.minutes || 0} label="Minutes" />
            <CountdownUnit value={timeLeft.seconds || 0} label="Seconds" />
          </div>

          {!submitted ? (
            <form onSubmit={handleNotify} className="w-full max-w-lg mx-auto flex flex-col sm:flex-row gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500">
              <div className="relative flex-grow w-full">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full h-12 pl-10 pr-4 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  aria-label="Email Address"
                />
              </div>
              <Button type="submit" variant="primary" className="h-12 px-6 text-base shadow-lg shadow-primary/20">
                Notify Me
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 text-lg bg-green-500/10 border border-green-500/20 text-green-300 px-6 py-4 rounded-lg max-w-md mx-auto animate-in fade-in duration-300">
              <Check size={24} />
              <p>Thank you! We'll keep you updated.</p>
            </div>
          )}
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </section>

        <section className="mt-24 md:mt-32 max-w-7xl mx-auto w-full">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white">What to Expect</h3>
            <p className="text-slate-400 mt-2">The next generation of social features.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Cpu size={24} />}
              title="AI-Powered Matching"
              description="Our advanced AI connects you with people you'll actually vibe with based on personality, interests, and communication style."
            />
            <FeatureCard 
              icon={<Shield size={24} />}
              title="Verified Profiles"
              description="Say goodbye to bots and fakes. Every profile is manually verified for authenticity to ensure a safe and trustworthy community."
            />
            <FeatureCard 
              icon={<Lock size={24} />}
              title="Secure & Private Chat"
              description="End-to-end encrypted messaging ensures your conversations stay private, just between you and your connection."
            />
             <FeatureCard 
              icon={<Heart size={24} />}
              title="Deep Profile Insights"
              description="Go beyond pictures. Our profiles highlight personality traits, values, and lifestyle choices for a more holistic view."
            />
            <FeatureCard 
              icon={<User size={24} />}
              title="Curated Community"
              description="Join a community that values depth over quantity. Connect with inspiring individuals who are serious about making real connections."
            />
            <FeatureCard 
              icon={<EyeOff size={24} />}
              title="Advanced Privacy Controls"
              description="You're in control. Manage your visibility, blur photos, and decide who gets to see your profile with our incognito mode."
            />
          </div>
        </section>

        <footer className="text-center py-12 mt-16 text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} connect4vibe. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}