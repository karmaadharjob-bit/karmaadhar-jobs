'use strict';

/**
 * Seed job listings used the first time the application boots
 * (or whenever the data store is empty).
 */
function daysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

module.exports = function seedJobs() {
  return [
    {
      id: 1,
      title: 'Senior Frontend Engineer',
      company: 'Karmaadhar Technologies',
      companySize: '120 employees',
      location: 'Bengaluru, Karnataka',
      workMode: 'Hybrid',
      category: 'Technology',
      type: 'Full-time',
      experience: '4–7 years',
      salaryMin: 1800000,
      salaryMax: 2800000,
      salaryPeriod: 'year',
      currency: 'INR',
      description:
        'We are looking for a Senior Frontend Engineer to lead the build-out of our customer-facing dashboards. You will work closely with design and product to ship accessible, fast interfaces used by thousands of small businesses every day.',
      responsibilities: [
        'Own the frontend architecture of our web application',
        'Partner with designers to turn prototypes into production UI',
        'Improve performance, accessibility and test coverage',
        'Mentor two junior engineers through code review and pairing'
      ],
      requirements: [
        '4+ years building production web applications',
        'Deep knowledge of JavaScript/TypeScript and modern frameworks',
        'Experience with automated testing and CI pipelines',
        'Strong written communication skills'
      ],
      skills: ['React', 'TypeScript', 'CSS', 'Accessibility', 'Testing'],
      postedAt: daysAgo(1),
      contactEmail: 'careers@karmaadhar.example',
      status: 'published'
    },
    {
      id: 2,
      title: 'Operations Associate',
      company: 'Nirmaan Logistics',
      companySize: '500 employees',
      location: 'Pune, Maharashtra',
      workMode: 'On-site',
      category: 'Logistics',
      type: 'Full-time',
      experience: '1–3 years',
      salaryMin: 420000,
      salaryMax: 600000,
      salaryPeriod: 'year',
      currency: 'INR',
      description:
        'Coordinate daily dispatch operations for our West India network. You will be the point of contact for drivers, warehouse teams and customers, making sure shipments move on time and exceptions are resolved quickly.',
      responsibilities: [
        'Plan and monitor daily dispatch schedules',
        'Resolve delivery exceptions with warehouse and transport teams',
        'Track service levels and prepare weekly reports',
        'Maintain accurate records in our operations system'
      ],
      requirements: [
        '1–3 years in operations, logistics or supply chain',
        'Comfort with spreadsheets and operations software',
        'Calm problem solving under time pressure',
        'Marathi and English communication'
      ],
      skills: ['Operations', 'Excel', 'Customer Service', 'Reporting'],
      postedAt: daysAgo(2),
      contactEmail: 'jobs@nirmaanlogistics.example',
      status: 'published'
    },
    {
      id: 3,
      title: 'Digital Marketing Manager',
      company: 'Blue Banyan Studio',
      companySize: '40 employees',
      location: 'Remote (India)',
      workMode: 'Remote',
      category: 'Marketing',
      type: 'Full-time',
      experience: '3–5 years',
      salaryMin: 900000,
      salaryMax: 1400000,
      salaryPeriod: 'year',
      currency: 'INR',
      description:
        'Own paid and organic growth for a portfolio of D2C brands. You will plan campaigns, manage budgets, write sharp briefs and report on what actually drives revenue.',
      responsibilities: [
        'Run paid campaigns across Meta and Google',
        'Own email and lifecycle marketing programmes',
        'Manage agency and freelancer relationships',
        'Report on CAC, ROAS and channel performance'
      ],
      requirements: [
        '3+ years in performance or growth marketing',
        'Hands-on experience with ad platforms and analytics',
        'Comfortable writing copy and creative briefs',
        'Available for full-time remote work from India'
      ],
      skills: ['Paid Ads', 'SEO', 'Analytics', 'Email Marketing'],
      postedAt: daysAgo(3),
      contactEmail: 'talent@bluebanyan.example',
      status: 'published'
    },
    {
      id: 4,
      title: 'Staff Nurse (ICU)',
      company: 'Aashray Multispeciality Hospital',
      companySize: '300 employees',
      location: 'Hyderabad, Telangana',
      workMode: 'On-site',
      category: 'Healthcare',
      type: 'Full-time',
      experience: '2–6 years',
      salaryMin: 360000,
      salaryMax: 540000,
      salaryPeriod: 'year',
      currency: 'INR',
      description:
        'Join our 24-bed intensive care unit. You will provide direct patient care, monitor vitals and support families during some of their hardest days.',
      responsibilities: [
        'Monitor patients and escalate changes in condition',
        'Administer medication as prescribed',
        'Maintain clinical records and handovers',
        'Support patient families with clear information'
      ],
      requirements: [
        'GNM or B.Sc Nursing with valid registration',
        '2+ years of ICU or critical care experience',
        'BLS certification (ACLS preferred)',
        'Willingness to work rotational shifts'
      ],
      skills: ['Critical Care', 'Patient Care', 'BLS', 'Documentation'],
      postedAt: daysAgo(4),
      contactEmail: 'hr@aashrayhospital.example',
      status: 'published'
    },
    {
      id: 5,
      title: 'Data Analyst',
      company: 'Karmaadhar Technologies',
      companySize: '120 employees',
      location: 'Bengaluru, Karnataka',
      workMode: 'Hybrid',
      category: 'Technology',
      type: 'Full-time',
      experience: '2–4 years',
      salaryMin: 1000000,
      salaryMax: 1600000,
      salaryPeriod: 'year',
      currency: 'INR',
      description:
        'Turn product and hiring data into decisions. You will build dashboards, run analyses and partner with business teams who need answers more than reports.',
      responsibilities: [
        'Build and maintain dashboards used daily by teams',
        'Design and analyse experiments',
        'Partner with product and operations stakeholders',
        'Improve the reliability of our reporting pipeline'
      ],
      requirements: [
        'Strong SQL and spreadsheet skills',
        'Experience with a BI tool (Metabase, Looker, Power BI)',
        'Working knowledge of Python or R',
        'Ability to explain findings to non-technical colleagues'
      ],
      skills: ['SQL', 'Python', 'Power BI', 'Statistics'],
      postedAt: daysAgo(5),
      contactEmail: 'careers@karmaadhar.example',
      status: 'published'
    },
    {
      id: 6,
      title: 'Graphic Designer (Contract)',
      company: 'Blue Banyan Studio',
      companySize: '40 employees',
      location: 'Mumbai, Maharashtra',
      workMode: 'Hybrid',
      category: 'Design',
      type: 'Contract',
      experience: '1–4 years',
      salaryMin: 60000,
      salaryMax: 90000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Six-month contract with a strong chance of extension. You will design social campaigns, packaging artwork and brand collateral for D2C clients.',
      responsibilities: [
        'Produce campaign creatives for social and print',
        'Adapt brand systems across formats',
        'Work with copywriters and account managers',
        'Prepare production-ready files for vendors'
      ],
      requirements: [
        'Strong portfolio of brand or campaign work',
        'Fluency in Figma and the Adobe Creative Suite',
        'Attention to typography and layout detail',
        'Ability to handle quick turnarounds'
      ],
      skills: ['Figma', 'Illustrator', 'Photoshop', 'Branding'],
      postedAt: daysAgo(6),
      contactEmail: 'design@bluebanyan.example',
      status: 'published'
    },
    {
      id: 7,
      title: 'Accounts Executive',
      company: 'Sampada Finance',
      companySize: '75 employees',
      location: 'Jaipur, Rajasthan',
      workMode: 'On-site',
      category: 'Finance',
      type: 'Full-time',
      experience: '2–5 years',
      salaryMin: 380000,
      salaryMax: 520000,
      salaryPeriod: 'year',
      currency: 'INR',
      description:
        'Support day-to-day accounting for a growing NBFC. You will handle bookkeeping, reconciliations and statutory filings alongside our senior accountant.',
      responsibilities: [
        'Record and reconcile daily transactions in Tally',
        'Assist with GST returns and TDS filings',
        'Prepare monthly MIS reports',
        'Coordinate with auditors during reviews'
      ],
      requirements: [
        'B.Com with 2+ years of accounting experience',
        'Working knowledge of Tally and GST compliance',
        'Careful, accurate and detail oriented',
        'Hindi and English communication'
      ],
      skills: ['Tally', 'GST', 'Reconciliation', 'MIS'],
      postedAt: daysAgo(7),
      contactEmail: 'accounts@sampadafinance.example',
      status: 'published'
    },
    {
      id: 8,
      title: 'Software Engineering Intern',
      company: 'Karmaadhar Technologies',
      companySize: '120 employees',
      location: 'Remote (India)',
      workMode: 'Remote',
      category: 'Technology',
      type: 'Internship',
      experience: 'Fresher',
      salaryMin: 30000,
      salaryMax: 40000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'A six-month paid internship for final-year students and recent graduates. You will ship real features with a mentor, review code weekly and learn how a product team works.',
      responsibilities: [
        'Build features from scoped tickets with mentor support',
        'Write tests for the code you ship',
        'Join sprint planning, reviews and retrospectives',
        'Share a short demo at the end of each month'
      ],
      requirements: [
        'Final-year student or graduate in a technical field',
        'Comfort with JavaScript or Python fundamentals',
        'A small project or repository you can walk us through',
        'Curiosity and willingness to ask questions'
      ],
      skills: ['JavaScript', 'Git', 'Problem Solving'],
      postedAt: daysAgo(8),
      contactEmail: 'interns@karmaadhar.example',
      status: 'published'
    },
    {
      id: 9,
      title: 'Customer Support Specialist',
      company: 'Nirmaan Logistics',
      companySize: '500 employees',
      location: 'Pune, Maharashtra',
      workMode: 'Hybrid',
      category: 'Customer Support',
      type: 'Part-time',
      experience: '0–2 years',
      salaryMin: 22000,
      salaryMax: 30000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Help customers track shipments and resolve issues over chat and phone. The role is part-time with flexible shifts, ideal alongside studies.',
      responsibilities: [
        'Answer customer queries across chat, email and phone',
        'Raise and follow up on internal tickets',
        'Keep help-centre articles accurate',
        'Flag recurring issues to the operations team'
      ],
      requirements: [
        'Clear spoken and written English',
        'Comfort with support tools and CRM software',
        'Patience and a calm tone under pressure',
        'Available for 5-hour shifts, 5 days a week'
      ],
      skills: ['Customer Support', 'CRM', 'Communication'],
      postedAt: daysAgo(9),
      contactEmail: 'jobs@nirmaanlogistics.example',
      status: 'published'
    },
    {
      id: 10,
      title: 'Mathematics Teacher (Secondary)',
      company: 'Vidya Bharati Public School',
      companySize: '90 employees',
      location: 'Lucknow, Uttar Pradesh',
      workMode: 'On-site',
      category: 'Education',
      type: 'Full-time',
      experience: '2–8 years',
      salaryMin: 350000,
      salaryMax: 520000,
      salaryPeriod: 'year',
      currency: 'INR',
      description:
        'Teach mathematics to classes 8 to 10 in a CBSE school with a strong academic record. You will plan lessons, assess learning and support students who need extra help.',
      responsibilities: [
        'Plan and deliver mathematics lessons for classes 8–10',
        'Design assessments and give timely feedback',
        'Run remedial sessions for struggling students',
        'Participate in parent-teacher meetings'
      ],
      requirements: [
        'B.Ed with a mathematics specialisation',
        '2+ years of CBSE classroom teaching',
        'Strong Hindi and English communication',
        'Comfort with digital classroom tools'
      ],
      skills: ['Teaching', 'Curriculum Design', 'Assessment'],
      postedAt: daysAgo(10),
      contactEmail: 'principal@vidyabharati.example',
      status: 'published'
    },
    {
      id: 11,
      title: 'Field Sales Executive',
      company: 'Sampada Finance',
      companySize: '75 employees',
      location: 'Jaipur, Rajasthan',
      workMode: 'On-site',
      category: 'Sales',
      type: 'Full-time',
      experience: '1–4 years',
      salaryMin: 300000,
      salaryMax: 480000,
      salaryPeriod: 'year',
      currency: 'INR',
      description:
        'Grow our loan portfolio across Jaipur district. You will meet small business owners, explain products clearly and build a referral network over time.',
      responsibilities: [
        'Generate leads through field visits and referrals',
        'Explain loan products and collect documentation',
        'Meet monthly disbursement targets',
        'Maintain CRM records for every visit'
      ],
      requirements: [
        '1+ years in field sales, preferably financial services',
        'Two-wheeler and valid driving licence',
        'Fluent Hindi; basic English',
        'Comfort with a target-driven role'
      ],
      skills: ['Sales', 'Negotiation', 'CRM', 'Field Work'],
      postedAt: daysAgo(11),
      contactEmail: 'accounts@sampadafinance.example',
      status: 'published'
    },
    {
      id: 12,
      title: 'HR Generalist',
      company: 'Aashray Multispeciality Hospital',
      companySize: '300 employees',
      location: 'Hyderabad, Telangana',
      workMode: 'On-site',
      category: 'Human Resources',
      type: 'Full-time',
      experience: '3–6 years',
      salaryMin: 550000,
      salaryMax: 800000,
      salaryPeriod: 'year',
      currency: 'INR',
      description:
        'Own the day-to-day people operations for clinical and support staff: hiring coordination, onboarding, attendance and employee queries.',
      responsibilities: [
        'Coordinate hiring for nursing and support roles',
        'Run onboarding and documentation for new joiners',
        'Manage attendance, leave and payroll inputs',
        'Handle employee queries and grievances'
      ],
      requirements: [
        'MBA or PG diploma in HR with 3+ years experience',
        'Working knowledge of labour compliance',
        'Experience with an HRMS or payroll system',
        'Discretion with confidential information'
      ],
      skills: ['Recruitment', 'Onboarding', 'Payroll', 'Compliance'],
      postedAt: daysAgo(12),
      contactEmail: 'hr@aashrayhospital.example',
      status: 'published'
    }
  ];
};
