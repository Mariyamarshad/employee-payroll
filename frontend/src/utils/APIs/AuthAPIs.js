const backendDomain = import.meta.env.VITE_BACKEND_URL;

const AuthAPI = {
    signUp: {
        url: `${backendDomain}/auth/signup`,
        method: "post",
    },
    login: {
        url: `${backendDomain}/auth/login`,
        method: "post",
    },
    logout: {
        url: `${backendDomain}/auth/logout`,
        method: "post",
    }
}

export default AuthAPI;