const remoteURL = "http://localhost:5002"

export default {
    getLoans() {
        return fetch(`${remoteURL}/toolHistory`).then(r => r.json())
    },
    postLoan(newLoan) {
        return fetch(`${remoteURL}/toolHistory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLoan)
        }).then(data => data.json())
    }
}