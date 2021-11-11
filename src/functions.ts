
let env_cache: any = {};

function env(key: string, default_value: string = ""): string {

    let val = '';
    if(env_cache.hasOwnProperty(key)){
        val = env_cache.key;
    }else{
        val = process.env[key];
        env_cache[key] = val;
    }
    if(!val) {
        return default_value;
    }
    return val;
}

function envInt(key: string, default_value: number = 0): number {
    let val = env(key);
    if(!val) {
        return default_value;
    }
    return +val || 0;
}

function envBool(key: string, default_value: boolean = false): boolean {
    let val = env(key);
    if(!val) {
        return default_value;
    }
    if(val.toLowerCase() == 'true'){
        return true;
    }
    return false;
}

globalThis.env = env;
globalThis.envInt = envInt;
globalThis.envBool = envBool;
