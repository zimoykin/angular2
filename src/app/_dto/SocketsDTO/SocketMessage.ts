import { MessageType } from "../../Enums/MessageType";
import { Codable } from "../../_internal/Codable";

export class SocketMessage implements Codable {
    
    clientid: string
    message: string
    type: MessageType

    constructor(message: string, clientid: string){
        this.clientid = clientid;
        this.message = message;
        this.type = MessageType.chatMessage
    }

}