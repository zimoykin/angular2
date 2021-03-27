import { Codable } from "src/app/_internal/Codable";
import { UserPublic } from "../UserPublic";

export interface Chat {
    id: string
    title: string
    settings: any
    admin: UserPublic
    users: UserPublic[]
}
export interface ChatPublic {
    id: string
    title: string
    users: UserPublic[]
}

export interface Message {
    id: string
    message: string
    chat: ChatPublic
    members: number
    user: UserPublic
}

export interface NewMessage {
    message: string
    chatid: string
    type: string
}