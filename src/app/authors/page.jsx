import { getStoryblokApi } from '@/lib/storyblok';
import {StoryblokStory} from '@storyblok/react/rsc';
import {notFound} from 'next/navigation';

export default async function AuthorsPage() {
  const storyblokApi = getStoryblokApi();

  let story;
  try {
    const { data } = await storyblokApi.get("cdn/stories/authors", {
      version: "draft",
    });
    story = data.story;
  } catch (error) {
    if (error.status === 404) notFound();
    throw error;
  }

  return <StoryblokStory story={story} />;
}