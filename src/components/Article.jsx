import { storyblokEditable, StoryblokServerRichText } from "@storyblok/react/rsc";
import Link from "next/link";

export default function Article({ blok }) {
	const authors = (blok.author ?? []).filter((a) => a?.content);

	return (
		<article className="mx-auto max-w-2xl" {...storyblokEditable(blok)}>
			{blok.category && (
				<span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-neutral-600">
					{blok.category}
				</span>
			)}

			<h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-neutral-900">
				{blok.title}
			</h1>

			{authors.length > 0 && (
				<p className="mt-4 text-sm text-neutral-500">
					Written by{' '}
					{authors.map((author, i) => (
						<span key={author.uuid}>
							{i > 0 && ', '}
							<Link
								href={`/${author.full_slug}`}
								className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
							>
								{author.content.name}
							</Link>
						</span>
					))}
				</p>
			)}

			<hr className="my-8 border-neutral-200" />

			<div className="prose prose-neutral max-w-none">
				<StoryblokServerRichText doc={blok.body} />
			</div>

			<Link
				href="/articles"
				className="mt-12 inline-block text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
			>
				← Back to articles
			</Link>
		</article>
	);
}