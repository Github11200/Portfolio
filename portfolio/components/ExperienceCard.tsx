import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface ExperienceCardProps {
    title: string;
    date: string;
    description: string;
    link: string;
}

export const ExperienceCard = ({
    title,
    date,
    description,
    link,
}: ExperienceCardProps) => {
    return (
        <Link href={link} target="_blank">
            <Card className="w-80 sm:w-10/12 lg:w-7/12 xl:w-6/12 mx-auto">
                <CardHeader>
                    <CardTitle className="inline">
                        {title} <ExternalLink className="inline ml-2" />
                    </CardTitle>

                    <CardDescription>{date}</CardDescription>
                </CardHeader>
                <CardContent>
                    <CardDescription>{description}</CardDescription>
                </CardContent>
            </Card>
        </Link>
    );
};
