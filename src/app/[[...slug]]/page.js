import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
	const { slug } = await params;
	const fullSlug = slug ? slug.join('/') : 'home';

	const storyblokApi = getStoryblokApi();

	let data;
	try {
		({ data } = await storyblokApi.get(
			`cdn/stories/${fullSlug}`,
			{ version: 'draft' },
			{ cache: 'no-store' }
		));
	} catch (error) {
		if (error.status === 404) notFound();
		throw error;
	}

	return <StoryblokStory story={data.story} />;
}