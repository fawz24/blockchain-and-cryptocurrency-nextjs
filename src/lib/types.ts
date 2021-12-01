export type Channels = 'BLOCKCHAIN' | 'TEST'
export type MessageHandler = (channel: Channels, message: string) => void
