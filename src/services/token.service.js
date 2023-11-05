class TokenService {
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return { "token": user?.refreshToken, "tokenExpiryTime": user?.refreshTokenExpiryTime };
    }

    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return { "token": user?.token, "tokenExpiryTime": user?.tokenExpiryTime };
    }

    updateLocalUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    getUser(store) {
        // return JSON.parse(localStorage.getItem("user"));
        return store.state.auth.user?.user
    }

    setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem("user");
    }
}
  
export default new TokenService();