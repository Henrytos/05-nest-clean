
export abstract class HashCompare { 
  abstract compate(payload:string , hash:string):Promise<boolean>
}