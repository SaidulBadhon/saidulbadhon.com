import type { Project } from "../types";
import cover from "./cover.webp";
import platform from "./platform.webp";
import bilbaoFirefighters from "./bilbao-firefighters.webp";
import bilbaoRoofs from "./bilbao-roofs.webp";

const project: Project = {
  slug: "cystellar-dashboard",
  title: "CyStellar | Satellite Risk Dashboards, Bilbao Fire Service & Roof AI",
  description:
    "Dashboards for CyStellar's satellite risk platform, an emergency forecasting dashboard for Bilbao's fire service, and AI that maps roof materials across Europe.",
  longDescription:
    "CyStellar is a space-tech company, based in London with an office in Sweden, whose platform, TerraRisk, turns satellite Earth observation, weather forecasts and hazard data into risk insights for insurers, and helps public agencies detect and monitor risks. I joined as a front-end intern from July to December 2022 and worked on three things. The first was CyStellar's internal dashboard, putting geospatial and environmental data on interactive maps and charts. The second was CyStellar's project for the City of Bilbao in Spain, run through REACH, an EU Horizon 2020 incubator. Bilbao City Council, which runs the city's fire brigade, wanted to size and deploy its firefighter teams better, using its history of mobilisations, interventions and emergencies alongside weather alerts, city events and points of interest. CyStellar's answer was a cloud geospatial platform that forecasts whether each type of emergency will rise or fall over the next 15 days, with a dashboard for the fire service's managers. The third was machine learning: training models to classify the roof materials of houses across Europe from satellite imagery. CyStellar's internal tools aren't public, so the platform images here are CyStellar's own, alongside photos of Bilbao.",
  type: "Project I worked on",
  role: "Frontend Developer Intern",
  duration: "Jul 2022 - Dec 2022",
  icon: "globe",
  gradient: "from-indigo-500 to-violet-500",
  tags: [
    "Geospatial",
    "Dashboards",
    "Machine Learning",
    "Public Safety",
    "Insurance",
  ],
  technologies: [
    "React",
    "JavaScript",
    "Mapbox GL",
    "D3.js",
    "REST APIs",
    "Python",
    "Machine learning",
    "Satellite imagery",
  ],
  features: [
    "Front-end work on CyStellar's internal dashboard for TerraRisk, its satellite risk platform",
    "Interactive maps and charts with Mapbox GL and D3.js, layering risk and environmental data over satellite imagery",
    "Work on CyStellar's project for Bilbao City Council, through the EU's REACH incubator, to help size and deploy the city's firefighter teams",
    "Forecasts of whether each type of emergency will rise or fall over the next 15 days, built on Bilbao's history of firefighter mobilisations, interventions and emergencies",
    "Weather alerts, city events and nearby points of interest as context for those forecasts",
    "A decision-making dashboard for the managers of Bilbao's fire service",
    "Machine learning models trained to classify the roof materials of houses across Europe from satellite imagery",
  ],
  links: {
    live: "https://cystellar.com",
  },
  // The first image is the cover. The rest appear in the gallery.
  images: [
    { image: cover, caption: "CyStellar's TerraRisk dashboard: a risk assessment for an address in Spain, with a hazard map and scores for floods, hail, wind and more. Image: CyStellar." },
    { image: platform, caption: "TerraRisk puts satellite imagery next to policy, claim and environmental data. Image: CyStellar." },
    { image: bilbaoFirefighters, caption: "A Bilbao fire brigade boat on the Nervión. Bilbao City Council runs the city's fire brigade, whose teams the forecasting work set out to help size and deploy. Photo: Makoki20, Wikimedia Commons (CC0)." },
    { image: bilbaoRoofs, caption: "The rooftops of Bilbao's old town from above, the kind of view the roof-material models learned to classify. Orthophoto: PNOA, © Instituto Geográfico Nacional (CC BY 4.0)." },
  ],
};

export default project;
