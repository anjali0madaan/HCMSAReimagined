// Mock data for news articles and events with full content

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  isNew?: boolean;
  author: string;
  readTime: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  content: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  registrationOpen: boolean;
  attendees?: number;
  organizer: string;
  registrationDeadline?: string;
}

export interface Publication {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  publishedDate: string;
  fileSize: string;
  fileFormat: string;
  downloadUrl: string;
  isNew?: boolean;
  isImportant?: boolean;
  department: string;
  referenceNumber?: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "HCMSA Annual General Meeting 2024",
    excerpt: "Join us for our yearly AGM to discuss association matters, elect new board members, and plan future initiatives for Haryana's medical community.",
    content: `
      <h2>Annual General Meeting 2024</h2>
      <p>The Haryana Civil Medical Services Association cordially invites all members to attend the Annual General Meeting 2024. This important gathering will take place on March 15, 2024, at the Haryana Medical Association Hall, Chandigarh.</p>
      
      <h3>Agenda Items:</h3>
      <ul>
        <li>Review of Association's activities and achievements in 2023</li>
        <li>Financial report and budget presentation</li>
        <li>Election of new board members and office bearers</li>
        <li>Discussion on upcoming medical initiatives</li>
        <li>Policy updates and regulatory changes affecting civil medical services</li>
        <li>Member welfare programs and benefits</li>
      </ul>

      <h3>Key Highlights:</h3>
      <p>This year's AGM will feature presentations from senior medical officers about the state's healthcare initiatives and future planning. We will also be discussing the expansion of medical facilities across Haryana and the association's role in supporting healthcare professionals.</p>

      <h3>Registration:</h3>
      <p>All members are required to register in advance. Light refreshments will be provided. The meeting will commence at 10:00 AM sharp and is expected to conclude by 2:00 PM.</p>
    `,
    date: "2024-02-28",
    category: "Meeting",
    isNew: true,
    author: "Dr. Rajesh Kumar, President",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "New Continuing Medical Education (CME) Program Launch",
    excerpt: "Exciting new CME programs are now available for HCMSA members, featuring cutting-edge medical topics and expert speakers from renowned institutions.",
    content: `
      <h2>Continuing Medical Education Program 2024</h2>
      <p>The HCMSA is proud to announce the launch of our comprehensive Continuing Medical Education program for 2024. This initiative aims to keep our medical professionals updated with the latest developments in healthcare and medical practice.</p>
      
      <h3>Program Features:</h3>
      <ul>
        <li>Monthly webinars by leading medical experts</li>
        <li>Hands-on workshops on latest medical technologies</li>
        <li>Case study discussions and peer learning sessions</li>
        <li>Certification credits for professional development</li>
        <li>Access to medical journals and research publications</li>
      </ul>

      <h3>Upcoming Sessions:</h3>
      <p>Our first session will focus on "Advances in Cardiovascular Medicine" scheduled for March 20, 2024. Dr. Priya Sharma from AIIMS Delhi will be the keynote speaker.</p>

      <h3>Registration Process:</h3>
      <p>Members can register online through our portal. The program is free for all active HCMSA members. Non-members can attend at a nominal fee of Rs. 500 per session.</p>
    `,
    date: "2024-02-25",
    category: "Education",
    isNew: true,
    author: "Dr. Meera Singh, CME Coordinator",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Healthcare Policy Updates for 2024",
    excerpt: "Important updates to healthcare policies affecting civil medical services, including new regulations, guidelines, and procedural changes effective this year.",
    content: `
      <h2>Healthcare Policy Updates 2024</h2>
      <p>The Government of Haryana has announced several important policy updates that will affect civil medical services across the state. These changes are designed to improve healthcare delivery and enhance patient care standards.</p>
      
      <h3>Key Policy Changes:</h3>
      <ul>
        <li>Updated guidelines for emergency medical response</li>
        <li>New protocols for telemedicine consultations</li>
        <li>Enhanced patient privacy and data protection measures</li>
        <li>Revised procedures for medical certification</li>
        <li>Updated standards for medical equipment and facilities</li>
      </ul>

      <h3>Implementation Timeline:</h3>
      <p>These policies will be implemented in phases starting April 1, 2024. All medical personnel are required to undergo orientation sessions to understand the new guidelines.</p>

      <h3>Training Programs:</h3>
      <p>HCMSA will conduct training workshops to help members adapt to these policy changes. The sessions will cover practical implementation strategies and best practices.</p>
    `,
    date: "2024-02-20",
    category: "Policy",
    isNew: false,
    author: "Dr. Amit Verma, Policy Advisor",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Medical Equipment Modernization Initiative",
    excerpt: "HCMSA partners with the state government to upgrade medical equipment across all civil hospitals, ensuring better patient care and modern treatment facilities.",
    content: `
      <h2>Medical Equipment Modernization Initiative</h2>
      <p>In a landmark partnership with the Haryana State Government, HCMSA is spearheading a major initiative to modernize medical equipment across all civil hospitals in the state.</p>
      
      <h3>Project Scope:</h3>
      <ul>
        <li>Upgrade of diagnostic equipment in 50+ hospitals</li>
        <li>Installation of modern surgical instruments</li>
        <li>Implementation of digital health record systems</li>
        <li>Training staff on new equipment operations</li>
        <li>Maintenance and support infrastructure development</li>
      </ul>

      <h3>Expected Benefits:</h3>
      <p>This initiative will significantly improve diagnostic accuracy, reduce treatment time, and enhance overall patient satisfaction. The modernization is expected to benefit over 2 million patients annually.</p>

      <h3>Timeline and Budget:</h3>
      <p>The project has been allocated a budget of Rs. 150 crores and is scheduled for completion by December 2024. Equipment installation will begin in major district hospitals first.</p>
    `,
    date: "2024-02-15",
    category: "Infrastructure",
    isNew: false,
    author: "Dr. Sunita Rao, Infrastructure Head",
    readTime: "7 min read"
  }
];

