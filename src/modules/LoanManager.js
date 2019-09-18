const remoteURL = "http://localhost:5002"

export default {
    getLoans() {
        return fetch(`${remoteURL}/toolHistory?_expand=tool&_expand=user`).then(r => r.json())
    },
    postLoan(newLoan) {
        return fetch(`${remoteURL}/toolHistory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLoan)
        }).then(data => data.json())
    },
    returnLoan(id) {
        return fetch(`${remoteURL}/toolHistory/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ dateReturned: Date.now() })
        }).then(d => d.json())
    }
}