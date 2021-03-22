import { Codable } from "src/app/_internal/Codable";

export interface Chat {
    user1:string,
    user2:string,
    message: Message
}

export interface Message {
    user:string
    date: Date
    message: string
}