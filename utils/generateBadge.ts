import { makeBadge, ValidationError } from 'badge-maker'
import { readFile } from 'fs/promises';
import { resolve } from 'path';


export default async function  (config: Object) {
    let icon = undefined;
    if (config.icon){
        const filePath = resolve(`public/icons/${config.icon}.svg`);
        try {
            const svg = await readFile(filePath, 'utf-8');
            const nSvg = svg.replace('currentColor', 'white')
            const base64 = Buffer.from(nSvg).toString('base64');
            icon = `data:image/svg+xml;base64,${base64}`
        } catch (error) {
            console.log(error)
            throw createError({ statusCode: 404, statusMessage: 'SVG not found' });
        }
    }

    const format = {
        label: config.label ? config.label : '',
        message: config.message,
        color: config.color ? config.color : 'brightgreen',
        logoBase64 : ''
    }

    if (icon) format['logoBase64'] = icon;

    const svg = makeBadge(format)
    return svg
}