const remoteURL = "http://localhost:5002"

export default {
    getAllStatus() {
        return fetch(`${remoteURL}/status`).then(result => result.json())
    },
    postNewProject(newProject) {
        return fetch(`${remoteURL}/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProject)
        }).then(d => d.json())
    },
    getAllProjects() {
        return fetch(`${remoteURL}/projects`).then(result => result.json())
    },
    delete(id) {
        return fetch(`${remoteURL}/projects/${id}`, {
            method: "DELETE"
        }).then(d => d.json())
    }
}
