const { paginateTemplate } = require("./template");

const bites_util = {
    curr_date: new Date().toISOString(),
    offset: (page, limit) => (page - 1) * limit,
    page: (page) => Math.max(parseInt(page, 10) || 1),
    limit: (limit) => Math.max(parseInt(limit, 10) || 10),
}

const paginate = async (query, countSql, limit, page) => {
    try {
        // Get the total number of logs
        const totalResult = await query(countSql);
        const total = totalResult[0].total;

        // Calculate pagination metadata
        const totalPages = Math.ceil(total / limit);
        // console.log(paginateTemplate(page, limit, totalPages, total))
        return paginateTemplate(page, totalPages)
    } catch (err) {
        return null
    }
}

module.exports = {
    bites_util,
    paginate
}