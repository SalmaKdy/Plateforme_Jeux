const API_BASE = "/api";

function authHeaders() {
    const token = localStorage.getItem("token");
    return { "Authorization": `Bearer ${token}` };
}

async function checkResponse(response, label) {
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${label}`);
    return response.json();
}

export async function getUserData(username) {
    const response = await fetch(`${API_BASE}/dashboard/user?username=${encodeURIComponent(username)}`, {
        headers: authHeaders(),
    });
    return checkResponse(response, "user data");
}

export async function getAllGames() {
    const response = await fetch(`${API_BASE}/dashboard/games`, {
        headers: authHeaders(),
    });
    return checkResponse(response, "games");
}

export async function getPurchasedGames(username) {
    const response = await fetch(`${API_BASE}/dashboard/purchased?username=${encodeURIComponent(username)}`, {
        headers: authHeaders(),
    });
    return checkResponse(response, "purchased games");
}

export async function getCartItems(username) {
    const response = await fetch(`${API_BASE}/dashboard/cart?username=${encodeURIComponent(username)}`, {
        headers: authHeaders(),
    });
    return checkResponse(response, "cart");
}
