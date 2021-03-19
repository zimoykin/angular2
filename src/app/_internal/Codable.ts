

export class Codable {
    static toJson<T>(this: new () => T) : string {
        return JSON.stringify(this)
    }
}