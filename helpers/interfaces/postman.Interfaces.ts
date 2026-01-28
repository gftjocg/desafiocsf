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