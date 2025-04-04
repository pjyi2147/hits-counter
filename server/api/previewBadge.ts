import generateBadge from "~/utils/generateBadge";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    setResponseHeaders(event, {
        "Content-Type": "image/svg+xml;charset=utf-8",
    });
    return generateBadge(query)
})
