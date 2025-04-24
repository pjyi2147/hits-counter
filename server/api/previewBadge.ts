import generateBadge from "~/utils/generateBadge";
import pool from "~/utils/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let currentCount = 0;
  let totalCount = 0;
  if (query.url && typeof query.url === "string" && query.url.replace(" ", "").length > 0) {
    const res = await pool.query("SELECT * FROM tracking_urls WHERE url = $1", [query.url]);

    if (res.rows.length > 0) {
      totalCount = res.rows[0].total_hits;
      const today = await pool.query(
        `SELECT * FROM "${res.rows[0].id}" WHERE hit_date = NOW()::DATE`
      );
      if (today.rows.length === 1) {
        currentCount = today.rows[0].hit_count;
      }
    }
    setResponseHeaders(event, {
      "Content-Type": "image/svg+xml;charset=utf-8"
    });
    query.message = `${currentCount} / ${totalCount}`;
  }

  return generateBadge(query);
});
