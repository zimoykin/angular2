import { Codable } from "../_internal/Codable";

 export class UserPublic extends Codable{

    username: string;
    email: string;
    id: string;
    isOnline?: boolean
    
    gender: string
    role: string
    photo: string

 }