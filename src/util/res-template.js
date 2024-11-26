const successResp = (data) => {
    return {
        meta: "",
        payload: data,
        pagination: {
            pages: "",
            total_pages: "",
        },
    }
}

const failedResp = (message, code) => {
    return {
        header: "",
        message: "",
    }
}

module.exports = respose_template;