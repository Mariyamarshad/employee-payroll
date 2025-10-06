const backendDomain = import.meta.env.VITE_BACKEND_URL;

const AuthAPI = {
    signUp: {
        url: `${backendDomain}/auth/signup`,
        method: "post",
    }
}

export default AuthAPI;