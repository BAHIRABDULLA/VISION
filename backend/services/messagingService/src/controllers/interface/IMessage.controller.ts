
export interface IMessageController {
    getChatHistory(req: any, res: any): Promise<void>
}