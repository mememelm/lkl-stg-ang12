import { Company } from './company'

export interface Vehicle {
  id: number
  registration: string
  category: string
  place: string
  brand: string
  model: string
  state: boolean
  companyId: number
  company: Company
}
