import AsyncStorage from '@react-native-community/async-storage';
import {Config, System} from '@src/constant';

const _responseConfig = async (response: Response) => {
  if (response.status === System.RESPONSE_STATUS.SUCESS) return await response.json();
  if (response.status === System.RESPONSE_STATUS.NOT_FOUND) throw Error('Server is busy');
  if (response.status === System.RESPONSE_STATUS.FORBIDDEN) throw Error('InvalidToken');
  if (response.status === System.RESPONSE_STATUS.INTERVAL_SERVER) {
    const result = await response.json();
    throw Error(result.error_description);
  }
};

const postService = async (url: string, body: object, isAuthorization = true, isFormData = false) => {
  try {
    const headers: any = isFormData
      ? {'Content-Type': 'multipart/form-data'}
      : {Accept: 'application/json', 'Content-Type': 'application/json'};
    if (isAuthorization) headers.Authorization = await AsyncStorage.getItem(System.TOKEN);
    const requestInit: any = {method: 'POST', headers};
    if (body)
      if (isFormData) requestInit.body = body;
      else requestInit.body = JSON.stringify(body);
    const response = await fetch(`${Config.HOST_API}/${url}`, requestInit);
    return await _responseConfig(response);
  } catch (error) {
    throw error;
  }
};

const getService = async (url: string, params?: object, isAuthorization = true) => {
  try {
    const headers: any = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (isAuthorization) headers.Authorization = await AsyncStorage.getItem(System.TOKEN);
    const requestInit = {method: 'GET', headers};
    let queryString = '';
    if (params)
      queryString = `?${Object.keys(params)
        .map((key) => `${key}=${params[key] || ''}`)
        .join('&')}`;
    const response = await fetch(`${Config.HOST_API}/${url}${queryString}`, requestInit);
    return await _responseConfig(response);
  } catch (error) {
    throw error;
  }
};

export default {postService, getService};
