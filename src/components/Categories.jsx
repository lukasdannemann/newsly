import Link from 'next/link';

export default function Categories({ categoryName, articles }) {
	return (
		<section className="article-list">
			<h1>{categoryName}</h1>
			{articles.length === 0 ? (
				<p>Inga artiklar i denna kategori.</p>
			) : (
				<div className="article-list_items">
					{articles.map((article) => {
						const authorNames = (article.content.author ?? [])
							.filter((author) => author?.content)
							.map((author) => author.content.name)
							.join(', ');

						return (
							<article key={article.uuid}>
								{article.content.coverImage?.filename && (
									<img
										src={article.content.coverImage.filename}
										alt={
											article.content.coverImage.alt || article.content.title
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
