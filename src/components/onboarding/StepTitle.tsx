import { motion } from "framer-motion";

interface StepTitleProps {
  title: string;
  subtitle: string;
}

export const StepTitle = ({ title, subtitle }: StepTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600">{subtitle}</p>
    </motion.div>
  );
};