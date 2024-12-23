export const tongmyong = {
  evaluation_criteria: [
    { id: 1, title: 'Language Proficiency' },
    { id: 2, title: 'School Records' },
    { id: 3, title: 'Other related evidence document.' },
  ],

  selection_process: {
    bullet: [
      { id: 4, title: 'Score of Evaluations' },
      { id: 5, title: 'School Records' },
      { id: 6, title: 'Other related evidence document.' },
    ],
    table: [
      {
        event: 'Application submission',
        first_round: '2024.05.01 - 2024.06.07',
        second_round: '2024.07.02 - 2024.07.12',
      },

      {
        event: 'Screening',
        first_round: '2024.06.11 - 2024.06.21',
        second_round: '2024.07.02 - 2024.07.12',
      },

      {
        event: 'Admission result notification',
        first_round: '2024.06.28',
        second_round: '2024.07.23',
      },

      {
        event: 'Registration for admitted students',
        first_round: '2024.06.28 - 2024.07.10',
        second_round: '2024.07.23 - 2024.07.31',
      },

      {
        event: 'Semester starts',
        first_round: '2024.09.02',
        second_round: '2024.09.02',
      },
    ],
  },

  essential_documents: [
    { id: 10, title: 'Application Form: Including personal statement' },
    { id: 11, title: 'Passport Copy' },
    {
      id: 12,
      title: 'Color Photographs: 3 copies, passport size, white background',
    },
    { id: 13, title: 'ROK Alien Registration Card Copy: If applicable' },
  ],
  nationality_document: [
    {
      id: 14,
      title:
        "Parents' ID Card or Passport Copy: Notarized in English if not in English",
    },
    {
      id: 15,
      title:
        'Family Relations Certificate: Notarized in English if not in English',
    },
  ],
  language_document:
    'Language Test Result: (TOPIK, IELTS, TOEFL, TEPS) valid until after the semester opening date',
  educational_background: {
    internal: [
      {
        id: 0,
        title:
          'Certificate of High School Graduation: Notarized for academic certification',
      },
      {
        id: 1,
        title:
          'Transcript of High School: Notarized in English if not in English',
      },
    ],
    transfer: [
      {
        id: 0,
        title:
          'Certificate of High School Graduation: Notarized for academic certification',
      },
      {
        id: 1,
        title:
          'Transcript of High School: Notarized in English if not in English',
      },
    ],
  },
  financial_document: {
    documents: [{ id: 2, title: 'Certificate of Bank Balance Copy' }],
    overseas: [
      {
        id: 2,
        title:
          'Bank Balance Certificate: Copy of applicant or financial guarantor with a balance of USD 12,000 or more, issued within 30 days of visa application date.',
      },
    ],
    additional_overseas: [
      {
        id: 3,
        title:
          'Proof of Employment: Certificate of career of applicant or financial guarantor (including company name, tenure, and position)',
      },
      {
        id: 4,
        title: 'Proof of Income: Notarized in English if not in English',
      },
    ],
  },

  courses: [
    { faculty: 'Dept. of Global Business', fee: 'KRW 2,817,600' },
    { faculty: 'Dept. of Computer Engineering', fee: 'KRW 3,869,000' },
    { faculty: 'Dept. of Mechatronics Engineering', fee: 'KRW 3,869,000' },
    {
      faculty: 'Dept. of Information System and Security',
      fee: 'KRW 3,869,000',
    },
  ],

  scholarships: [
    {
      type: 'International Students Scholarship A',
      selection:
        'Scholarship ATOPIK level 6, TOEFL 620, iBT 105, IELTS 8.0, TEPS 800 or above',
      rate: '50%',
    },
    {
      type: 'International Students Scholarship B',
      selection:
        'TOPIK level 5, TOEFL 580, iBT 90, IELTS 7.0, TEPS 700 or above',
      rate: '40%',
    },
    {
      type: 'International Students Scholarship C',
      selection:
        'TOPIK level 4, TOEFL 560, iBT 85, IELTS 6.0, TEPS 650 or above',
      rate: '30%',
    },
    {
      type: 'International Students Scholarship D',
      selection:
        'TOPIK level 3, TOEFL 550, iBT 80, IELTS 5.5, TEPS 600 or above',
      rate: '20%',
    },
  ],
  additional: [
    'Application Fee: KRW 50,000 (included in the tuition invoice)',
    'Dormitory Fee: KRW 1,900,000 (can be included in tuition invoice if preferred)',
    'Immigration Registering Fee: KRW 30,000',
  ],
}

