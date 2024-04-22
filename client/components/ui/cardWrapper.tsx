import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
	title: string;
	image: string;
	description: string;
	link: string;
}

export const CardWrapper = ({ title, image, description, link }: CardProps) => {
	return (
		<Link href={link} target="_blank">
			<Card className="w-[350px] border-l-border border-[1px] rounded-lg font-lexend">
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent className="font-light text-xl text-left">
					<Image
						src={image}
						height={403}
						width={403}
						alt={description}
						className="rounded-lg"
					/>
					<p className="pt-6">{description}</p>
				</CardContent>
			</Card>
		</Link>
	);
};
