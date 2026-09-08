import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import Link from "next/link";

export default function Header({ blok }) {
    return (
        <header {...storyblokEditable(blok)}>
            {blok.h1 && (
                <h1>
                    <Link href="/">{blok.h1}</Link>
                </h1>
            )}
            <nav>
                <ul>
                    {blok.navigation?.map((navBlok) => (
                        <StoryblokServerComponent blok={navBlok} key={navBlok._uid} />
                    ))}
                </ul>
            </nav>
        </header>
    );
}
