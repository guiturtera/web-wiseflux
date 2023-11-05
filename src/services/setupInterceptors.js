import api from "./api";
import axios from 'axios';
import AuthService from "./auth.service";
import TokenService from "./token.service";
import EventBus from "../common/EventBus";
import store from "../store/index"

const isTokenExpired = (token) => {
    let tokenExpiryTime = new Date(token['tokenExpiryTime']);
    tokenExpiryTime.setMinutes(tokenExpiryTime.getMinutes() - 2); // Evitar problemas com requisições demoradas
    let tokenIsExpired = Date.now() >= tokenExpiryTime;

    return tokenIsExpired
}

const regenerateToken = async (accessToken, refreshToken) => {
  try {
    let newUser = await AuthService.refreshToken({'token': accessToken['token'], 'refreshToken': refreshToken['token']})
    TokenService.updateLocalUser(newUser)

    await store.dispatch('auth/refreshUser', newUser);
  } catch (_error) {
    EventBus.dispatch("tokenExpired");
    throw new axios.Cancel('Token expired');
    // throw new Error("Token expired")
  }
}

const manageExpiredAccessToken = (accessToken, refreshToken) => {
  if (isTokenExpired(refreshToken)) { 
    EventBus.dispatch("tokenExpired") 
  } else {
    regenerateToken(accessToken, refreshToken)
  }
}

const setup = (store) => {
  api.interceptors.request.use(
    (config) => {
      if (config.url.startsWith('Auth/')) return config

      let accessToken = TokenService.getLocalAccessToken()

      if (isTokenExpired(accessToken)) {
        manageExpiredAccessToken(accessToken, TokenService.getLocalRefreshToken())
        accessToken = TokenService.getLocalAccessToken()
      } 

      config.headers["Authorization"] = 'Bearer ' + accessToken['token'];
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

//   axiosInstance.interceptors.response.use(
//     (res) => {
//       return res;
//     },
//     async (err) => {
//       const originalConfig = err.config;

//       if (originalConfig.url !== "/auth/signin" && err.response) {
//         // Access Token was expired
//         if (err.response.status === 401 && !originalConfig._retry) {
//           originalConfig._retry = true;

//           try {
//             const rs = await axiosInstance.post("/auth/refreshtoken", {
//               refreshToken: TokenService.getLocalRefreshToken(),
//             });

//             const { accessToken } = rs.data;

//             store.dispatch('auth/refreshToken', accessToken);
//             TokenService.updateLocalAccessToken(accessToken);

//             return axiosInstance(originalConfig);
//           } catch (_error) {
//             return Promise.reject(_error);
//           }
//         }
//       }

//       return Promise.reject(err);
//     }
//   );
};

export default setup;