import type { PropertyType } from '@/types/property'
type swapCasePropertyType = (property_type: PropertyType) => string

export const swapCasePropertyType: swapCasePropertyType = (property_type) => {
  return property_type[0].toUpperCase() + property_type.slice(1)
}

export const getLocaledPrice = (price: number, locale: string = 'en-US', currency: string = 'MYR'): string => {
  return `${
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(price)
  }/mo`
}

export const getLocaledArea = (area: number, locale: string = 'en-US'): string => {
  return `${
    new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
    }).format(area)
  } sqft`
}

export const getLocaledRating = (rating: number, locale: string = 'en-US'): string => {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1,
  }).format(rating)
}
