import { fetchHomeData } from "@/api/homeService";
import AboutSection from "@/components/About/AboutSection";
import ContactSection from "@/components/Contact/ContactUs";
import ExecutionProcess from "@/components/ExecutionProcess/page";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects/Projects";
import ServicesSection from "@/components/Serivces/Services";
import { HomeResponse } from "@/types/homeApiTypes";

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {

  const { locale } = await params;
  const homeApiData: HomeResponse = await fetchHomeData(locale);
  const { home, about, statistics, services, sections, projects, contact, social_links } = homeApiData.data;
  return (
    <main>
      <Hero home={home} />
      <AboutSection about={about} statistics={statistics} />
      <ServicesSection services={services}/>
      <ExecutionProcess sections={sections}/>
      <Projects projects={projects}/>
      <ContactSection contact={contact}/>
      <Footer social_links={social_links} services={services} />
    </main>
  );
}
