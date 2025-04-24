import pool from "~/utils/db";

export default defineEventHandler(async () => {
  try {
    // Create the tracking_urls table if it doesn't exist
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tracking_urls (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        url VARCHAR NOT NULL,
        track_datatime DATE DEFAULT NOW()::DATE,
        total_hits INTEGER DEFAULT 0,
        today_hits INTEGER DEFAULT 0
      )`);

    const summary = await pool.query(
      "SELECT COUNT(id)::INT, SUM(tracking_urls.total_hits)::INT AS total_sum, SUM(tracking_urls.today_hits)::INT AS today_sum from tracking_urls"
    );
    return {
      urlCount: summary.rows[0].count,
      urlTotalHits: summary.rows[0].total_sum ? summary.rows[0].total_sum : 0,
      urlTodayHits: summary.rows[0].today_sum ? summary.rows[0].today_sum : 0
    };
  } catch (error) {
    console.error("Error in hitSummary:", error);
    throw error;
  }
});
