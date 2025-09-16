export type PropertyType =
  | 'condominium'
  | 'apartment'
  | 'house'
  | 'townhouse'
  | 'villa'
  | 'penthouse'

export interface PropertyBase {
  id: string
  title: string
  price: number
  location: string
  imageUrl: string
  area: number
  rating: number
  propertyType: PropertyType
}
