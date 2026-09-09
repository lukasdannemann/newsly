import { storyblokEditable } from "@storyblok/react/rsc";

export default function Footer({ blok }) {
	if (!blok) return null;

	return (
		<footer
			className="mt-16 border-t border-neutral-200 bg-neutral-50"
			{...storyblokEditable(blok)}
		>
			<div className="mx-auto justify-center flex max-w-5xl flex-wrap items-center gap-x-1 px-6 py-8 text-sm text-neutral-500">
				<p>{blok.copyright}</p>
				{blok.description && <p>{blok.description}</p>}
			</div>
		</footer>
	);
}