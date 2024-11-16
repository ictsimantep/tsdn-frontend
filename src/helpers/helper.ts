type JwtData = {
    token: string;
};

export function getJwtToken(): string | null {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
        try {
        const parsedJwt: JwtData = JSON.parse(jwt);
        return parsedJwt.token;
        } catch (error) {
        console.error("Failed to parse JWT from localStorage:", error);
        return null;
        }
    }

    return null;
}