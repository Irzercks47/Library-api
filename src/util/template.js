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

const paginateTemplate = () => {

}

module.exports = {
    respJson,
};