PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable = () => {
    return new Promise((resolve) => {
        resolve(false);
    })
}