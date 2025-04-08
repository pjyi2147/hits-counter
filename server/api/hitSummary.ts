import pool from "~/utils/db"

export default defineEventHandler(async () => {
    const summary = await pool.query('SELECT COUNT(id)::INT, SUM(tracking_urls.total_hits)::INT from tracking_urls')
    return {
        urlCount: summary.rows[0].count,
        urlTotalHits: summary.rows[0].sum
    }
})