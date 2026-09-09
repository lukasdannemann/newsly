import Link from 'next/link';

export default function Categories({ categoryName, articles }) {
	return (
		<section>
			<h1 className="text-3xl font-bold tracking-tight text-neutral-900">
				{categoryName}
			</h1>

			{articles.length === 0 ? (
				<p className="mt-8 text-neutral-500">Inga artiklar i denna kategori.</p>
			) : (
				<div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{articles.map((article) => {
						const authorNames = (article.content.author ?? [])
							.filter((author) => author?.content)
							.map((author) => author.content.name)
							.join(', ');

						return (
							<article key={article.uuid} className="group">
								{article.content.coverImage?.filename && (
									<Link
										href={`/${article.full_slug}`}
										className="mb-4 block overflow-hidden rounded-lg bg-neutral-100"
									>
										<img
											src={article.content.coverImage.filename}
											alt={
												article.content.coverImage.alt || article.content.title
											}
											className="aspect-3/2 w-full object-cover transition-transform duration-300 group-hover:scale-105"
										/>
									</Link>
								)}

								<h2 className="text-lg font-semibold leading-snug text-neutral-900">
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

								{authorNames && (
									<p className="mt-3 text-xs text-neutral-400">{authorNames}</p>
								)}
							</article>
						);
					})}
				</div>
			)}
		</section>
	);
}
