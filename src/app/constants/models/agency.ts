import { Company } from "./company";

export interface Agency {
  id?: string
  name?: string
  address?: string
  companies?: Array<Company>
}
