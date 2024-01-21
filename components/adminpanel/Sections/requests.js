export const createSection = async (data) => {
    try {
        const response = await fetch('/api/sections', {
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

export const updateSection = async (data, id) => {
    try {
        console.log('body', data)
        const response = await fetch('/api/sections/' + id, {
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

export const deleteSection = async (id) => {
    try {
        const response = await fetch('/api/sections/' + id, {
            method: "DELETE",
        })
        const json = await response.json();
        if (!response.ok) throw new Error(json.message);
        return json.data;
    } catch (e) {
        throw e;
    }
}