export const events: Event[] = [
  {
    id: 1,
    title: "Annual Medical Conference 2024",
    description: "Three-day conference featuring latest medical research, technology demonstrations, and networking opportunities with healthcare professionals from across India.",
    content: `
      <h2>Annual Medical Conference 2024</h2>
      <p>Join us for the most anticipated medical event of the year! The HCMSA Annual Medical Conference 2024 brings together leading healthcare professionals, researchers, and innovators from across India.</p>
      
      <h3>Conference Highlights:</h3>
      <ul>
        <li>Keynote speeches by renowned medical experts</li>
        <li>Live surgical demonstrations using latest technology</li>
        <li>Research paper presentations and poster sessions</li>
        <li>Medical device exhibitions and product launches</li>
        <li>Networking sessions and cultural programs</li>
        <li>CME credits and certification opportunities</li>
      </ul>

      <h3>Day-wise Schedule:</h3>
      <h4>Day 1: Cardiology and Emergency Medicine</h4>
      <p>Sessions on latest cardiovascular treatments and emergency care protocols</p>
      
      <h4>Day 2: Surgery and Technology</h4>
      <p>Focus on minimally invasive surgical techniques and medical technology innovations</p>
      
      <h4>Day 3: Public Health and Community Medicine</h4>
      <p>Discussions on preventive healthcare and community health initiatives</p>

      <h3>Registration Details:</h3>
      <p>Early bird registration: Rs. 2,500 for members, Rs. 3,500 for non-members. Includes conference materials, meals, and accommodation (if required).</p>
    `,
    date: "2024-04-15",
    time: "9:00 AM - 6:00 PM",
    venue: "Hotel Taj, Chandigarh",
    category: "Conference",
    registrationOpen: true,
    attendees: 245,
    organizer: "HCMSA Conference Committee",
    registrationDeadline: "2024-04-01"
  },
  {
    id: 2,
    title: "CPR & Life Support Training Workshop",
    description: "Intensive hands-on training in cardiopulmonary resuscitation and basic life support techniques. Certification provided upon completion.",
    content: `
      <h2>CPR & Life Support Training Workshop</h2>
      <p>Master life-saving skills with our comprehensive CPR and Basic Life Support training workshop. This hands-on program is designed for healthcare professionals and medical students.</p>
      
      <h3>Workshop Modules:</h3>
      <ul>
        <li>Adult, child, and infant CPR techniques</li>
        <li>Automated External Defibrillator (AED) operation</li>
        <li>Airway management and rescue breathing</li>
        <li>Recognition of cardiac arrest scenarios</li>
        <li>Team-based resuscitation protocols</li>
        <li>Post-cardiac arrest care basics</li>
      </ul>

      <h3>Certification:</h3>
      <p>Participants will receive American Heart Association (AHA) certified Basic Life Support (BLS) cards valid for 2 years. Recertification training will also be available.</p>

      <h3>Requirements:</h3>
      <p>Comfortable clothing and closed-toe shoes required for practical sessions. All training materials and equipment will be provided. Light refreshments included.</p>

      <h3>Instructor Details:</h3>
      <p>Training conducted by AHA certified instructors with extensive emergency medicine experience from leading hospitals in Delhi and Chandigarh.</p>
    `,
    date: "2024-03-25",
    time: "10:00 AM - 4:00 PM",
    venue: "PGIMER Training Center, Chandigarh",
    category: "Training",
    registrationOpen: true,
    attendees: 42,
    organizer: "Dr. Rakesh Gupta, Emergency Medicine",
    registrationDeadline: "2024-03-20"
  },
  {
    id: 3,
    title: "Health Policy & Administration Forum",
    description: "Interactive forum discussing healthcare policy reforms, administrative challenges, and strategic planning for improving medical services in Haryana.",
    content: `
      <h2>Health Policy & Administration Forum</h2>
      <p>An exclusive forum for senior medical administrators and policy makers to discuss the future of healthcare delivery in Haryana state.</p>
      
      <h3>Discussion Topics:</h3>
      <ul>
        <li>Healthcare budget allocation and optimization</li>
        <li>Rural healthcare delivery challenges</li>
        <li>Digital health initiatives and implementation</li>
        <li>Quality assurance in government hospitals</li>
        <li>Human resource management in healthcare</li>
        <li>Public-private partnership opportunities</li>
      </ul>

      <h3>Panel Discussions:</h3>
      <p>Interactive panel discussions featuring Health Secretary, Haryana, Director General of Health Services, and senior medical superintendents from major hospitals.</p>

      <h3>Outcomes Expected:</h3>
      <p>Policy recommendations, action plans for healthcare improvement, and formation of working groups for specific initiatives.</p>

      <h3>Participation:</h3>
      <p>By invitation only for senior medical officers (Grade I and above), medical superintendents, and healthcare administrators. Limited to 50 participants.</p>
    `,
    date: "2024-04-08",
    time: "2:00 PM - 6:00 PM",
    venue: "Haryana Civil Secretariat, Chandigarh",
    category: "Policy",
    registrationOpen: false,
    attendees: 35,
    organizer: "Dr. Vandana Sharma, Health Policy Division"
  },
  {
    id: 4,
    title: "Medical Students Career Guidance Session",
    description: "Comprehensive career guidance for medical students including information about civil services, specialization opportunities, and career planning.",
    content: `
      <h2>Medical Students Career Guidance Session</h2>
      <p>A comprehensive session designed to guide medical students about various career opportunities in civil medical services and government healthcare sector.</p>
      
      <h3>Session Agenda:</h3>
      <ul>
        <li>Overview of Haryana Civil Medical Services</li>
        <li>Career progression and growth opportunities</li>
        <li>Specialization options and requirements</li>
        <li>Examination patterns and preparation strategies</li>
        <li>Interview with successful medical officers</li>
        <li>Q&A session with current practitioners</li>
      </ul>

      <h3>Guest Speakers:</h3>
      <p>Senior medical officers, specialists, and recent recruits will share their experiences and provide practical advice about building a successful career in civil medical services.</p>

      <h3>Interactive Elements:</h3>
      <p>Mock interview sessions, case study discussions, and one-on-one counseling opportunities with experienced medical professionals.</p>

      <h3>Target Audience:</h3>
      <p>Final year MBBS students, medical interns, and junior residents interested in pursuing careers in government healthcare sector.</p>
    `,
    date: "2024-03-30",
    time: "11:00 AM - 3:00 PM",
    venue: "Government Medical College, Rohtak",
    category: "Career",
    registrationOpen: true,
    attendees: 78,
    organizer: "Dr. Pooja Malik, Career Counselor"
  }
];

