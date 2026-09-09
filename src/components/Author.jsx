import { storyblokEditable } from "@storyblok/react/rsc";
import Link from "next/link";

export default function Author({ blok }) {
	return (
		<article className="mx-auto max-w-2xl text-center" {...storyblokEditable(blok)}>
			{blok.photo?.filename ? (
				<img
					src={blok.photo.filename}
					alt={blok.name}
					width={160}
					height={160}
					className="mx-auto h-40 w-40 rounded-full object-cover ring-1 ring-neutral-200"
				/>
			) : (
				<div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-neutral-100 text-4xl font-semibold text-neutral-400">
					{blok.name?.charAt(0)}
				</div>
			)}

			<h1 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900">
				{blok.name}
			</h1>

			{blok.bio && (
				<p className="mx-auto mt-4 max-w-prose text-base leading-relaxed text-neutral-600">
					{blok.bio}
				</p>
			)}

			<Link
				href="/authors"
				className="mt-10 inline-block text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
			>
				← Back to authors
			</Link>
		</article>
	);
}