import { storyblokEditable, StoryblokServerRichText } from "@storyblok/react/rsc";
import Link from "next/link";

export default function Article({ blok }) {
	const authors = (blok.author ?? []).filter((a) => a?.content);

	return (
		<article {...storyblokEditable(blok)}>
			<h1>{blok.title}</h1>

			{authors.length > 0 && (
				<p>
					Written by:{' '}
					{authors.map((author, i) => (
						<span key={author.uuid}>
							{i > 0 && ', '}
							<Link href={`/${author.full_slug}`}>{author.content.name}</Link>
						</span>
					))}
				</p>
			)}

			<StoryblokServerRichText doc={blok.body} />
			<Link href="/articles">Back to articles</Link>
		</article>
	);
}