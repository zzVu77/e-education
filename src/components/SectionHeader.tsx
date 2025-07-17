import React from "react";

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconClassName?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  description,
  className = "",
}) => {
  return (
    <section
      className={`w-full bg-gradient-to-l from-green-300 to-green-500 text-white py-7 ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-4">
          {icon}
          <h1 className="text-3xl md:text-4xl font-bold text-shadow-2xs">
            {title}
          </h1>
        </div>
        <p className="text-white font-semibold max-w-3xl text-shadow-2xs">
          {description}
        </p>
      </div>
    </section>
  );
};

export default SectionHeader;
