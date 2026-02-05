export interface PostmanEnv {
    id: string;
    name: string;
    values?: PostmanEnvValue[];
}
export interface PostmanEnvValue {
    key: string;
    value: string;
    type: string;
    enabled: boolean;
}

export interface PostmanEnvTestValue {
    baseUrl: string;
    userLogin: string;
    pwdLogin: string;
    userName: string;
    userEmail: string;
    userPassword: string;
}