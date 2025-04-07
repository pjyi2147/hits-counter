import generateBadge from "~/utils/generateBadge";
import pool from "~/utils/db";
import { v4 } from "uuid";
import {getIO} from "~/server/utils/socket";

export default defineEventHandler(async (event) => {
	let start = Date.now();
	const query = getQuery(event)
	let currentCount = 1;
	let totalCount = 1;
	if (query.url && query.url.replace(" ", "").length > 0){
		const io = getIO()
		if (io && io.engine.clientsCount > 0) {
			io.emit('hit', query.url)
			console.log('Emit Hit: ' + query.url)
		}
		const total =
			await pool.query(`UPDATE tracking_urls AS T SET total_hits = total_hits + 1 WHERE T.url = $1 RETURNING T.total_hits, T.id`, [query.url])
		if (total.rowCount === 0){
			const newId = v4().toString()
			await pool.query('INSERT INTO tracking_urls (id, url, total_hits) VALUES ($1, $2, 1);', [newId, query.url])
			await pool.query(`CREATE TABLE "${newId}" (hit_date DATE, hit_count INT)`)
			await pool.query(`INSERT INTO "${newId}" (hit_date, hit_count) VALUES (NOW()::DATE, 1)`)
		}else{
			totalCount = total.rows[0].total_hits
			const existId = total.rows[0].id;
			const newhit = await pool.query(`SELECT update_hit_count_dynamic('${existId}')`)
			currentCount = newhit.rows[0].update_hit_count_dynamic

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
		console.log(`Hit Took: ${Date.now() - start}ms`)
		return generateBadge(query)
	}
})
