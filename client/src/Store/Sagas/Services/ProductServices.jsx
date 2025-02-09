export async function addRecord(payload) {
    let response = await fetch("/api/product", {
        method: "post",
        headers: {
            "authorization": localStorage.getItem("token")
        },
        body: payload
    })
    return await response.json()
}

export async function getRecord() {
    let response = await fetch("/api/product", {
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}

export async function updateRecord(payload) {
    // let response = await fetch("/api/product/" + payload.id, {
    //     method: "put",
    //     headers: {
    //         "content-type": "application/json",
    //         "authorization": localStorage.getItem("token")
    //     },
    //     body: JSON.stringify(payload)
    // })
    // return await response.json()

    let response = await fetch("/api/product/" + payload.get("_id"), {
        method: "put",
        headers: {
            "authorization": localStorage.getItem("token")
        },
        body: payload
    })
    return await response.json()
}
export async function updateQuantity(payload) {
    let response = await fetch("/api/product/quantity/" + payload._id, {
        method: "put",
        headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(payload)
    })
    response = await response.json()
    return response
}

export async function deleteRecord(payload) {
    let response = await fetch("/api/product/" + payload._id, {
        method: "delete",
        headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("token")
        }
    })
    return await response.json()
}