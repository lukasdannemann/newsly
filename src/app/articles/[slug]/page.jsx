import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokServerComponent } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.getStories({
		version: 'published',
		starts_with: 'articles/',
		content_type: 'article',
	});

	return data.stories.map((story) => ({
		slug: story.slug,
	}));
}

export async function generateMetadata({ params }) {
	const { slug } = await params;

	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.get(`cdn/stories/articles/${slug}`, {
		version: 'draft',
	});

	// console.log(JSON.stringify(data.story, null, 2));

	return {
		title: data.story.name,
		description: data.story.content.summary,
	};
}

export default async function ArticlePage({ params }) {
	const { slug } = await params;
	const storyblokApi = getStoryblokApi();

	let story;
	try {
		const { data } = await storyblokApi.get(`cdn/stories/articles/${slug}`, {
			version: 'draft',
			resolve_relations: ['article.author'],
		});
		story = data.story;
	} catch {
		notFound();
	}

	return <StoryblokServerComponent blok={story.content} />;
}
