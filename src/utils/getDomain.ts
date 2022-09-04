// src/utils/getDomain.ts

import { isUri } from 'valid-url';

export default function getDomain(url: string): string {
    if (!isUri) return url;
    const domain = new URL(url).hostname;
    return domain;
}