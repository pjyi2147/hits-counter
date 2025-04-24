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
                total_hits INTEGER DEFAULT 0
            )
        `);

    const summary = await pool.query(
      "SELECT COUNT(id)::INT, SUM(tracking_urls.total_hits)::INT from tracking_urls"
    );
    console.log("Summary:", summary.rows[0]);
    return {
      urlCount: summary.rows[0].count,
      urlTotalHits: summary.rows[0].sum ? summary.rows[0].sum : 0
    };
  } catch (error) {
    console.error("Error in hitSummary:", error);
    throw error;
  }
});
