const getPaginatedData = (table) => {
    const query = ` SELECT *
                    FROM ${table}
                    ORDER BY ${table === 'enrollments' ? 'user_id' : '_id'}
                    LIMIT $1 OFFSET $2`
    return query
}
const getTotalRec = (table) => {
    const query = `SELECT COUNT(*) FROM ${table}`
    return query
}
module.exports = { getPaginatedData, getTotalRec }