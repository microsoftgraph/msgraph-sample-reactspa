import { UserAgentApplication } from 'msal';
import { config } from './Config';

export class UserAgent {
    public userAgentApplication : UserAgentApplication;
    constructor()
    {
        this.userAgentApplication = new UserAgentApplication({
            auth: {
                clientId: config.appId,
                redirectUri: config.redirectUri
            },
            cache: {
                cacheLocation: "localStorage",
                storeAuthStateInCookie: true
            }
        });
    }
}