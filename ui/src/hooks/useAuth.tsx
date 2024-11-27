
export const useAuth = () => {
    const singIn = () => {
        localStorage.setItem("isAuthenticated", "true");
    };

    const singOut = () => {
        localStorage.setItem("isAuthenticated", "false");
    };

    const isLoggedIn = () => localStorage.getItem("isAuthenticated") === "true";
    return {singIn, singOut, isLoggedIn};
}

export type AuthContext = ReturnType<typeof useAuth>;