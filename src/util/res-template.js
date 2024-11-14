export const successResp = (data) => {
    return {
        header : "",
        payload : data,
        pagination : {
            page : "",
            max : "",
        },
    }
}

export const failedResp = (message) => {
    return {
        header : "",
        message : "",
    }
}