export const Kyungsung = {
  evaluation_criteria: [
    { id: 1, title: 'Language Proficiency' },
    { id: 2, title: 'School Records' },
    { id: 3, title: 'Other related evidence document.' },
  ],

  selection_process: {
    bullet: [
      { id: 4, title: 'Score of Evaluations' },
      { id: 5, title: 'School Records' },
      { id: 6, title: 'Other related evidence document.' },
    ],
    table: [
      {
        event: 'Application submission',
        first_round: '19th Feb, 2024 - 18th March 2024',
        second_round: '15th April 2024 - 10th May 2024',
      },

      {
        event: 'Interview',
        first_round: '2nd April 2024 - 26th April 2024',
        second_round: '3rd June 2024 - 7th June 2024',
      },

      {
        event: 'Final Selection for Admission',
        first_round: '3rd May 2024',
        second_round: '14th June 2024',
      },

      {
        event: 'Semester starts',
        first_round: '2nd Sept 2024',
        second_round: '2nd Sept 2024',
      },
    ],
  },

  essential_documents: [
    { id: 10, title: 'Application Form: Including personal statement' },
    { id: 11, title: 'Passport Copy' },
    {
      id: 12,
      title: 'Color Photographs: 3 copies, passport size, white background',
    },
    { id: 13, title: 'ROK Alien Registration Card Copy: If applicable' },
  ],
  nationality_document: [
    {
      id: 14,
      title:
        "Parents' ID Card or Passport Copy: Notarized in English if not in English",
    },
    {
      id: 15,
      title:
        'Family Relations Certificate: Notarized in English if not in English',
    },
  ],
  language_document:
    'Language Test Result: (TOPIK, IELTS, TOEFL, TEPS) valid until after the semester opening date',
  educational_background: {
    internal: [
      {
        id: 0,
        title:
          'Certificate of High School Graduation: Notarized for academic certification',
      },
      {
        id: 1,
        title:
          'Transcript of High School: Notarized in English if not in English',
      },
    ],
    transfer: [
      {
        id: 0,
        title:
          'Certificate of High School Graduation: Notarized for academic certification',
      },
      {
        id: 1,
        title:
          'Transcript of High School: Notarized in English if not in English',
      },
    ],
  },
  financial_document: {
    documents: [{ id: 2, title: 'Certificate of Bank Balance Copy' }],
    overseas: [
      {
        id: 2,
        title:
          'Bank Balance Certificate: Copy of applicant or financial guarantor with a balance of USD 12,000 or more, issued within 30 days of visa application date.',
      },
    ],
    additional_overseas: [
      {
        id: 3,
        title:
          'Proof of Employment: Certificate of career of applicant or financial guarantor (including company name, tenure, and position)',
      },
      {
        id: 4,
        title: 'Proof of Income: Notarized in English if not in English',
      },
    ],
  },

  courses: [
    { faculty: 'Global Hospital Management', fee: 'KRW 3,111,000' },
    { faculty: 'GLobal Business Administration', fee: 'KRW 3,111,000' },
    { faculty: 'Global IT Engineering', fee: 'KRW 4,151,000' },
    {
      faculty: 'Global Mechanical Design Engineering',
      fee: 'KRW 4,151,000',
    },
  ],

  scholarships: [
    {
      type: 'Category A',
      selection:
        'TOEFL IBT 104/IELTS 7.5 or higherScholarship ATOPIK level 6, TOEFL 620, iBT 105, IELTS 8.0, TEPS 800 or above',
      rate: '50%',
    },
    {
      type: 'Category B',
      selection: 'TOEFL IBT 95 or IELTS 7.0',
      rate: '40%',
    },
    {
      type: 'Category C',
      selection: 'TOEFL IBT 71 IELTS 5.5 or higher',
      rate: '30%',
    },
  ],
  additional: [
    'Application Fee: KRW 40,000 (included in the tuition invoice)',
    'Dormitory Fee: KRW 1,900,000 (can be included in tuition invoice if preferred)',
    'Immigration Registering Fee: KRW 30,000',
  ],
}

