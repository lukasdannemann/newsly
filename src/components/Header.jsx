import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import Link from "next/link";

export default function Header({ blok }) {

	return (
		<header
			className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur"
			{...storyblokEditable(blok)}
		>
			<div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
				{blok.h1 && (
					<h1 className="text-xl font-semibold tracking-tight">
						<Link href="/" className="hover:text-neutral-600 transition-colors">
							{blok.h1}
						</Link>
					</h1>
				)}

				<nav>
					<ul className="flex items-center gap-6 text-sm font-medium text-neutral-600">
						{blok.navigation?.map((navBlok) => (
							<StoryblokServerComponent blok={navBlok} key={navBlok._uid} />
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
}