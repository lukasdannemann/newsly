import { storyblokEditable } from "@storyblok/react/rsc";
import Link from "next/link";

export default function Author({ blok }) {
	return (
		<article className="author" {...storyblokEditable(blok)}>
			{blok.image?.filename && (
				<img src={blok.image.filename} alt={blok.name} />
			)}

			<h1>{blok.name}</h1>

			{blok.bio && <p>{blok.bio}</p>}

			<Link href="/authors">Back to authors</Link>
		</article>
	);
}