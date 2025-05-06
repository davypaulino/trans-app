import axios from "axios";

async function getAccessToken() {
    try {
        const discoveryResponse = await axios.get("https://localhost:7452/.well-known/openid-configuration");

        if (!discoveryResponse.data.token_endpoint) {
            throw new Error("Token endpoint não encontrado!");
        }

        const tokenResponse = await axios.post(discoveryResponse.data.token_endpoint, 
            new URLSearchParams({
                client_id: "client",
                client_secret: "secret",
                grant_type: "client_credentials",
                scope: "api.full_access"
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        return tokenResponse.data.access_token;
    } catch (error) {
        console.error("Erro ao obter token:", error);
        return null;
    }
}

const Gateway = axios.create({
    baseURL: "https://localhost:7147",
    headers: {
        "Content-Type": "application/json"
    }
});

// Interceptor de requisição
Gateway.interceptors.request.use(
    async config => {
        // Adicione um token de autenticação, se necessário
        const token = await getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Gateway.interceptors.response.use(
//     response => response,
//     error => {
//         console.error("Erro na API:", error.response?.status, error.response?.data);
        
//         if (error.response?.status === 401) {
//             window.location.href = "/login";
//         }

//         return Promise.reject(error);
//     }
// );

export const AuthClient = {
    Gateway
}
