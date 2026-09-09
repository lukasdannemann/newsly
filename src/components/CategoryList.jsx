import Link from 'next/link';
import { storyblokEditable } from '@storyblok/react/rsc';
import { resolveLink } from '@/lib/resolveLink';

export default function CategoryList({ blok }) {
	if (!blok) return null;

	const title = blok.Categories ?? blok.title ?? 'Kategorier';
	const href = blok.categorytitle ? resolveLink(blok.categorytitle) : null;

	return (
		<article className="group" {...storyblokEditable(blok)}>
			{href ? (
				<Link
					href={href}
					className="block text-lg font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-neutral-600"
				>
					{title}
				</Link>
			) : (
				<span className="text-lg font-semibold leading-snug text-neutral-900">
					{title}
				</span>
			)}
		</article>
	);
}
