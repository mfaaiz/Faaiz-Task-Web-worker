import { Type } from 'class-transformer'
import { Child } from './child'

export class Table {
  id!: string
  int!: number
  float!: number
  color!: string
  @Type(() => Child)
  child!: Child
}
