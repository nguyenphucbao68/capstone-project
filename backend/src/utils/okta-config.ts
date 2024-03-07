import dotenv from "dotenv";
import {
    OktaAuth,
    OktaAuthOptions,
    // TokenManagerInterface,
    // AccessToken,
    // IDToken,
    // UserClaims,
    // TokenParams
} from '@okta/okta-auth-js';
import okta from "@okta/okta-sdk-nodejs";
dotenv.config();
const client = new okta.Client({
    orgUrl: process.env.ORGURL || 'https://trial-7162432.okta.com',
    token: process.env.APITOKEN || '00Lro-6tQleA85IJK7ebwNFkJBJXnAVA3FLCqVzwpd',
});

const config: OktaAuthOptions = {
    issuer: process.env.OKTADOMAIN || 'https://trial-7162432.okta.com/oauth2/default',
};

const authClient: OktaAuth = new OktaAuth(config);
// const tokenManager: TokenManagerInterface = authClient.tokenManager;
// const accessToken: AccessToken = await tokenManager.get('accessToken') as AccessToken;
// const idToken: IDToken = await tokenManager.get('idToken') as IDToken;
// const userInfo: UserClaims = await authClient.token.getUserInfo(accessToken, idToken);

// if (!userInfo) {
//   const tokenParams: TokenParams = {
//     scopes: ['openid', 'email', 'custom_scope'],
//   };
//   authClient.token.getWithRedirect(tokenParams);
// }

export { client, authClient }