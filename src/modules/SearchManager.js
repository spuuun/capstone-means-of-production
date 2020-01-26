const remoteURL = "http://localhost:5002"

export default {
    searchTools(str) {
        return fetch(`${remoteURL}/tools/?q=${str}&_expand=user`).then(r => r.json())
    }
}