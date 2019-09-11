const remoteURL = "http://localhost:5002"

export default {
    getTool(id) {
        return fetch(`${remoteURL}/tools/${id}`).then(result => result.json())
    },
    getAllTools() {
        return fetch(`${remoteURL}/tools`).then(result => result.json())
    },
    getMyTools(activeUserId) {
        return fetch(`${remoteURL}/tools?ownerId=${activeUserId}`).then(result => result.json())
    },
    //will need a method for getting tools that are checked out --- either by me, or my tools that're checked out by others
    deleteTool(id) {
        return fetch(`http://localhost:5002/tools/${id}`, {
            method: "DELETE"
        })
            .then(result => result.json())
    },
    post(newTool) {
        return fetch(`${remoteURL}/tools`, {
            method: "POST",
            heaers: {
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
    getFriendsTools(id) {
        return fetch(`${remoteURL}/tools/?userId=${id}`).then(result => result.json())
    }
}