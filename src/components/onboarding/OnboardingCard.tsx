import { motion } from "framer-motion";
import { ReactNode } from "react";

interface OnboardingCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
}

export const OnboardingCard = ({
  icon,
  title,
  description,
  selected = false,
  onClick,
}: OnboardingCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 ${
        selected
          ? "border-primary bg-primary/5"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-start space-x-4">
        <div
          className={`p-3 rounded-lg ${
            selected ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
          }`}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};