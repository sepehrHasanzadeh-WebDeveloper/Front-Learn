import AboutDescription from "@/components/About/AboutDescription";
import AboutDeveloperSection from "@/components/About/AboutDeveloperSection";
import AboutHero from "@/components/About/AboutHero";
import AboutStatsSection from "@/components/About/AboutStateSection";
import AboutTechStack from "@/components/About/AboutTechStack";
import { Container } from "react-bootstrap";

export default function About() {
  return (
    <>
      <Container>
        <AboutHero />
        <AboutDescription />
        <div style={{margin:"150px 0"}}>
          <AboutStatsSection />
        </div>
        <div style={{marginTop:"24px"}}>
          <AboutTechStack />
        </div>
        <AboutDeveloperSection />
      </Container>
    </>
  );
}
