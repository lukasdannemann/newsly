
export function resolveLink(link) {
	if (!link) return '#';

	switch (link.linktype) {
		case 'story':
			return link.cached_url ? `/${link.cached_url.replace(/\/$/, '')}` : '#';
		case 'email':
			return `mailto:${link.email}`;
		default:
			return link.url || link.cached_url || '#';
	}
}