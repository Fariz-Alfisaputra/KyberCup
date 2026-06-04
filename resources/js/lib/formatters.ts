/**
 * Format a date string into a localized Indonesian format.
 *
 * @example formatDate('2026-06-17') → "17 Jun 2026"
 * @example formatDate('2026-06-17T10:00:00Z', true) → "17 Jun 2026, 17:00 WIB"
 */
export function formatDate(dateStr: string | null | undefined, withTime = false): string {
    if (!dateStr) return '-';

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '-';

    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'Asia/Jakarta',
    };

    if (withTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.hour12 = false;
    }

    const formatted = date.toLocaleDateString('id-ID', options);
    return withTime ? `${formatted} WIB` : formatted;
}

/**
 * Format a number into Indonesian Rupiah format.
 *
 * @example formatCurrency(5000000) → "Rp 5.000.000"
 * @example formatCurrency(5000000.50) → "Rp 5.000.001"
 */
export function formatCurrency(amount: number | string | null | undefined): string {
    if (amount === null || amount === undefined) return '-';

    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(num)) return '-';

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(num);
}

/**
 * Decode HTML entities without using dangerouslySetInnerHTML.
 *
 * @example decodeHtmlEntities('&laquo; Previous') → '« Previous'
 */
export function decodeHtmlEntities(html: string): string {
    const map: Record<string, string> = {
        '&laquo;': '«',
        '&raquo;': '»',
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'",
        '&hellip;': '…',
        '&ndash;': '–',
        '&mdash;': '—',
    };

    return html.replace(/&[a-zA-Z0-9#]+;/g, (entity) => map[entity] || entity);
}
