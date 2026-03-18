import { WebPlugin } from '@capacitor/core';
export class ZendeskChatWeb extends WebPlugin {
    async initialize(options) {
        if (window.zE) {
            console.warn('Zendesk is already initialized');
            return;
        }
        if (!options.appId) {
            console.error('Zendesk Web: appId is required for initialization.');
            return;
        }
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.id = 'ze-snippet';
            script.async = true;
            // In the Unified SDK (Support), the 'appId' is the unique identifier
            script.src = `https://static.zdassets.com/ekr/snippet.js?key=${options.appId}`;
            script.onload = () => {
                console.log('Zendesk Web Widget initialized with appId:', options.appId);
                if (window.zE) {
                    window.zE('webWidget', 'hide');
                }
                resolve();
            };
            script.onerror = (e) => {
                console.error('Zendesk Web: Failed to load snippet. Check your appId.', e);
                reject(e);
            };
            document.head.appendChild(script);
        });
    }
    async open(config) {
        if (!window.zE) {
            console.error('Zendesk not initialized. Call initialize() first.');
            return;
        }
        this.applyConfig(config);
        window.zE('webWidget', 'show');
        window.zE('webWidget', 'open');
    }
    async openHelpCenter(config) {
        if (!window.zE) {
            console.error('Zendesk not initialized. Call initialize() first.');
            return;
        }
        this.applyConfig(config);
        window.zE('webWidget', 'show');
        window.zE('webWidget', 'open');
    }
    async openTicketList() {
        if (window.zE) {
            window.zE('webWidget', 'show');
            window.zE('webWidget', 'open');
        }
    }
    async createTicket() {
        if (window.zE) {
            window.zE('webWidget', 'show');
            window.zE('webWidget', 'open');
        }
    }
    applyConfig(config) {
        if (config.department) {
            window.zE('webWidget', 'updateSettings', {
                webWidget: {
                    chat: {
                        departments: {
                            enabled: [config.department],
                            select: config.department
                        }
                    }
                }
            });
        }
        if (config.tags && config.tags.length > 0) {
            window.zE('webWidget', 'updateSettings', {
                webWidget: {
                    chat: {
                        tags: config.tags
                    }
                }
            });
        }
    }
    async setVisitorInfo(visitorData) {
        if (!window.zE) {
            console.error('Zendesk not initialized. Call initialize() first.');
            return;
        }
        window.zE('webWidget', 'identify', {
            name: visitorData.name,
            email: visitorData.email,
            phone: visitorData.phoneNumber
        });
        window.zE('webWidget', 'prefill', {
            name: {
                value: visitorData.name,
                readOnly: true
            },
            email: {
                value: visitorData.email,
                readOnly: true
            },
            phone: {
                value: visitorData.phoneNumber,
                readOnly: true
            }
        });
    }
}
//# sourceMappingURL=web.js.map