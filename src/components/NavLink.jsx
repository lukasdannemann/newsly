import Link from 'next/link';
import {
	storyblokEditable
} from '@storyblok/react/rsc';
import { resolveLink } from '@/lib/resolveLink';

export default function NavLink({ blok }) {
	if (!blok) return null;

	const href = resolveLink(blok.link);
	const isExternal = blok.link?.url?.startsWith('http');
	return (
		<li {...storyblokEditable(blok)}>
			{isExternal ? (
				<a href={href} target="_blank" rel="noopener noreferrer">
					{blok.label}
				</a>
			) : (
				<Link href={href} className="transition-colors hover:text-neutral-900">{blok.label}</Link>
			)}
		</li>
	);
}
