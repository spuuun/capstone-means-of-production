const remoteURL = "http://localhost:5002"

export default {
    searchTools(str) {
        return fetch(`${remoteURL}/tools/?q=${str}`)
    },
    searchProjects(str) {
        return fetch(`${remoteURL}/projects/?q=${str}`)
    }
}