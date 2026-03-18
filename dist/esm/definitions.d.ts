export interface ChatConfig {
    tags?: string[];
    department?: string;
}
export interface VisitorInfo {
    name?: string;
    email?: string;
    phoneNumber?: string;
}
export interface InitializeOptions {
    appId: string;
    clientId: string;
    zendeskUrl: string;
}
export interface ZendeskChatPlugin {
    initialize(options: InitializeOptions): Promise<void>;
    setVisitorInfo(visitorInfo: VisitorInfo): Promise<void>;
    open(config: ChatConfig): Promise<void>;
    openHelpCenter(config: ChatConfig): Promise<void>;
    openTicketList(): Promise<void>;
    createTicket(): Promise<void>;
}
