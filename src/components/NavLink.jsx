// import Link from 'next/link';
// import {
// 	storyblokEditable
// } from '@storyblok/react/rsc';
// import { resolveLink } from '@/lib/resolveLink';

// export default function NavLink({ blok }) {
// 	if (!blok) return null;

// 	const href = resolveLink(blok.link);
// 	const isExternal = blok.link?.url?.startsWith('http');
// 	return (
// 		<li {...storyblokEditable(blok)}>
// 			{isExternal ? (
// 				<a href={href} target="_blank" rel="noopener noreferrer">
// 					{blok.label}
// 				</a>
// 			) : (
// 				<Link href={href} className="transition-colors hover:text-neutral-900">{blok.label}</Link>
// 			)}
// 		</li>
// 	);
// }

import Link from 'next/link';
import { storyblokEditable } from '@storyblok/react/rsc';
import { resolveLink } from '@/lib/resolveLink';

export default function NavLink({ blok }) {
	if (!blok) return null;

	const href = resolveLink(blok.link);
	const children = blok.children ?? [];
	const isExternal = blok.link?.url?.startsWith('http');

	return (
		<li className="group relative list-none" {...storyblokEditable(blok)}>
			<div className="flex items-center gap-1">
				{isExternal ? (
					<a
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						className="transition-colors hover:text-neutral-900"
					>
						{blok.label}
					</a>
				) : (
					<Link
						href={href}
						className="transition-colors hover:text-neutral-900"
					>
						{blok.label}
					</Link>
				)}

				{children.length > 0 && (
					<span aria-hidden="true" className="text-xs">
						⌄
					</span>
				)}
			</div>

			{children.length > 0 && (
				<ul
					className="
                        invisible absolute left-0 top-full z-50
                        min-w-48
                        translate-y-2
                        list-none
                        border border-neutral-200
                        bg-white
                        py-2
                        opacity-0
                        shadow-lg
                        transition-all
                        group-hover:visible
                        group-hover:translate-y-0
                        group-hover:opacity-100
                        group-focus-within:visible
                        group-focus-within:translate-y-0
                        group-focus-within:opacity-100
                    "
				>
					{children.map((child) => (
						<NavLink blok={child} key={child._uid} />
					))}
				</ul>
			)}
		</li>
	);
}
