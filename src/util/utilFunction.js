const { paginateTemplate } = require("./template");

const bites_util = {
    get curr_date() { return new Date().toISOString() },
    offset: (page, limit) => (page - 1) * limit,
    page: (page) => Math.max(parseInt(page, 10) || 1),
    limit: (limit) => Math.min(Math.max(parseInt(limit, 10) || 10), 100),
    intParse: (stock) => parseInt(stock)
}

const paginate = async (query, countSql, sqlParams, limit, page) => {
    try {
        // Get the total number of logs
        const totalResult = await query(countSql, sqlParams);
        const total = totalResult[0].total;
        // Calculate pagination metadata
        const totalPages = Math.ceil(total / limit);
        return paginateTemplate(page, totalPages)
    } catch (err) {
        return null
    }
}

module.exports = {
    bites_util,
    paginate
}