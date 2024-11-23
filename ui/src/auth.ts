export function isAuthenticated() {
    return localStorage.getItem("isAuthenticated") === "true";
}

export async function singIn() {
    localStorage.setItem("isAuthenticated", "true");
}

export async function logout() {
    localStorage.removeItem("isAuthenticated");
}