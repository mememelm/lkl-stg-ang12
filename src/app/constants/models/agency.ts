import { Company } from "./company";

export interface Agency {
  id: number
  name: string
  address: string
  companies: Array<Company>
}
