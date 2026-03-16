import { blogPosts } from '$lib/data/blogPosts';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const post = blogPosts.find(p => p.slug === params.slug);

	if (!post) {
		error(404, 'Post not found');
	}

	return {
		post
	};
}
