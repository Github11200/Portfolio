export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	image: string;
	date: string;
}

export const blogPosts: BlogPost[] = [
	{
		slug: "creating-citrus",
		title: "Creating Citrus 🍋 - Tetris Written in C",
		description:
			"My short little journey of creating Tetris in the terminal using C and its standard library.",
		image: "/creating-citrus/citrus.png",
		date: "2025-12-15",
	},
	{
		slug: "process-scheduling",
		title: "How Process Scheduling Actually Works",
		description:
			"Peeling back the OS abstractions to understand preemption and context switching.",
		image: "https://picsum.photos/960/540?random=6",
		date: "2025-12-10",
	},
	{
		slug: "backpropagation-visually",
		title: "Backpropagation, Visually",
		description:
			"Building up an intuition for gradients without drowning in the math.",
		image: "https://picsum.photos/960/540?random=7",
		date: "2025-12-05",
	},
	{
		slug: "pointers-not-scary",
		title: "Pointers Are Not Scary",
		description:
			"A ground-up explanation of memory addresses, dereferencing, and pointer arithmetic.",
		image: "https://picsum.photos/960/540?random=8",
		date: "2025-11-30",
	},
	{
		slug: "attention-transformer-paper",
		title: "Attention Is All You Need — Annotated",
		description:
			"My line-by-line notes on the original transformer paper with diagrams.",
		image: "https://picsum.photos/960/540?random=9",
		date: "2025-11-25",
	},
];
