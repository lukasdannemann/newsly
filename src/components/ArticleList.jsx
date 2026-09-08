import { storyblokEditable } from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/lib/storyblok";
import Link from "next/link";

export default async function BlogList({ blok }) {
	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.getStories({
		version: "draft",
		starts_with: "articles/",
		content_type: "article",
		resolve_relations: ["article.author"],
		excluding_fields: "body",
		sort_by: "created_at:desc",
		per_page: Number(blok.max_articles) || 20,
	});

	const articles = data.stories;

	return (
		<section className="article-list" {...storyblokEditable(blok)}>
			{blok.heading && <h1>{blok.heading}</h1>}

			{articles.length === 0 ? (
				<p>{blok.empty_text || "Inga artiklar."}</p>
			) : (
				<div className="article-list_items">
					{articles.map((article) => {
						const authorNames = (article.content.author ?? [])
							.filter((a) => a?.content)
							.map((a) => a.content.name)
							.join(", ");

						return (
							<article key={article.uuid}>
								{article.content.coverImage?.filename && (
									<img
										src={article.content.coverImage.filename}
										alt={
											article.content.coverImage.alt ||
											article.content.title
										}
									/>
								)}

								<div>
									<h2>
										<Link href={`/${article.full_slug}`}>
											{article.content.title}
										</Link>
									</h2>

									<p>{article.content.summary}</p>

									{authorNames && (
										<p className="author">Written by: {authorNames}</p>
									)}
								</div>
							</article>
						);
					})}
				</div>
			)}
		</section>
	);
}