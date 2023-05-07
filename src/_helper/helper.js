export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const tailSlashRegex = /\/(\d+)\/$/;

export function padZero(id)
{
    return String(id).padStart(5, '0');
}
