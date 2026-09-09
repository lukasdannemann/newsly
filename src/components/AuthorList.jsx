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
		<section {...storyblokEditable(blok)}>
			{blok.heading && (
				<h1 className="text-3xl font-bold tracking-tight text-neutral-900">
					{blok.heading}
				</h1>
			)}

			{authors.length === 0 ? (
				<p className="mt-8 text-neutral-500">
					{blok.empty_text || "Inga författare."}
				</p>
			) : (
				<div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
					{authors.map((author) => (
						<article key={author.uuid} className="group text-center">
							<Link href={`/${author.full_slug}`} className="block">
								{author.content.photo?.filename ? (
									<img
										src={author.content.photo.filename}
										alt={author.content.name}
										className="mx-auto h-28 w-28 rounded-full object-cover ring-1 ring-neutral-200 transition-all group-hover:ring-neutral-400"
									/>
								) : (
									<div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-neutral-100 text-2xl font-semibold text-neutral-400 transition-colors group-hover:bg-neutral-200">
										{author.content.name?.charAt(0)}
									</div>
								)}

								<h2 className="mt-4 text-sm font-semibold text-neutral-900 transition-colors group-hover:text-neutral-600">
									{author.content.name}
								</h2>
							</Link>
						</article>
					))}
				</div>
			)}
		</section>
	);
}