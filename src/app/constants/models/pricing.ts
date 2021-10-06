import { Agency } from './agency';
import { Company } from './company'

export interface Price {
  id: number
  description: string
  increased_price: number
  companyId: number
  company: Company
  agencyId: number
  agency: Agency
}
