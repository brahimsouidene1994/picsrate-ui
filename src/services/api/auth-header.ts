import keycloak from "../../keycloak";
import { AxiosHeaders, AxiosRequestConfig } from "axios";
import { useAppSelector } from "../../hooks/stateHooks";
export default async function authHeader(content_type?:string|undefined):Promise<AxiosRequestConfig['headers']> {
    return {
        // 'Content-type': content_type === undefined ? 'application/json' : content_type,
        // 'x-access-token': keycloak.token
        Authorization: `Bearer ${keycloak.token}`
      };
  }