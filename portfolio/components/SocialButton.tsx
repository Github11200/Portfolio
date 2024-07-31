import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SocialButtonProps {
    link: string;
    image: string;
    yOffset: number;
}

export const SocialButton = ({ link, image, yOffset }: SocialButtonProps) => {
    return (
        <Link
            href={link}
            target="_blank"
            className={`w-full not-visible translate-y-[${yOffset}%] blur`}
        >
            <Button className="w-full">
                <Image src={image} width={25} height={25} alt="Jinay Patel" />
            </Button>
        </Link>
    );
};
