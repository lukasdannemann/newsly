import './globals.css';
import StoryblokProvider from '@/components/StoryblokProvider';

export const metadata = {
	title: 'Newsly',
	description: 'Nyhetssida med artiklar från Storyblok',
};

export default function RootLayout({ children }) {
	const currentYear = new Date().getFullYear();
	return (
		<StoryblokProvider>
			<html lang="en">
				<body>
					{children}
				</body>
			</html>
		</StoryblokProvider>
	);
}
