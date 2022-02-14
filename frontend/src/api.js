import axios from "axios";
// import { store } from "./state.js";
const SERVER_URL = "http://localhost:4040/api/";

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 2500,
  withCredentials: false,
});

class ApiRequestError extends Error {
  static DEFAULT_MESSAGES_MAP = {
    401: "You must be logged in to access this page",
    403: "You don't have permission to access this page",
    404: "404 not found; there may have a bad id",
    502: "Bad Gateway: our website is down, please wait while an administrator fixes the issue",
  };
  /**
   * The caller provides a map from HTTP codes to error messages; this function will take the
   * HTTP status code and pick which error message should be used, setting a default if there is
   * no entry in the object
   * @param {*} error Axios error
   * @param {Map<number|string, string|(Error) => string>} errorMessages
   * map between HTTP code and either string error message or function taking error as argument
   * Keys are HTTP error codes with the exception of `NO_RESPONSE`/`DEFAULT_RESPONSE`
   */
  static createFromMessageMap(error, errorMessages = undefined) {
    let message = "";
    if (typeof errorMessages !== "object") {
      errorMessages = {};
    }
    const callOrGet = (key) => {
      // get the provided value, or if undefined, the default
      const messageOrFunction =
        errorMessages[key] !== undefined
          ? errorMessages[key]
          : this.DEFAULT_MESSAGES_MAP[key];
      // Check if it is a function; if so, call the function with the error message
      return typeof messageOrFunction == "string"
        ? messageOrFunction
        : messageOrFunction(error);
    };

    if (error === undefined || error.response === undefined) {
      message = callOrGet(this.NO_RESPONSE_KEY);
    } else if (typeof error.response.status !== "number") {
      message = callOrGet(this.DEFAULT_KEY);
    } else {
      const code = error.response.status;
      if (
        errorMessages[code] !== undefined ||
        this.DEFAULT_MESSAGES_MAP[code] !== undefined
      ) {
        message = callOrGet(code);
      } else {
        message = callOrGet(this.DEFAULT_KEY);
      } // no default handlers, so use default response
    }

    return new ApiRequestError(message, error);
  }
}

export const Api = {
  /**
   * sends login request
   * @param props object with 'email' and 'password'
   * @return promise. if it fails, the error will have the `userfacingerrormessage` property
   */
  login: async (props) => {
    return instance.post(`/users/login`, props).catch((error) => {
      throw ApiRequestError.createFromMessageMap(error, {
        400: "your email or password is incorrect",
      });
    });
  },

  // TODO: fix error messages
  /**
   * sends request to chess.com api to recieve basic player info and creates profile data
   * @param props object with 'username'
   * @return promise. if it fails, the error will have the `userfacingerrormessage` property
   */
  userInfo: async (props) => {
    return instance.post(`/users/userinfo`, props).catch((error) => {
      throw ApiRequestError.createFromMessageMap(error, {
        400: "you are not currently logged in",
      });
    });
  },

  /**
   * sends request to chess.com api to recieve player statistics and ratings
   * @param props object with 'username'
   * @return promise. if it fails, the error will have the `userfacingerrormessage` property
   */
  userStats: async (props) => {
    return instance.post(`/users/userstats`, props).catch((error) => {
      throw ApiRequestError.createFromMessageMap(error, {
        400: "you are not currently logged in",
      });
    });
  },
}
