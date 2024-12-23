import { GraduationCap, HandCoins, MapPin, University } from 'lucide-react'
import { Kyungsung, dongEUI, tongmyong } from './uni-data'

export const universities = [
  // KYONG UNIVERSITY
  {
    data: tongmyong,
    slug: 'knu',
    website: 'https://kangwon.ac.kr/english/index.do',
    unibg:
      'https://lh3.googleusercontent.com/p/AF1QipOfJPryyZ_XKYDm_iUKqkrUzLkWCIRz4733jqZG=s1360-w1360-h1020',

    image: '/for-students/universities/knu.svg',
    about:
      'Kangwon National University (KNU), established in 1947, evolved into a comprehensive university in 1978 and is a prominent institution in Gangwon-do. It focuses on nurturing global talents and contributing to national and regional advancement. Embracing a blend of traditional values and future-oriented strategies, KNU emphasizes collaboration with the local community and industries to maximize mutual benefits. Through its Open Campus Plan, KNU has enhanced its reputation as a prestigious university with world-class education, research, and industry-academia cooperation. The university also welcomes foreign students, offering high-quality education, diverse majors, ample dormitory space, and a convenient location near Seoul. KNU pledges to support foreign students in achieving their dreams.',
    details: [
      {
        title: 'Location',
        icon: <MapPin size={20} />,
        value: 'Chuncheon, South Korea',
      },

      {
        title: 'Students',
        icon: <GraduationCap size={20} />,
        value: '38,264',
      },

      {
        title: 'Avg Tuition Fees',
        icon: <HandCoins size={20} />,
        value: '2.383 million KRW',
      },

      {
        title: 'Established',
        icon: <University size={20} />,
        value: 'June 14, 1947',
      },
    ],
  },

  // TONGMYONG UNIVERSITY
  {
    data: tongmyong,
    slug: 'tong',
    website: 'https://www.tu.ac.kr/english/index.do',
    image: '/for-students/universities/tong.svg',
    unibg: '/for-students/universities/unibg2.jpg',
    about: `Tongmyung University was established in 1979 by Chairman Kang Seok-jin with a vision to contribute to South Korea&apos;s education ministry by fostering talents that drive industrial growth and societal development. Over the years, the university has played a crucial role in producing skilled individuals vital to South Korea&apos;s economic development.
Through unwavering support and dedicated efforts, Tongmyung University has evolved into a prominent institution in Busan, emphasizing the importance of action (Do-ing) to achieve success. The university&apos;s guiding principles align with values focused on nurturing individuals capable of overcoming challenges and laying foundations for fulfilling lives.
Tongmyung University&apos;s educational mission is to equip international students with life skills and global perspectives, transforming them into dedicated talents contributing to future societal advancements. The university emphasizes innovative and differentiated educational approaches tailored to meet industry demands, building on the legacy of Tongmyong Wood, a leading company in Korea&apos;s industrialization.`,
    details: [
      {
        title: 'Location',
        icon: <MapPin size={20} />,
        value: 'Busan, South Korea',
      },

      {
        title: 'Students',
        icon: <GraduationCap size={20} />,
        value: '9,140',
      },

      {
        title: 'Avg Tuition Fees',
        icon: <HandCoins size={20} />,
        value: '6,686,600 KRW',
      },

      {
        title: 'Established',
        icon: <University size={20} />,
        value: 'April ,1977 ',
      },
    ],
  },

  // DONG EUI UNIVERSITY
  {
    data: dongEUI,
    slug: 'dong',
    website: 'https://eng.deu.ac.kr/eng',
    image: '/for-students/universities/dong.svg',
    unibg: '/for-students/universities/unibg3.jpg',

    about: `Established in 1966 by Dr. Kim Im-Sik, the Dong-Eui Educational Incorporation (DEI) was founded with a mission to promote national prosperity through education. Over the years, DEI has played a pivotal role in talent development through institutions like Dong-Eui University, Dong-Eui Institute of Technology, and Dong-Eui Technical High School. The addition of Dong-Eui Medical Center underscores DEI's commitment to community service. Dong-Eui University, with 38 years of experience in higher education, is now a global education hub with 18,000 students. The university focuses on equipping students with the competency and competitiveness required in today's competitive world. Upholding the founding spirit of "Dong-Eui-Ji-Chun," Dong-Eui University emphasizes academic training and personality cultivation to nurture future leaders capable of thriving in dynamic domestic and international environments. Students are encouraged to cultivate creative thinking and courage to tackle new challenges, with the university standing ready to support their dreams and aspirations for a brighter future.`,
    details: [
      {
        title: 'Location',
        icon: <MapPin size={20} />,
        value: 'Eomgwangno, Busan',
      },

      {
        title: 'Students',
        icon: <GraduationCap size={20} />,
        value: '18,000',
      },

      {
        title: 'Avg Tuition Fees',
        icon: <HandCoins size={20} />,
        value: '11,760,000 KRW',
      },

      {
        title: 'Established',
        icon: <University size={20} />,
        value: '1966',
      },
    ],
  },

  // KYONG SUNG UNIVERSITY
  {
    data: Kyungsung,
    slug: 'kyun',
    image: '/for-students/universities/kyun.svg',
    unibg: '/for-students/universities/unibg4.jpg',
    website: 'https://kscms.ks.ac.kr/eng/Main.do',
    about:
      "Kyungsung University, established in 1955 and located in Busan, South Korea, is a leading private institution known for its diverse academic programs and commitment to academic excellence. With a student population of around 13,000, the university offers undergraduate and graduate programs spanning liberal arts, social sciences, natural sciences, engineering, business administration, and more. Kyungsung University prioritizes practical education, global perspectives, and research innovation to prepare students for successful careers and contributions to society. The university's modern campus facilities and active community engagement reflect its dedication to fostering a vibrant learning environment and promoting civic responsibility.",
    details: [
      {
        title: 'Location',
        icon: <MapPin size={20} />,
        value: 'Nam-gu, Busan, South Korea',
      },

      {
        title: 'Students',
        icon: <GraduationCap size={20} />,
        value: '13,000',
      },

      {
        title: 'Avg Tuition Fees',
        icon: <HandCoins size={20} />,
        value: ' 6,578,400 KRW',
      },

      {
        title: 'Established',
        icon: <University size={20} />,
        value: '1955',
      },
    ],
  },
]
