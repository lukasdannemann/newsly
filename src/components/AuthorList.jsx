import { storyblokEditable } from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/lib/storyblok";
import Link from "next/link";

export default async function AuthorList({ blok }) {
	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.getStories({
		version: "draft",
		starts_with: "authors/",
		content_type: "author",
		sort_by: "content.name:asc",
	});

	const authors = data.stories;

	return (
		<section className="author-list" {...storyblokEditable(blok)}>
			{blok.heading && <h1>{blok.heading}</h1>}

			{authors.length === 0 ? (
				<p>{blok.empty_text || "Inga authors."}</p>
			) : (
				<div className="author-list_items">
					{authors.map((author) => (
						<article key={author.uuid}>
							{author.content.image?.filename && (
								<img
									src={author.content.image.filename}
									alt={author.content.name}
								/>
							)}

							<h2>
								<Link href={`/${author.full_slug}`}>
									{author.content.name}
								</Link>
							</h2>
						</article>
					))}
				</div>
			)}
		</section>
	);
}