import generateBadge from "~/utils/generateBadge";
import pool from "~/utils/db";
import { v4 } from "uuid";
import { getIO } from "~/server/utils/socket";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let currentCount = 1;
  let totalCount = 1;
  if (query.url && typeof query.url === "string" && query.url.replace(" ", "").length > 0) {
    const io = getIO();
    if (io && io.engine.clientsCount > 0) {
      io.emit("hit", query.url);
    }
    const total = await pool.query(
      `UPDATE tracking_urls
       SET
       total_hits = total_hits + 1,
       today_hits = CASE
         WHEN track_datatime = NOW()::DATE THEN today_hits + 1
         ELSE 1
       END,
       track_datatime = NOW()::DATE
       WHERE url = $1
       RETURNING total_hits, today_hits, id`,
      [query.url]
    );

    if (total.rowCount === 0) {
      const newId = v4().toString();
      await pool.query(
        "INSERT INTO tracking_urls (id, url, total_hits, today_hits) VALUES ($1, $2, 1, 1);",
        [newId, query.url]
      );
    } else {
      totalCount = total.rows[0].total_hits;
      currentCount = total.rows[0].today_hits;
    }

    if (query.json && query.json === "true") {
      setResponseHeaders(event, {
        "Content-Type": "application/json"
      });
      return {
        today_hits: currentCount,
        total_hits: totalCount
      };
    }

    setResponseHeaders(event, {
      "Content-Type": "image/svg+xml;charset=utf-8"
    });
    query.message = `${currentCount} / ${totalCount}`;
    return generateBadge(query);
  }
});
