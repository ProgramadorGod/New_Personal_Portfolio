import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import CaseStudies from "./components/CaseStudies";
import TechStack from "./components/TechStack";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <div className="glow-line" />
      <Philosophy />
      <div className="glow-line" />
      <CaseStudies />
      <div className="glow-line" />
      <TechStack />
      <Footer />
    </div>
  );
}

export default App;
