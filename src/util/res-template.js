const successResp = (data) => {
    return {
        header : "",
        payload : data,
        pagination : {
            page : "",
            max : "",
        },
    }
}

const failedResp = (message) => {
    return {
        header : "",
        message : "",
    }
}

module.exports = respose_template;