export enum Tags {
  All = '',
  StudyAbroad = 'study-abroad',
  CollegeAdmissions = 'college-admissions',
  CareerCounseling = 'career-counseling',
  TestPreparation = 'tests',
  Scholarships = 'scholarship',
  Technology = 'technology',
  Fitness = 'fitness',
}

// Create an array of key-value pairs from the enum
export const tags: { key: string; value: string }[] = Object.keys(Tags).map(
  (key) => ({ key, value: Tags[key as keyof typeof Tags] }),
)
