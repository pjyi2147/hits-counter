import generateBadge from "~/utils/generateBadge";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  setResponseHeaders(event, {
    "Content-Type": "image/svg+xml;charset=utf-8",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0"
  });
  query.message = "0 / 0";

  return generateBadge(query);
});
