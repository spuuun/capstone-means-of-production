const remoteURL = "http://localhost:5002"

export default {
    getSingleTool(id) {
        return fetch(`${remoteURL}/tools/${id}`).then(result => result.json())
    },
    getAllTools() {
        return fetch(`${remoteURL}/tools?_expand=user`).then(result => result.json())
    },
    getMyTools(activeUserId) {
        return fetch(`${remoteURL}/tools?_expand=user&userId=${activeUserId}`).then(result => result.json())
    },
    delete(id) {
        return fetch(`http://localhost:5002/tools/${id}`, {
            method: "DELETE"
        })
            .then(result => result.json())
    },
    postNewTool(newTool) {
        return fetch(`${remoteURL}/tools`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTool)
        }).then(data => data.json())
    },
    update(editedTool) {
        return fetch(`${remoteURL}/tools/${editedTool.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedTool)
        }).then(data => data.json());
    },
    return(tool) {
        return fetch(`${remoteURL}/tools/${tool.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ isAvailable: true })
        })
    },
    getFriendsTools(id) {
        return fetch(`${remoteURL}/tools/?userId=${id}`).then(result => result.json())
    }
}