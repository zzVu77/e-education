import React from "react";
import Link from "next/link";
import { Text } from "../ui/typography"; // hoặc đường dẫn đến Text của bạn

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  buttonText: string;
  buttonHref: string;
}

const EmptyState = ({
  icon,
  title,
  description,
  buttonText,
  buttonHref,
}: EmptyStateProps) => {
  return (
    <div className="bg-white rounded-lg text-center flex flex-col items-center w-full py-10 h-full">
      <div className="h-12 w-12 mb-4">{icon}</div>

      <Text className="text-xl font-medium text-gray-700 mb-2">{title}</Text>

      <Text className="text-gray-500 mb-6">{description}</Text>

      <Link
        href={buttonHref}
        className="inline-block bg-green-400 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition-colors font-medium"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default EmptyState;
