import Page from '@/components/Page';
import Article from '@/components/Article';
import ArticleList from '@/components/ArticleList';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NavLink from '@/components/NavLink';
import Author from '@/components/Author';
import AuthorList from '@/components/AuthorList';
import CategoryList from '@/components/CategoryList';
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

export const getStoryblokApi = storyblokInit({
	accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
	use: [apiPlugin],
	components: {
		page: Page,
		article: Article,
		article_list: ArticleList,
		footer: Footer,
		header: Header,
		'nav-link': NavLink,
		author: Author,
		author_list: AuthorList,
		categories: CategoryList,
	},
	apiOptions: {
		/** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
		region: process.env.STORYBLOK_REGION || 'eu',
		/** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
		endpoint: process.env.STORYBLOK_API_BASE_URL
			? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
			: undefined,
	},
});
