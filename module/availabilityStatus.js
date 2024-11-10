export class AvailabilityStatus {
    enableEdit = false;
    publicKeyCredential = false;
    isUserVerifyingPlatformAuthenticatorAvailable = false;
    isConditionalMediationAvailable = false;
    /*
    getClientCapabilities = false;
    conditionalCreate = false;
    conditionalGet = false;
    hybridTransport = false;
    passkeyPlatformAuthenticator = false;
    relatedOrigins = false;
    signalAllAcceptedCredentials = false;
    signalCurrentUserDetails = false;
    signalUnknownCredential = false;
    userVerifyingPlatformAuthenticator = false;
    */

    constructor(initObject = {}) {
        Object.assign(this, initObject);
    }

    async loadDeviceConfig() {
        this.publicKeyCredential = typeof PublicKeyCredential !== 'undefined';
        if (!this.publicKeyCredential) return;

        this.isUserVerifyingPlatformAuthenticatorAvailable 
            = typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function'
                && await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        this.isConditionalMediationAvailable 
            = typeof PublicKeyCredential.isConditionalMediationAvailable === 'function'
                && await PublicKeyCredential.isConditionalMediationAvailable();
        /*
        // TODO: after release Chrome v132
        this.getClientCapabilities 
            = typeof PublicKeyCredential.getClientCapabilities === 'function';
        if (!this.getClientCapabilities) return;

        try {
            let capabilities = await PublicKeyCredential.getClientCapabilities();

            this.conditionalCreate = capabilities['conditionalCreate'] === true;
            this.conditionalGet = capabilities['conditionalGet'] === true;
            this.hybridTransport = capabilities['hybridTransport'] === true;
            this.passkeyPlatformAuthenticator = capabilities['passkeyPlatformAuthenticator'] === true;
            this.relatedOrigins = capabilities['relatedOrigins'] === true;
            this.signalAllAcceptedCredentials = capabilities['signalAllAcceptedCredentials'] === true;
            this.signalCurrentUserDetails = capabilities['signalCurrentUserDetails'] === true;
            this.signalUnknownCredential = capabilities['signalUnknownCredential'] === true;
            this.userVerifyingPlatformAuthenticator = capabilities['userVerifyingPlatformAuthenticator'] === true;

        } catch (error) {
            console.error('Error accessing client capabilities:', error);
        }
        */
    }

    toPrimitiveObject() {
        return {
            enableEdit: this.enableEdit,
            publicKeyCredential: this.publicKeyCredential,
            isUserVerifyingPlatformAuthenticatorAvailable: this.isUserVerifyingPlatformAuthenticatorAvailable,
            isConditionalMediationAvailable: this.isConditionalMediationAvailable,
            /*
            getClientCapabilities: this.getClientCapabilities,
            conditionalCreate: this.conditionalCreate,
            conditionalGet: this.conditionalGet,
            hybridTransport: this.hybridTransport,
            passkeyPlatformAuthenticator: this.passkeyPlatformAuthenticator,
            relatedOrigins: this.relatedOrigins,
            signalAllAcceptedCredentials: this.signalAllAcceptedCredentials,
            signalCurrentUserDetails: this.signalCurrentUserDetails,
            signalUnknownCredential: this.signalUnknownCredential,
            userVerifyingPlatformAuthenticator: this.userVerifyingPlatformAuthenticator
            */
        };
    }
}
