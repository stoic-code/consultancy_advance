import {
  School,
  GraduationCap,
  UserRoundCog,
  Building,
  Handshake,
} from 'lucide-react'

export const menus = [
  { title: 'Home', to: '/' },
  { title: 'For Students', to: '/for-students' },
  { title: 'For Partners', to: '/for-partners' },
  { title: 'For Institutions', to: '/for-instutions' },
  // { title: 'Who We Are', to: '/who-we-are' },
  { title: 'Blogs', to: '/blogs' },
  { title: 'Career', to: '/careers' },
]
export const studentsMenu = [
  { id: 1, title: 'Benifits', to: '/for-students' },
  { id: 2, title: 'Register', to: '?student-registration=open' },
  { id: 3, title: 'Browse Courses', to: '/for-students/courses' },
  { id: 3, title: 'Accomodations', to: '/for-students/accomodations' },
  {
    id: 4,
    title: 'Universities we offer',
    to: '/for-students#for-students-university',
  },
  { id: 5, title: 'FAQs', to: '/for-students/#for-students-faq' },
]

export const partnersMenu = [
  { id: 11, title: 'Benifits', to: '/for-partners' },
  { id: 12, title: 'Become a Partner', to: '/register/partner' },
]

export const instutionsMenu = [
  { id: 12, title: 'Benifits', to: '/for-instutions/' },
]

export const registerTypes = [
  {
    id: 21,
    title: 'As Partner',
    icon: <Handshake strokeWidth={1.5} size={50} />,
    href: '/register/partner',
  },
  {
    id: 22,
    title: 'As Student',
    icon: <GraduationCap size={50} strokeWidth={1.5} />,
    href: '?student-registration=open',
  },
]

export const loginTypes = [
  {
    id: 20,
    title: 'As Institution',
    icon: <School size={50} strokeWidth={1.5} />,
    href: '?login=instution',
  },
  {
    id: 22,
    title: 'As Student',
    icon: <GraduationCap size={50} strokeWidth={1.5} />,
    href: '?login=student',
  },
  {
    id: 23,
    title: 'As Real Estate (부동산)',
    icon: <Building size={50} strokeWidth={1.5} />,
    href: '?login=agent',
  },
  {
    id: 21,
    title: 'As Admin',
    icon: <UserRoundCog size={50} strokeWidth={1.5} />,
    href: '?login=admin',
  },
]
