export interface ChatConfig {
  tags?: string[];
  department?: string;
}

export interface VisitorInfo {
  name?: string;
  email?: string;
  phoneNumber?: string;
}

export interface ZendeskTheme {
  primaryColor?: string; // Hex string, e.g., "#FF0000"
}

export interface InitializeOptions {
  appId: string;
  clientId: string;
  zendeskUrl: string;
  theme?: ZendeskTheme;
  locale?: string;
}

export interface ZendeskChatPlugin {
  initialize(options: InitializeOptions): Promise<void>;
  setVisitorInfo(visitorInfo: VisitorInfo): Promise<void>;
  setTheme(theme: ZendeskTheme): Promise<void>;
  setLocale(options: { locale: string }): Promise<void>;
  open(config: ChatConfig): Promise<void>; // Opens Messaging/Chat
  openHelpCenter(config: ChatConfig): Promise<void>;
  openTicketList(): Promise<void>;
  createTicket(): Promise<void>;
}
