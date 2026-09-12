export type Tender = {
  id: string;
  title: string;
  category: string;
  closingDate: string;
  status: 'Open' | 'Closed' | 'Awarded';
};

export const tenders: Tender[] = [
  {
    id: 'MX/T/2026/014',
    title: 'Supply and installation of GPU compute nodes for the simulation research lab',
    category: 'Equipment',
    closingDate: '15 Sep 2026',
    status: 'Open'
  },
  {
    id: 'MX/T/2026/015',
    title: 'Annual maintenance contract for the subsonic wind-tunnel test rig',
    category: 'Services',
    closingDate: '30 Sep 2026',
    status: 'Open'
  },
  {
    id: 'MX/T/2026/013',
    title: 'Design and print production for the annual research report',
    category: 'Professional Services',
    closingDate: '05 Sep 2026',
    status: 'Open'
  },
  {
    id: 'MX/T/2026/011',
    title: 'Cloud storage expansion for the research data archive',
    category: 'IT Services',
    closingDate: '20 Jul 2026',
    status: 'Closed'
  },
  {
    id: 'MX/T/2026/009',
    title: 'Structural safety audit of Research Lab Block B',
    category: 'Consultancy',
    closingDate: '10 Jun 2026',
    status: 'Awarded'
  }
];
