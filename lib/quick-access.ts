export type QuickAccessOrg = {
  abbr: string;
  name: string;
  description: string;
  url: string;
  domain: 'Space' | 'Defence R&D' | 'Armed Forces' | 'Industry';
};

export const quickAccessOrgs: QuickAccessOrg[] = [
  {
    abbr: 'ISRO',
    name: 'Indian Space Research Organisation',
    description: "India's national space agency, responsible for launch vehicles, satellites and interplanetary missions.",
    url: 'https://www.isro.gov.in',
    domain: 'Space'
  },
  {
    abbr: 'DRDO',
    name: 'Defence Research and Development Organisation',
    description: 'Premier agency for design and development of indigenous defence technologies and weapon systems.',
    url: 'https://www.drdo.gov.in',
    domain: 'Defence R&D'
  },
  {
    abbr: 'IAF',
    name: 'Indian Air Force',
    description: "The air arm of India's armed forces, responsible for aerial warfare and air defence of the nation.",
    url: 'https://indianairforce.nic.in',
    domain: 'Armed Forces'
  },
  {
    abbr: 'Indian Army',
    name: 'Indian Army',
    description: "India's principal land warfare force, safeguarding territorial integrity and national security.",
    url: 'https://indianarmy.nic.in',
    domain: 'Armed Forces'
  },
  {
    abbr: 'Indian Navy',
    name: 'Indian Navy',
    description: "The naval branch of India's armed forces, securing maritime borders and blue-water operations.",
    url: 'https://www.indiannavy.nic.in',
    domain: 'Armed Forces'
  },
  {
    abbr: 'IN-SPACe',
    name: 'Indian National Space Promotion and Authorisation Center',
    description: 'Autonomous nodal agency enabling private sector participation in Indian space activities.',
    url: 'https://www.inspace.gov.in',
    domain: 'Space'
  },
  {
    abbr: 'NSIL',
    name: 'NewSpace India Limited',
    description: 'Commercial arm of the Department of Space, transferring space technologies to industry.',
    url: 'https://www.nsilindia.co.in',
    domain: 'Space'
  },
  {
    abbr: 'BEL',
    name: 'Bharat Electronics Limited',
    description: 'Navratna defence public sector undertaking manufacturing radar, communication and electronic warfare systems.',
    url: 'https://www.bel-india.in',
    domain: 'Industry'
  },
  {
    abbr: 'HAL',
    name: 'Hindustan Aeronautics Limited',
    description: 'Leading aerospace manufacturer designing and producing military aircraft, helicopters and avionics.',
    url: 'https://hal-india.co.in',
    domain: 'Industry'
  },
  {
    abbr: 'BARC',
    name: 'Bhabha Atomic Research Centre',
    description: "India's primary nuclear research facility, driving atomic energy and strategic materials research.",
    url: 'https://www.barc.gov.in',
    domain: 'Defence R&D'
  },
  {
    abbr: 'VSSC',
    name: 'Vikram Sarabhai Space Centre',
    description: 'Lead ISRO centre for launch vehicle design, propulsion and rocket technology development.',
    url: 'https://www.vssc.gov.in',
    domain: 'Space'
  },
  {
    abbr: 'LPSC',
    name: 'Liquid Propulsion Systems Centre',
    description: 'ISRO centre specialising in liquid and cryogenic propulsion systems for launch vehicles.',
    url: 'https://www.lpsc.gov.in',
    domain: 'Space'
  },
  {
    abbr: 'SDSC SHAR',
    name: 'Satish Dhawan Space Centre',
    description: "India's primary spaceport at Sriharikota, handling launch vehicle integration and range operations.",
    url: 'https://www.shar.gov.in',
    domain: 'Space'
  },
  {
    abbr: 'URSC',
    name: 'U R Rao Satellite Centre',
    description: 'ISRO centre responsible for design, fabrication and testing of Indian satellites.',
    url: 'https://www.ursc.gov.in',
    domain: 'Space'
  },
  {
    abbr: 'SAC',
    name: 'Space Applications Centre',
    description: 'ISRO centre developing communication, navigation and earth-observation payloads and applications.',
    url: 'https://www.sac.gov.in',
    domain: 'Space'
  }
];
