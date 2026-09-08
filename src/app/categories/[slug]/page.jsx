import { getStoryblokApi } from '@/lib/storyblok';

import Categories from '@/components/Categories';
export default async function CategoryPage({ params }) {
	const { slug } = await params;
	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.getStories({
		version: 'draft',
		starts_with: 'articles/',
		content_type: 'article',
		filter_query: {
			category: {
				in: slug,
			},
		},
		resolve_relations: ['article.author'],
		excluding_fields: 'body',
		sort_by: 'created_at:desc',
	});

	const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

	return <Categories categoryName={categoryName} articles={data.stories} />;
}
