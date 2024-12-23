import {
  ALargeSmall,
  Bookmark,
  Briefcase,
  Gauge,
  GraduationCap,
  HandshakeIcon,
  Home,
  HomeIcon,
  Library,
  NotebookPen,
  Package,
  Settings,
  University,
  User,
  Users,
} from 'lucide-react'

export const studentMenus = [
  { title: 'My Profile', to: '/students/profile', icon: <User size={20} /> },
  {
    title: 'My Application',
    to: '/students/application',
    icon: <Package size={20} />,
  },
  {
    title: 'Documents',
    to: '/students/documents',
    icon: <NotebookPen size={20} />,
  },
  {
    title: 'My Accomodation',
    to: '/students/accomodations',
    icon: <Home size={20} />,
  },
  {
    title: 'Settings',
    to: '/students/settings',
    icon: <Settings size={20} />,
  },
]

export const agentMenus = [
  {
    title: 'Dashboard (계기반)',
    to: '/agent/dashboard',
    icon: <Gauge size={20} />,
  },
  {
    title: 'My Listings (내 목록)',
    to: '/agent/listings',
    icon: <HomeIcon size={20} />,
  },
  {
    title: 'Settings (설정)',
    to: '/agent/settings',
    icon: <Settings size={20} />,
  },
]

export const instutionMenus = [
  {
    title: 'Dashboard',
    to: '/instutions/dashboard',
    icon: <Gauge size={20} />,
  },
  {
    title: 'University Profile',
    to: '/instutions/profile',
    icon: <University size={20} />,
  },
  {
    title: 'Students',
    to: '/instutions/students',
    icon: <Users size={20} />,
  },
  {
    title: 'Offered Courses',
    to: '/instutions/courses',
    icon: <GraduationCap size={20} />,
  },
  {
    title: 'Settings',
    to: '/instutions/settings',
    icon: <GraduationCap size={20} />,
  },
]

export const adminMenus = [
  {
    title: 'Dashboard',
    to: '/admin/dashboard',
    icon: <Gauge size={20} />,
  },
  {
    title: 'Instutions',
    to: '/admin/instutions',
    icon: <University size={20} />,
  },
  {
    title: 'Accomodations',
    to: '/admin/bookings',
    icon: <Bookmark size={20} />,
  },
  {
    title: 'Students',
    to: '/admin/students',
    icon: <Users size={20} />,
  },
  {
    title: 'Partners',
    to: '/admin/partners',
    icon: <HandshakeIcon size={20} />,
  },
  {
    title: 'Agents',
    to: '/admin/agents',
    icon: <Home size={20} />,
  },
  {
    title: 'Vacancy',
    to: '/admin/vacancy',
    icon: <Briefcase size={20} />,
  },
  {
    title: 'Blogs',
    to: '/admin/blogs',
    icon: <ALargeSmall size={20} />,
  },
  {
    title: 'Settings',
    to: '/admin/settings',
    icon: <Settings size={20} />,
  },
]
