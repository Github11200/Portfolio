import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Link as LucideLink } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    link: string;
}

export const ProjectCard = ({
    title,
    description,
    image,
    link,
}: ProjectCardProps) => {
    return (
        <Card className="w-80 lg:w-96 min-h-max">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <Image
                    src={image}
                    width={500}
                    height={500}
                    className="rounded-lg"
                    alt="Jinay Patel"
                />
                <CardDescription className="mt-4">
                    {description}
                </CardDescription>
            </CardContent>
            <CardFooter className="w-full">
                <Link href={link} target="_blank" className="w-full">
                    <Button className="font-bold size-12 p-6 w-full">
                        <LucideLink />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};
