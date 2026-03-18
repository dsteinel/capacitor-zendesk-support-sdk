import { WebPlugin } from '@capacitor/core';
import { ZendeskChatPlugin, ChatConfig, VisitorInfo, InitializeOptions } from './definitions';
declare global {
    interface Window {
        zE: any;
        zESettings: any;
    }
}
export declare class ZendeskChatWeb extends WebPlugin implements ZendeskChatPlugin {
    initialize(options: InitializeOptions): Promise<void>;
    open(config: ChatConfig): Promise<void>;
    openHelpCenter(config: ChatConfig): Promise<void>;
    openTicketList(): Promise<void>;
    createTicket(): Promise<void>;
    private applyConfig;
    setVisitorInfo(visitorData: VisitorInfo): Promise<void>;
}
