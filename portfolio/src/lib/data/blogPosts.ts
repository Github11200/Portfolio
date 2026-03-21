export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	image: string;
}

export const blogPosts: BlogPost[] = [
	{
		slug: "creating-citrus",
		title: "Creating Citrus 🍋 - Tetris Written in C",
		description:
			"My short little journey of creating Tetris in the terminal using C and its standard library.",
		date: "2025-04-21",
		image: "/creating-citrus/citrus.png",
	},
	{
		slug: "range-queries-part-one",
		title: "Range Queries, visualized (Part 1: Static Queries)",
		description:
			"Quick intro to static range queries.",
		date: "2024-08-22",
		image: "/range-queries-part-one/rqp1.jpg",
  },
  {
		slug: "range-queries-part-two",
		title: "Range Queries, visualized (Part 2: Binary Indexed Trees)",
		description:
			"A look into Binary Indexed Trees.",
		date: "2024-08-28",
		image: "/range-queries-part-two/rqp2.jpg",
  },
  {
		slug: "range-queries-part-three",
		title: "Range Queries, visualized (Part 3: Segment Trees)",
		description:
			"A quick dive into Segment Trees.",
		date: "2024-08-30",
		image: "/range-queries-part-three/rqp3.jpg",
	},
];
