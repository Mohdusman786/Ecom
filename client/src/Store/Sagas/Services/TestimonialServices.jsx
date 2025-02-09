export async function addRecord(payload) {
    // let response = await fetch("/api/testimonial", {
    //     method: "post",
    //     headers: {
    //         "content-type": "application/json"
    //     },
    //     body: JSON.stringify(payload)
    // })
    // return await response.json()

    //When Real API is Used
    let response = await fetch("/api/testimonial", {
        method: "post",
        headers: {
            "authorization": localStorage.getItem("token")
        },
        body: payload
    })
    return await response.json()
}

export async function getRecord() {
    let response = await fetch("/api/testimonial", {
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}

export async function updateRecord(payload) {
    // let response = await fetch("/api/testimonial/" + payload.id, {
    //     method: "put",
    //     headers: {
    //         "content-type": "application/json"
    //     },
    //     body: JSON.stringify(payload)
    // })
    // return await response.json()

    //When Real API is Used
    let response = await fetch("/api/testimonial/" + payload.get('_id'), {
        method: "put",
        headers: {
            "authorization": localStorage.getItem("token")
        },
        body: payload
    })
    return await response.json()
}

export async function deleteRecord(payload) {
    let response = await fetch("/api/testimonial/" + payload._id, {
        method: "delete",
        headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("token")
        }
    })
    return await response.json()
}