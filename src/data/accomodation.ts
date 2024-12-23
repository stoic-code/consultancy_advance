import { Amenities } from "@/constants/accomodation";

type Accommodation = {
  name: string;
  price: number;
  address: string;
  province: string;
  propertyType: string;
  amenities: Amenities[];
  images: string[];
};

const images = [
  "/for-students/accomodations/dorm1.webp",
  "/for-students/accomodations/dorm2.webp",
  "/for-students/accomodations/dorm3.webp",
  "/for-students/accomodations/dorm4.webp",
];
export const accommodations: Accommodation[] = [
  {
    images,
    name: "Modern Apartment in Gangnam",
    price: 1500000,
    address: "123 Gangnam-daero, Gangnam-gu, Seoul",
    province: "Seoul",
    propertyType: "Apartment",
    amenities: [
      Amenities.TV,
      Amenities.AIR_CONDITIONER,
      Amenities.HIGH_SPEED_INTERNET,
      Amenities.LAUNDRY_ROOM,
      Amenities.PARKING_SPACE,
    ],
  },
  {
    images,
    name: "Traditional Hanok Stay in Jeonju",
    price: 100000,
    address: "456 Hanok Village Road, Wansan-gu, Jeonju",
    province: "Jeollabuk-do",
    propertyType: "Hanok",
    amenities: [
      Amenities.TV,
      Amenities.AIR_CONDITIONER,
      Amenities.HIGH_SPEED_INTERNET,
      Amenities.LAUNDRY_ROOM,
      Amenities.PARKING_SPACE,
    ],
  },
  {
    images,
    name: "Luxury Condo with Ocean View in Busan",
    price: 2500000,
    address: "789 Haeundae Beach Road, Haeundae-gu, Busan",
    province: "Busan",
    propertyType: "Condo",
    amenities: [
      Amenities.TV,
      Amenities.AIR_CONDITIONER,
      Amenities.HIGH_SPEED_INTERNET,
      Amenities.LAUNDRY_ROOM,
      Amenities.PARKING_SPACE,
    ],
  },
  {
    images,
    name: "Cosy Studio in Hongdae",
    price: 800000,
    address: "101 Hongik-ro, Mapo-gu, Seoul",
    province: "Seoul",
    propertyType: "Studio",
    amenities: [
      Amenities.TV,
      Amenities.HIGH_SPEED_INTERNET,
      Amenities.LAUNDRY_ROOM,
      Amenities.PARKING_SPACE,
    ],
  },
  {
    images,
    name: "Ski Resort Chalet in Pyeongchang",
    price: 3000000,
    address:
      "202 Pyeongchang Resort Road, Daegwallyeong-myeon, Pyeongchang-gun",
    province: "Gangwon-do",
    propertyType: "Chalet",
    amenities: [
      Amenities.TV,
      Amenities.AIR_CONDITIONER,
      Amenities.HIGH_SPEED_INTERNET,
      Amenities.PARKING_SPACE,
    ],
  },
  {
    images,
    name: "Seaside Villa in Jeju",
    price: 2000000,
    address: "303 Jeju Coastal Road, Jeju-si, Jeju",
    province: "Jeju",
    propertyType: "Villa",
    amenities: [
      Amenities.TV,
      Amenities.AIR_CONDITIONER,
      Amenities.HIGH_SPEED_INTERNET,
      Amenities.LAUNDRY_ROOM,
      Amenities.PARKING_SPACE,
    ],
  },
  {
    images,
    name: "Family-Friendly Guesthouse in Incheon",
    price: 500000,
    address: "404 Incheon Guesthouse Street, Jung-gu, Incheon",
    province: "Incheon",
    propertyType: "Guesthouse",
    amenities: [
      Amenities.TV,
      Amenities.AIR_CONDITIONER,
      Amenities.HIGH_SPEED_INTERNET,
      Amenities.PARKING_SPACE,
    ],
  },
  {
    images,
    name: "Mountain Retreat Cabin in Seoraksan",
    price: 1200000,
    address: "505 Seoraksan Cabin Road, Sokcho-si, Gangwon-do",
    province: "Gangwon-do",
    propertyType: "Cabin",
    amenities: [
      Amenities.TV,
      Amenities.AIR_CONDITIONER,
      Amenities.HIGH_SPEED_INTERNET,
      Amenities.PARKING_SPACE,
    ],
  },
  {
    images,
    name: "City Centre Loft in Daegu",
    price: 900000,
    address: "606 Daegu Loft Avenue, Jung-gu, Daegu",
    province: "Daegu",
    propertyType: "Loft",
    amenities: [
      Amenities.TV,
      Amenities.AIR_CONDITIONER,
      Amenities.HIGH_SPEED_INTERNET,
      Amenities.LAUNDRY_ROOM,
      Amenities.PARKING_SPACE,
    ],
  },
  {
    images,
    name: "Riverfront Guesthouse in Andong",
    price: 600000,
    address: "707 Andong Riverside Road, Andong-si, Gyeongsangbuk-do",
    province: "Gyeongsangbuk-do",
    propertyType: "Guesthouse",
    amenities: [
      Amenities.TV,
      Amenities.AIR_CONDITIONER,
      Amenities.HIGH_SPEED_INTERNET,
      Amenities.PARKING_SPACE,
    ],
  },
];
