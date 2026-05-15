const API_BASE = "/api";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    };
}

async function checkResponse(res, label) {
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `HTTP ${res.status}: ${label}`);
    }
    return res.json();
}

export async function getUsers() {
    const res = await fetch(`${API_BASE}/admin/users`, { headers: authHeaders() });
    return checkResponse(res, "get users");
}

export async function getUserById(id) {
    const res = await fetch(`${API_BASE}/admin/users/${id}`, { headers: authHeaders() });
    return checkResponse(res, "get user");
}

export async function updateUserRole(id, role) {
    const res = await fetch(`${API_BASE}/admin/users/${id}/role`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ role }),
    });
    return checkResponse(res, "update role");
}

export async function deleteUser(id) {
    const res = await fetch(`${API_BASE}/admin/users/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    return checkResponse(res, "delete user");
}

export async function getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`, { headers: authHeaders() });
    return checkResponse(res, "get stats");
}

export async function getAdminProfile() {
    const res = await fetch(`${API_BASE}/admin/profile`, { headers: authHeaders() });
    return checkResponse(res, "get profile");
}

export async function updateAdminProfile(data) {
    const res = await fetch(`${API_BASE}/admin/profile`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });
    return checkResponse(res, "update profile");
}

export async function changeAdminPassword(currentPassword, newPassword, confirmPassword) {
    const res = await fetch(`${API_BASE}/admin/profile/password`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
    });
    return checkResponse(res, "change password");
}
