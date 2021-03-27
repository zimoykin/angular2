import { MessageType } from "../../Enums/MessageType";
import { Codable } from "../../_internal/Codable";

export class SocketMessage implements Codable {
    
    chatid: string
    user:string
    message: string
    type: MessageType

}