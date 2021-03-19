import { Codable } from "../_internal/Codable";

export interface UserAccess extends Codable {

    accessToken: string
    refreshToken: string
    id: string
    
}