export const createProduct = async (data) => {
    try {
        const response = await fetch('/api/products', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const json = await response.json();
        if (!response.ok) throw new Error(json.message);
        return json.data;
    } catch (e) {
        throw e;
    }
}

export const updateProduct = async (data, id) => {
    try {
        const response = await fetch('/api/products/' + id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const json = await response.json();
        if (!response.ok) throw new Error(json.message);
        return json.data;
    } catch (e) {
        throw e;
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await fetch('/api/products/' + id, {
            method: "DELETE",
        })
        const json = await response.json();
        if (!response.ok) throw new Error(json.message);
        return json.data;
    } catch (e) {
        throw e;
    }
}