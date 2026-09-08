import { storyblokEditable, StoryblokServerComponent, StoryblokServerRichText } from "@storyblok/react/rsc";
import Link from "next/link";

export default function Author({ blok }) {
	const authors = (blok.author ?? []).filter((a) => a?.content);

	return (
		<article {...storyblokEditable(blok)}>
			<h1>{blok.title}</h1>

			{authors.length > 0 && (
				<p>Written by: {authors.map((a) => a.content.name).join(', ')}</p>
			)}

			<StoryblokServerRichText doc={blok.body} />
			<Link href="/articles">Back to articles</Link>
		</article>
	);
}