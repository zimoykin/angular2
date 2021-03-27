import { Codable } from "src/app/_internal/Codable";
import { UserPublic } from "../UserPublic";

export interface Chat {
    id: string
    title: string
    settings: any
    admin: UserPublic
    users: UserPublic[]
}

export interface Message {
    id: string
    message: string
    chat: string
    members: number
    user: UserPublic
}

export interface NewMessage {
    message: string
    chat: string
    user: string
}