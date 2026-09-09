import Link from 'next/link';
import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';
import { resolveLink } from '@/lib/resolveLink';

function getNavHref(link) {
	if (!link) return null;

	const raw = link.cached_url || link.url || '';
	if (!raw) return null;

	// URL-länk eller extern — använd som den är
	if (raw.startsWith('http') || raw.startsWith('/')) return raw;

	// Story-länk — lägg till snedstreck framför
	return `/${raw}`;
}

export default function NavLink({ blok }) {
	if (!blok) return null;

	const href = getNavHref(blok.link);
	const hasChildren = blok.children?.length > 0;

	return (
		<li
			{...storyblokEditable(blok)}
			className={hasChildren ? 'has-submenu' : undefined}
		>
			{href ? <Link href={href}>{blok.label}</Link> : <span>{blok.label}</span>}

			{hasChildren && (
				<ul>
					{blok.children.map((child) => (
						<StoryblokServerComponent blok={child} key={child._uid} />
					))}
				</ul>
			)}
		</li>
	);
}