export const publications: Publication[] = [
  {
    id: 1,
    title: "Government Resolution - Revised Service Conditions for Civil Medical Officers",
    description: "Updated service conditions, promotion criteria, and benefits structure for civil medical officers in Haryana effective from January 2024.",
    content: `
      <h2>Government Resolution No. HMS-2024/CR/001</h2>
      <p><strong>Subject:</strong> Revised Service Conditions for Civil Medical Officers - Implementation Guidelines</p>
      
      <h3>Key Updates:</h3>
      <ul>
        <li><strong>Promotion Criteria:</strong> Revised time-bound promotion structure with clear eligibility requirements</li>
        <li><strong>Pay Structure:</strong> Implementation of 7th Pay Commission recommendations with medical allowances</li>
        <li><strong>Transfer Policy:</strong> Updated transfer guidelines with preference for family stations</li>
        <li><strong>Leave Benefits:</strong> Enhanced medical leave provisions and study leave opportunities</li>
      </ul>

      <h3>Implementation Details:</h3>
      <p>All civil medical officers are required to review the updated service conditions and submit acknowledgment through the online portal by March 31, 2024.</p>

      <h3>Contact Information:</h3>
      <p>For clarifications, contact the Directorate of Health Services at <strong>0172-2864200</strong> or email <strong>dhs.haryana@gov.in</strong></p>
      
      <h3>Effective Date:</h3>
      <p>These revised conditions are effective from January 1, 2024, and supersede all previous notifications.</p>
    `,
    category: "Government Resolution",
    publishedDate: "2024-01-15",
    fileSize: "2.4 MB",
    fileFormat: "PDF",
    downloadUrl: "/downloads/govt-resolution-service-conditions-2024.pdf",
    isNew: true,
    isImportant: true,
    department: "Directorate of Health Services",
    referenceNumber: "HMS-2024/CR/001"
  },
  {
    id: 2,
    title: "Clinical Guidelines for Emergency Medical Response in Rural Areas",
    description: "Comprehensive clinical guidelines for emergency medical response protocols specifically designed for rural healthcare settings in Haryana.",
    content: `
      <h2>Clinical Guidelines for Emergency Medical Response</h2>
      <p><strong>Document Version:</strong> 3.0 | <strong>Effective Date:</strong> February 2024</p>
      
      <h3>Overview:</h3>
      <p>These guidelines provide standardized protocols for emergency medical response in rural healthcare facilities across Haryana, ensuring consistent quality care delivery.</p>

      <h3>Key Protocols Covered:</h3>
      <ul>
        <li>Cardiac emergency response and stabilization procedures</li>
        <li>Trauma management protocols for road accidents</li>
        <li>Maternal emergency care guidelines</li>
        <li>Pediatric emergency response procedures</li>
        <li>Poison management and antidote administration</li>
        <li>Inter-facility transfer protocols</li>
      </ul>

      <h3>Equipment and Resource Requirements:</h3>
      <p>Detailed inventory of essential equipment and medications required for effective emergency response in resource-limited settings.</p>

      <h3>Training Requirements:</h3>
      <p>All medical officers working in rural areas must complete the associated training program within 6 months of appointment.</p>

      <h3>Quality Assurance:</h3>
      <p>Regular audits will be conducted to ensure compliance with these guidelines. Feedback and suggestions for improvement are welcomed.</p>
    `,
    category: "Clinical Guidelines",
    publishedDate: "2024-02-10",
    fileSize: "8.7 MB",
    fileFormat: "PDF",
    downloadUrl: "/downloads/emergency-response-guidelines-2024.pdf",
    isNew: true,
    isImportant: false,
    department: "Emergency Medical Services Division",
    referenceNumber: "EMS/CG/2024/02"
  },
  {
    id: 3,
    title: "Medical Leave Application Form (Revised 2024)",
    description: "Updated medical leave application form with new categories and approval workflow for all civil medical officers.",
    content: `
      <h2>Medical Leave Application Form - Revised 2024</h2>
      <p><strong>Form Number:</strong> ML-2024/Rev.01 | <strong>Effective Date:</strong> January 1, 2024</p>
      
      <h3>New Features in Revised Form:</h3>
      <ul>
        <li>Digital submission capability through online portal</li>
        <li>Enhanced leave categories including mental health leave</li>
        <li>Simplified approval workflow with reduced processing time</li>
        <li>Integration with attendance management system</li>
        <li>Medical certificate upload functionality</li>
      </ul>

      <h3>Leave Categories Available:</h3>
      <ul>
        <li><strong>Medical Leave:</strong> For personal medical treatment (up to 180 days per year)</li>
        <li><strong>Attendant Leave:</strong> For caring for family members (up to 30 days per year)</li>
        <li><strong>Maternity/Paternity Leave:</strong> As per government guidelines</li>
        <li><strong>Mental Health Leave:</strong> For stress-related conditions (up to 21 days per year)</li>
        <li><strong>Emergency Medical Leave:</strong> For urgent medical situations</li>
      </ul>

      <h3>Required Documents:</h3>
      <ul>
        <li>Medical certificate from registered medical practitioner</li>
        <li>Previous leave records (if applicable)</li>
        <li>Supporting documents for emergency cases</li>
      </ul>

      <h3>Processing Timeline:</h3>
      <p>Normal applications: 3-5 working days | Emergency applications: 24-48 hours</p>

      <h3>How to Submit:</h3>
      <ol>
        <li>Fill the form completely with all required information</li>
        <li>Attach necessary medical documents</li>
        <li>Submit through HCMSA portal or to immediate supervisor</li>
        <li>Track status through online dashboard</li>
      </ol>
    `,
    category: "Forms",
    publishedDate: "2024-01-01",
    fileSize: "890 KB",
    fileFormat: "PDF",
    downloadUrl: "/downloads/medical-leave-form-2024.pdf",
    isNew: false,
    isImportant: false,
    department: "Human Resources Division",
    referenceNumber: "HR/ML/2024/001"
  },
  {
    id: 4,
    title: "Annual Health Report 2023 - Haryana Civil Medical Services",
    description: "Comprehensive annual report highlighting achievements, statistics, and future plans for civil medical services in Haryana.",
    content: `
      <h2>Annual Health Report 2023</h2>
      <p><strong>Haryana Civil Medical Services</strong></p>
      <p><strong>Publication Date:</strong> January 2024 | <strong>Reporting Period:</strong> January - December 2023</p>
      
      <h3>Executive Summary:</h3>
      <p>The year 2023 marked significant progress in healthcare delivery across Haryana, with notable improvements in maternal health, child immunization, and emergency medical services.</p>

      <h3>Key Achievements:</h3>
      <ul>
        <li><strong>Patient Care:</strong> Served over 12.5 million patients across all civil hospitals</li>
        <li><strong>Emergency Services:</strong> 98.5% response rate for critical emergency cases</li>
        <li><strong>Maternal Health:</strong> Reduced maternal mortality rate by 18% compared to 2022</li>
        <li><strong>Child Health:</strong> Achieved 95% immunization coverage across rural areas</li>
        <li><strong>Infrastructure:</strong> Upgraded medical equipment in 85 facilities</li>
      </ul>

      <h3>Statistical Highlights:</h3>
      <ul>
        <li>Total surgeries performed: 245,000</li>
        <li>Outpatient consultations: 8.2 million</li>
        <li>Diagnostic tests conducted: 3.8 million</li>
        <li>Health camps organized: 1,250</li>
        <li>Medical officers trained: 850</li>
      </ul>

      <h3>Future Initiatives for 2024:</h3>
      <ul>
        <li>Telemedicine expansion to remote areas</li>
        <li>AI-powered diagnostic support systems</li>
        <li>Enhanced mental health services</li>
        <li>Preventive healthcare programs</li>
        <li>Medical education and research initiatives</li>
      </ul>

      <h3>Financial Overview:</h3>
      <p>Budget allocation for 2023: Rs. 2,850 crores | Utilization rate: 97.3%</p>

      <h3>Acknowledgments:</h3>
      <p>We thank all civil medical officers, healthcare staff, and support personnel for their dedication and service to the people of Haryana.</p>
    `,
    category: "Annual Reports",
    publishedDate: "2024-01-25",
    fileSize: "15.2 MB",
    fileFormat: "PDF",
    downloadUrl: "/downloads/annual-health-report-2023.pdf",
    isNew: true,
    isImportant: false,
    department: "Directorate of Health Services",
    referenceNumber: "DHS/AR/2023"
  },
  {
    id: 5,
    title: "COVID-19 Protocol Updates - Post-Pandemic Guidelines",
    description: "Updated COVID-19 management protocols and post-pandemic healthcare delivery guidelines for civil medical services.",
    content: `
      <h2>COVID-19 Protocol Updates</h2>
      <p><strong>Post-Pandemic Healthcare Delivery Guidelines</strong></p>
      <p><strong>Version:</strong> 5.0 | <strong>Effective Date:</strong> March 2024</p>
      
      <h3>Current Status Assessment:</h3>
      <p>With COVID-19 transitioning to endemic status, these guidelines provide updated protocols for ongoing management and preparedness.</p>

      <h3>Updated Treatment Protocols:</h3>
      <ul>
        <li>Revised isolation and quarantine guidelines</li>
        <li>Updated medication protocols for different severity levels</li>
        <li>Enhanced home care management guidelines</li>
        <li>Modified hospital admission criteria</li>
        <li>Long COVID management and rehabilitation protocols</li>
      </ul>

      <h3>Preventive Measures:</h3>
      <ul>
        <li>Vaccination schedules for different age groups</li>
        <li>High-risk population monitoring</li>
        <li>Workplace safety protocols for healthcare settings</li>
        <li>Community awareness and education programs</li>
      </ul>

      <h3>Emergency Preparedness:</h3>
      <ul>
        <li>Early warning systems for variant detection</li>
        <li>Surge capacity planning for healthcare facilities</li>
        <li>Supply chain management for essential medications</li>
        <li>Staff deployment and training protocols</li>
      </ul>

      <h3>Data Management:</h3>
      <p>Continued surveillance and reporting requirements for tracking disease trends and informing policy decisions.</p>

      <h3>Inter-facility Coordination:</h3>
      <p>Enhanced coordination protocols between primary, secondary, and tertiary care facilities for optimal patient management.</p>
    `,
    category: "Health Protocols",
    publishedDate: "2024-03-05",
    fileSize: "3.6 MB",
    fileFormat: "PDF",
    downloadUrl: "/downloads/covid-protocols-2024.pdf",
    isNew: true,
    isImportant: true,
    department: "Epidemiology Division",
    referenceNumber: "EPI/COVID/2024/03"
  },
  {
    id: 6,
    title: "Transfer and Posting Guidelines - Civil Medical Officers 2024",
    description: "Comprehensive guidelines for transfer and posting procedures, preferences, and policies for civil medical officers.",
    content: `
      <h2>Transfer and Posting Guidelines 2024</h2>
      <p><strong>Civil Medical Officers - Haryana</strong></p>
      <p><strong>Effective Date:</strong> April 1, 2024 | <strong>Version:</strong> 2.0</p>
      
      <h3>General Principles:</h3>
      <ul>
        <li>Merit-based postings with transparent selection criteria</li>
        <li>Preference for family welfare and hardship considerations</li>
        <li>Balanced distribution across urban and rural areas</li>
        <li>Specialty-based assignments for specialized positions</li>
      </ul>

      <h3>Transfer Categories:</h3>
      <ul>
        <li><strong>Routine Transfer:</strong> Normal administrative transfers</li>
        <li><strong>Compassionate Transfer:</strong> On grounds of family hardship</li>
        <li><strong>Administrative Transfer:</strong> For administrative reasons</li>
        <li><strong>Mutual Transfer:</strong> Exchange between two officers</li>
        <li><strong>Promotional Transfer:</strong> Upon promotion to higher positions</li>
      </ul>

      <h3>Application Process:</h3>
      <ol>
        <li>Submit online application through HCMSA portal</li>
        <li>Attach required supporting documents</li>
        <li>Obtain clearance from current posting station</li>
        <li>Await processing and approval</li>
        <li>Report to new posting within stipulated time</li>
      </ol>

      <h3>Timeline and Processing:</h3>
      <ul>
        <li>Application deadline: Last working day of each quarter</li>
        <li>Processing time: 30-45 working days</li>
        <li>Emergency cases: Expedited processing available</li>
      </ul>

      <h3>Required Documents:</h3>
      <ul>
        <li>Transfer application form</li>
        <li>Service record and performance reports</li>
        <li>Medical fitness certificate</li>
        <li>No objection certificate from current station</li>
        <li>Supporting documents for specific transfer grounds</li>
      </ul>

      <h3>Appeals Process:</h3>
      <p>Officers can appeal transfer decisions through the designated appellate authority within 30 days of notification.</p>
    `,
    category: "Administrative Guidelines",
    publishedDate: "2024-03-20",
    fileSize: "4.1 MB",
    fileFormat: "PDF",
    downloadUrl: "/downloads/transfer-posting-guidelines-2024.pdf",
    isNew: false,
    isImportant: true,
    department: "Administrative Services",
    referenceNumber: "AS/TP/2024/001"
  }
];

// Helper functions to get individual items
export const getNewsById = (id: number): NewsArticle | undefined => {
  return newsArticles.find(article => article.id === id);
};

export const getEventById = (id: number): Event | undefined => {
  return events.find(event => event.id === id);
};

export const getPublicationById = (id: number): Publication | undefined => {
  return publications.find(publication => publication.id === id);
};