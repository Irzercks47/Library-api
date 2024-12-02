const respJson = (status_code, data, status_message, paginate, res) => {
    //json response template
    res.json(status_code, [
        {
            payload: data,
            meta: {
                status_code: status_code,
                status_message: status_message,
                pagination: paginate,
                timestamp: new Date().toISOString(),
            }
        }
    ])
}

const paginateTemplate = (page, totalPages) => {
    return {
        "current_page": parseInt(page),
        "total_pages": totalPages,
    }
}

module.exports = {
    respJson,
    paginateTemplate,
};