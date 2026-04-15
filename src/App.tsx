import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import CaseStudies from "./components/CaseStudies";
import TechStack from "./components/TechStack";
import Footer from "./components/Footer";
import AboutMe from "./components/AboutMe";
import { ContactForm } from "./components/ContactForm";



function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <div className="glow-line" />
      {/* <Philosophy /> */}
      <AboutMe></AboutMe>
      <div className="glow-line" />
      <CaseStudies />
      <div className="glow-line" />
      <TechStack />
      <div className="glow-line"/>
      <ContactForm/>

      <Footer />
    </div>
  );
}

export default App;
