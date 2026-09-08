import { storyblokEditable } from "@storyblok/react/rsc";

export default function Footer({ blok }) {
  return (
    <footer {...storyblokEditable(blok)}>
      <p>{blok.copyright}</p>
      {blok.description && <p>{blok.description}</p>}
    </footer>
  );
}
