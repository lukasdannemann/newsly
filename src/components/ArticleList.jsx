import { storyblokEditable } from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/lib/storyblok";
import Link from "next/link";

export default async function ArticleList({ blok }) {
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
		<section {...storyblokEditable(blok)}>
			{blok.heading && (
				<h1 className="text-3xl font-bold tracking-tight text-neutral-900">
					{blok.heading}
				</h1>
			)}

			{articles.length === 0 ? (
				<p className="mt-8 text-neutral-500">
					{blok.empty_text || "Inga artiklar."}
				</p>
			) : (
				<div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{articles.map((article) => {
						const authors = (article.content.author ?? []).filter((a) => a?.content);

						return (
							<article key={article.uuid} className="group flex flex-col">
								{article.content.coverImage?.filename && (
									<Link href={`/${article.full_slug}`} className="mb-4 block overflow-hidden rounded-lg bg-neutral-100">
										<img
											src={article.content.coverImage.filename}
											alt={
												article.content.coverImage.alt ||
												article.content.title
											}
											className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
										/>
									</Link>
								)}

								{article.content.category && (
									<span className="self-start inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-neutral-600">
										{article.content.category}
									</span>
								)}

								<h2 className="mt-2 text-lg font-semibold leading-snug text-neutral-900">
									<Link
										href={`/${article.full_slug}`}
										className="transition-colors group-hover:text-neutral-600"
									>
										{article.content.title}
									</Link>
								</h2>

								<p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-600">
									{article.content.summary}
								</p>

								{authors.length > 0 && (
									<p className="mt-3 text-xs text-neutral-400">
										{authors.map((author, i) => (
											<span key={author.uuid}>
												{i > 0 && ', '}
												<Link
													href={`/${author.full_slug}`}
													className="transition-colors hover:text-neutral-700"
												>
													{author.content.name}
												</Link>
											</span>
										))}
									</p>
								)}
							</article>
						);
					})}
				</div>
			)}
		</section>
	);
}