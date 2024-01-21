export const createCategory = async (data) => {
    try {
        const response = await fetch('/api/categories', {
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

export const updateCategory = async (data, id) => {
    try {
        const response = await fetch('/api/categories/' + id, {
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

export const deleteCategory = async (id) => {
    try {
        const response = await fetch('/api/categories/' + id, {
            method: "DELETE",
        })
        const json = await response.json();
        if (!response.ok) throw new Error(json.message);
        return json.data;
    } catch (e) {
        throw e;
    }
}