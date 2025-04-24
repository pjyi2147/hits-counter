import { makeBadge, ValidationError } from "badge-maker";
import { readFile } from "fs/promises";
import { resolve } from "path";

export default async function (query: Object) {
  let icon = undefined;
  if (query.icon) {
    const filePath = resolve(`public/icons/${query.icon}.svg`);
    try {
      const svg = await readFile(filePath, "utf-8");
      const nSvg = svg.replace("currentColor", "white");
      const base64 = Buffer.from(nSvg).toString("base64");
      icon = `data:image/svg+xml;base64,${base64}`;
    } catch (error) {
      console.error(error);
      throw createError({ statusCode: 404, statusMessage: "SVG not found" });
    }
  }

  const format = {
    label: query.label ? query.label : "",
    message: query.message,
    color: query.color ? query.color : "brightgreen",
    logoBase64: ""
  };

  if (icon) format["logoBase64"] = icon;

  const svg = makeBadge(format);
  return svg;
}
