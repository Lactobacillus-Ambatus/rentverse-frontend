import { LocationBaseType } from '@/types/location'

type getPopularLocations = () => Array<LocationBaseType>

const popularLocations: Array<LocationBaseType> = [
  {
    name: 'Kuala Lumpur',
    imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758027181/rentverse-locations/kuala-lumpur_zbmm3x.png',
  },
  {
    name: 'Petaling Jaya',
    imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758027174/rentverse-locations/petaling-jaya_vpzude.png',
  },
  {
    name: 'Subang Jaya',
    imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758027170/rentverse-locations/subang-jaya_xidmex.png',
  },
  {
    name: 'Penang Island',
    imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758027170/rentverse-locations/penang-island_axjqzm.png',
  },
  {
    name: 'Johor Bahru',
    imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758027166/rentverse-locations/johor-bahru_sij5vg.png',
  },
  {
    name: 'Shah Alam',
    imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758027182/rentverse-locations/shah-alam_swukrl.png',
  },
]

export const getPopularLocations: getPopularLocations = () => {
  return popularLocations
}
