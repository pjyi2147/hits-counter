import generateBadge from "~/utils/generateBadge";
import pool from "~/utils/db";
import { v4 } from "uuid";

export default defineEventHandler(async (event) => {
	const query = getQuery(event)
	let currentCount = 1;
	let totalCount = 1;
	if (query.url){
		const res = await pool.query('SELECT * FROM tracking_urls WHERE url = $1', [query.url])
		if (res.rowCount === 0){
			const newId = v4().toString()
			await pool.query('INSERT INTO tracking_urls (id, url, total_hits) VALUES ($1, $2, 1);', [newId, query.url])
			await pool.query(`CREATE TABLE "${newId}" (hit_date DATE, hit_count INT)`)
			await pool.query(`INSERT INTO "${newId}" (hit_date, hit_count) VALUES (NOW()::DATE, 1)`)

		}else{
			const existId = res.rows[0].id;
			const checkCurrentDate =
				await pool.query(`SELECT * FROM "${existId}" WHERE hit_date = NOW()::DATE`)
			if (checkCurrentDate.rowCount == 0){
				await pool.query(`INSERT INTO "${existId}" (hit_date, hit_count) VALUES (NOW()::DATE, 1)`)
			}else{
				const newhit = await pool.query(`UPDATE "${existId}" AS T SET hit_count = hit_count + 1 WHERE hit_date = NOW()::DATE RETURNING T.hit_count`)
				currentCount = newhit.rows[0].hit_count
			}
			const total = await pool.query(`UPDATE tracking_urls AS T SET total_hits = total_hits + 1 WHERE id = $1 RETURNING T.total_hits`, [existId])
			totalCount = total.rows[0].total_hits
		}
	}

	if (query.output && query.output === 'json'){
		return {
			'today_hits': currentCount,
			'total_hits': totalCount
		}
	}else{
		setResponseHeaders(event, {
			"Content-Type": "image/svg+xml;charset=utf-8",
		});
		query.message = `${currentCount} / ${totalCount}`
		return generateBadge(query)
	}
})
