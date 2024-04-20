import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface CardProps {
	title: string;
	image: string;
	description: string;
}

export const CardWrapper = ({ title, image, description }: CardProps) => {
	return (
		<Card className="w-[350px] border-l-border border-[1px] rounded-lg">
			<CardHeader>
				<CardTitle className="font-lexend">{title}</CardTitle>
			</CardHeader>
			<CardContent className="font-lexend font-light text-xl text-left">
				<Image src={image} height={403} width={403} alt={description} />
				<p>{description}</p>
			</CardContent>
		</Card>
	);
};
