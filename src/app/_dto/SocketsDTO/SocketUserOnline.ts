import { MessageType } from "../../Enums/MessageType";
import { Codable } from "../../_internal/Codable";

export class SocketUsersOnline implements Codable {  
    users: string[]
}