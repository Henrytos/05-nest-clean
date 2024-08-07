
export abstract class HashCompare { 
  abstract compare(payload:string , hash:string):Promise<boolean>
}