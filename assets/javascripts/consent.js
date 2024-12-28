var consent = __md_get("__consent")
if (consent && consent.analytics) {
    window._paq=window._paq||[];window._paq.push(['rememberCookieConsentGiven']);
    __md_analytics();
} else {
    console.log("Analytics consent not given. Matomo script not loaded.");
}