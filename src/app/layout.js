import './globals.css';
import StoryblokProvider from '@/components/StoryblokProvider';
import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokServerComponent } from '@storyblok/react/rsc';

export const metadata = {
	title: 'Newsly',
	description: 'Nyhetssida med artiklar från Storyblok',
};

export default async function RootLayout({ children }) {

	let config = null;

	const storyblokApi = getStoryblokApi();

	try {
		const { data } = await storyblokApi.get("cdn/stories/config", {
		  version: "draft",
		});
		config = data.story;
	  } catch (error) {
		if (error.status === 404) notFound();
		throw error;
	  }

	  const headerBlok = config?.content?.header?.[0];
	  const footerBlok = config?.content?.footer?.[0];


	return (
		<StoryblokProvider>
			<html lang="en">
				<body>
					{headerBlok && <StoryblokServerComponent blok={headerBlok} />}
					{children}
					{footerBlok && <StoryblokServerComponent blok={footerBlok} />}
				</body>
			</html>
		</StoryblokProvider>
	);
}