export const dongEUI = {
  evaluation_criteria: [
    { id: 1, title: 'Language Proficiency' },
    { id: 2, title: 'School Records' },
    { id: 3, title: 'Other related evidence document.' },
  ],

  selection_process: {
    bullet: [
      { id: 4, title: 'Score of Evaluations' },
      { id: 5, title: 'School Records' },
      { id: 6, title: 'Other related evidence document.' },
    ],
    table: [
      {
        event: 'Application open and document submission',
        first_round: '15 Apr, 2024 - 29th Apr, 2024',
        second_round: '03, Jun 2024 - 29th, Jun 2024',
      },

      {
        event: 'Interview Session 1st round',
        first_round: '8th May, 2024 - 14th May 2024',
        second_round: '1st Jul 2024 - 05th Jul 2024',
      },

      {
        event: 'Notification of Admission Result',
        first_round: '22nd May 2024( can be changed)',
        second_round: '17th Jul 2024',
      },

      {
        event: 'Payment of Tuition Fees',
        first_round: '27th, of May - 5th, June 2024',
        second_round: '18th, Jul 2024 - 19th Jul 2024',
      },

      {
        event: 'Semester starts',
        first_round: '2nd September 2024',
        second_round: '2nd September 2024',
      },
    ],
  },

  essential_documents: [
    { id: 10, title: 'Application Form: Including personal statement' },
    { id: 11, title: 'Passport Copy' },
    {
      id: 12,
      title: 'Color Photographs: 3 copies, passport size, white background',
    },
    { id: 13, title: 'ROK Alien Registration Card Copy: If applicable' },
  ],
  nationality_document: [
    {
      id: 14,
      title:
        "Parents' ID Card or Passport Copy: Notarized in English if not in English",
    },
    {
      id: 15,
      title:
        'Family Relations Certificate: Notarized in English if not in English',
    },
  ],
  language_document:
    'Language Test Result: (TOPIK, IELTS, TOEFL, TEPS) valid until after the semester opening date',
  educational_background: {
    internal: [
      {
        id: 0,
        title:
          'Certificate of High School Graduation: Notarized for academic certification',
      },
      {
        id: 1,
        title:
          'Transcript of High School: Notarized in English if not in English',
      },
    ],
    transfer: [
      {
        id: 0,
        title:
          'Certificate of High School Graduation: Notarized for academic certification',
      },
      {
        id: 1,
        title:
          'Transcript of High School: Notarized in English if not in English',
      },
    ],
  },
  financial_document: {
    documents: [{ id: 2, title: 'Certificate of Bank Balance Copy' }],
    overseas: [
      {
        id: 2,
        title:
          'Bank Balance Certificate: Copy of applicant or financial guarantor with a balance of USD 12,000 or more, issued within 30 days of visa application date.',
      },
    ],
    additional_overseas: [
      {
        id: 3,
        title:
          'Proof of Employment: Certificate of career of applicant or financial guarantor (including company name, tenure, and position)',
      },
      {
        id: 4,
        title: 'Proof of Income: Notarized in English if not in English',
      },
    ],
  },

  courses: [
    { faculty: 'Global hospitalityt Management', fee: 'KRW 2,978,500' },
    { faculty: 'International Tourism', fee: 'KRW 2,978,500' },
    { faculty: 'Hotel and convention', fee: 'KRW 2,978,500' },
    { faculty: 'Restaurants food service management', fee: 'KRW 2,978,500' },
    { faculty: 'Global Business Administration', fee: 'KRW 2,978,500' },
    { faculty: 'Computer software engineering', fee: 'KRW 4,043,000' },
    { faculty: 'Intelligent Computing', fee: 'KRW 4,043,000' },
  ],

  scholarships: [
    {
      type: 'Category A',
      selection: 'TOEFL 81/IELTS 6.5 or higher',
      rate: '100%',
    },
    {
      type: 'Category B',
      selection: 'TOEFL 76 /IELTS 6.0',
      rate: '50%',
    },
  ],
  additional: [
    'Application Fee: KRW 50,000 (included in the tuition invoice)',
    'Dormitory Fee: KRW 1,900,000 (can be included in tuition invoice if preferred)',
    'Immigration Registering Fee: KRW 30,000',
  ],
}
