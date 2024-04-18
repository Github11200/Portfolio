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
		<Card className="w-[350px] border-[#25274F] bg-gradient-to-br from-[#181d3445] to-[#3f3da62e]">
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
