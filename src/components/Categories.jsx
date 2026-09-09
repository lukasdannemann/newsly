import Link from 'next/link';

export default function Categories({ categoryName, articles }) {
	return (
		<section>
			<h1 className="text-3xl font-bold tracking-tight text-neutral-900">
				{categoryName}
			</h1>
		</section>
	);
}
