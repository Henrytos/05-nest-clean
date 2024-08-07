
export abstract class HashGenerator { 
  abstract generato(plain:Record<string,string>):Promise<string>
}