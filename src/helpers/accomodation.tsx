import { Amenities } from '@/constants/accomodation'
import { FaPeopleRoof } from 'react-icons/fa6'
import { HiUserGroup } from 'react-icons/hi2'
import { BiCloset } from 'react-icons/bi'
import { MdOutlineTableRestaurant } from 'react-icons/md'
import { GiVacuumCleaner } from 'react-icons/gi'
import { FaPeopleGroup } from 'react-icons/fa6'
import { GrServices } from 'react-icons/gr'
import { BiLandscape } from 'react-icons/bi'
import { LuFlower2 } from 'react-icons/lu'
import { LuSofa } from 'react-icons/lu'
import { FaBed } from 'react-icons/fa'
import { BiSolidCarGarage } from 'react-icons/bi'
import { GiMirrorMirror } from 'react-icons/gi'
import {
  Bed,
  Bath,
  Cctv,
  Tv2,
  Landmark,
  Sofa,
  Microwave,
  AirVent,
  WashingMachine,
  BookOpen, // for student area
  Gauge, // For high speed inteernet
  Dumbbell,
  Waves, // For swimming pool
  Car, // For parking space
  Wrench, // For maintainence
  Printer, // For printing facility
  LampDesk, //for desk and chair & lamp
  SquareLibrary, // bookself
  Blinds, //Curtains
  Archive, // storage
  HandPlatter, // Dining area
  Flame, // fireplace
  Trophy,
  CookingPot,
  Podcast,
  Gamepad2,
  Bike,
  LampFloor,
  Utensils,
  Refrigerator,
  LockKeyhole,
  Recycle,
  Cat,
  ShowerHead,
  Heater, // for outdoor sports
} from 'lucide-react'

export const generateIcons = (a: Amenities) => {
  switch (a) {
    case Amenities.TV:
      return <Tv2 size={16} className="text-blue-500" />
    case Amenities.BED_WITH_MATTRESS:
      return <Bed size={16} className="text-green-500" />
    case Amenities.EN_SUITE_BATHROOM:
      return <Bath size={16} className="text-purple-500" />
    case Amenities.SECURITY:
      return <Cctv size={16} className="text-red-500" />
    case Amenities.SOFA:
      return <Sofa size={16} className="text-yellow-500" />
    case Amenities.MICROWAVE:
      return <Microwave size={16} className="text-orange-500" />
    case Amenities.AIR_CONDITIONER:
      return <AirVent size={16} className="text-indigo-500" />
    case Amenities.LAUNDRY_ROOM:
      return <WashingMachine size={16} className="text-teal-500" />
    case Amenities.BOOKSHELF:
      return <SquareLibrary size={16} className="text-pink-500" />
    case Amenities.DESK_AND_CHAIR:
      return <LampDesk size={16} className="text-cyan-500" />
    case Amenities.BLACKOUT_CURTAINS:
      return <Blinds size={16} className="text-blue-600" />
    case Amenities.STORAGE_SPACE:
      return <Archive size={16} className="text-green-600" />
    case Amenities.DINING_AREA:
      return <HandPlatter size={16} className="text-red-600" />
    case Amenities.FIREPLACE:
      return <Flame size={16} className="text-pink-600" />
    case Amenities.OUTDOOR_SPORTS_FACILITIES:
      return <Trophy size={16} className="text-yellow-600" />
    case Amenities.STUDY_AREA:
      return <BookOpen size={16} className="text-purple-600" />
    case Amenities.STUDY_LAMP:
      return <LampDesk size={16} className="text-indigo-600" />
    case Amenities.OUTDOOR_SEATING:
      return <Landmark size={16} className="text-blue-700" />
    case Amenities.HIGH_SPEED_INTERNET:
      return <Gauge size={16} className="text-green-700" />
    case Amenities.SWIMMING_POOL:
      return <Waves size={16} className="text-yellow-700" />
    case Amenities.GYM:
      return <Dumbbell size={16} className="text-red-700" />
    case Amenities.PARKING_SPACE:
      return <Car size={16} className="text-purple-700" />
    case Amenities.PRINTING_FACILITIES:
      return <Printer size={16} className="text-indigo-700" />

    case Amenities.COMMON_AREA:
      return <Podcast size={16} className="text-yellow-700" />
    case Amenities.GAME_ROOM:
      return <Gamepad2 size={16} className="text-pink-700" />
    case Amenities.BICYCLE_STORAGE:
      return <Bike size={16} className="text-pink-700" />
    case Amenities.ROOFTOP_TERRACE:
      return <FaPeopleRoof size={16} className="text-yellow-700" />
    case Amenities.SOCIAL_EVENTS_AREA:
      return <HiUserGroup size={16} className="text-pink-700" />
    case Amenities.BEDSIDE_TABLE:
      return <MdOutlineTableRestaurant size={16} className="text-pink-700" />
    case Amenities.WARDROBE:
      return <BiCloset size={16} className="text-yellow-700" />
    case Amenities.LAMP:
      return <LampFloor size={16} className="text-purple-700" />
    case Amenities.FURNISHED_KITCHEN:
      return <Utensils size={16} className="text-blue-700" />
    case Amenities.MIRROR:
      return <GiMirrorMirror size={16} className="text-yellow-700" />
    case Amenities.MINI_FRIDGE:
      return <Refrigerator size={16} className="text-cyan-700" />
    case Amenities.WARDROBE:
      return <BiCloset size={16} className="text-blue-700" />
    case Amenities.LOCKABLE_STORAGE:
      return <LockKeyhole size={16} className="text-indigo-700" />
    case Amenities.RECYCLING_FACILITIES:
      return <Recycle size={16} className="text-yellow-700" />
    case Amenities.PET_FRIENDLY_FACILITIES:
      return <Cat size={16} className="text-pink-700" />
    case Amenities.GARAGE_OR_PARKING:
      return <BiSolidCarGarage size={16} className="text-yellow-700" />
    case Amenities.SHARED_BATHROOM:
      return <ShowerHead size={16} className="text-pink-700" />
    case Amenities.SECURITY_CAMERAS:
      return <Cctv size={16} className="text-cyan-700" />
    case Amenities.BARBECUE_AREA:
      return <Heater size={16} className="text-blue-700" />
    case Amenities.ROOM_CLEANING_SERVICE:
      return <GiVacuumCleaner size={16} className="text-cyan-700" />
    case Amenities.LANDSCAPING:
      return <BiLandscape size={16} className="text-blue-700" />
    case Amenities.BACKYARD:
      return <LuFlower2 size={16} className="text-green-700" />
    case Amenities.HOUSEKEEPING:
      return <GrServices size={16} className="text-pink-700" />
    case Amenities.BEDDING_AND_LINENS:
      return <FaBed size={16} className="text-cyan-700" />
    case Amenities.MAINTENANCE:
      return <Wrench size={16} className="text-blue-700" />
    case Amenities.FURNISHED_LIVING_ROOM:
      return <LuSofa size={16} className="text-yellow-700" />
    case Amenities.BULLETIN_BOARD:
      return <FaPeopleGroup size={16} className="text-green-700" />
    default:
      return null // Or any other default icon
  }
}
