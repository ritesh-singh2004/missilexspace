export type GovPortal = {
  abbr: string;
  name: string;
  description: string;
  category: string;
  url: string;
};

export const govDefenceSpacePortals: GovPortal[] = [
  {
    abbr: 'ISRO',
    name: 'Indian Space Research Organisation',
    description: "India's national space agency, responsible for launch vehicles, satellites and interplanetary missions.",
    category: 'Space Agency',
    url: 'https://www.isro.gov.in'
  },
  {
    abbr: 'DRDO',
    name: 'Defence Research and Development Organisation',
    description: 'Premier agency for the design and development of indigenous defence technologies and weapon systems.',
    category: 'Defence R&D',
    url: 'https://www.drdo.gov.in'
  },
  {
    abbr: 'Indian Army',
    name: 'Indian Army',
    description: "India's principal land warfare force, safeguarding territorial integrity and national security.",
    category: 'Armed Forces',
    url: 'https://indianarmy.nic.in'
  },
  {
    abbr: 'IAF',
    name: 'Indian Air Force',
    description: "The air arm of India's armed forces, responsible for aerial warfare and air defence of the nation.",
    category: 'Armed Forces',
    url: 'https://indianairforce.nic.in'
  },
  {
    abbr: 'Indian Navy',
    name: 'Indian Navy',
    description: "The naval branch of India's armed forces, securing maritime borders and blue-water operations.",
    category: 'Armed Forces',
    url: 'https://www.indiannavy.nic.in'
  },
  {
    abbr: 'DOS',
    name: 'Department of Space',
    description: "The nodal government department overseeing India's space programme, policy and affiliated space agencies.",
    category: 'Government Department',
    url: 'https://www.dos.gov.in'
  },
  {
    abbr: 'IN-SPACe',
    name: 'Indian National Space Promotion and Authorisation Center',
    description: 'Autonomous nodal agency enabling and regulating private sector participation in Indian space activities.',
    category: 'Space Regulator',
    url: 'https://www.inspace.gov.in'
  },
  {
    abbr: 'NSIL',
    name: 'NewSpace India Limited',
    description: 'Commercial arm of the Department of Space, transferring space technologies developed by ISRO to industry.',
    category: 'Public Sector Enterprise',
    url: 'https://www.nsilindia.co.in'
  }
];
