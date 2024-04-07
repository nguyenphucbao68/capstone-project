export const SEARCH_DOMAIN = {
    Authorized: "AUTHORIZED",
    Public: "PUBLIC",
};

export const JobSearchKeyCache = (session: string, domain: string) => `job_search_key_${session}_${domain}`;
