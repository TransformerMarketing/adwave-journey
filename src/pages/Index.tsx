import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { OnboardingCard } from "@/components/onboarding/OnboardingCard";
import { StepTitle } from "@/components/onboarding/StepTitle";
import {
  Facebook,
  Instagram,
  Youtube,
  Target,
  Users,
  BarChart,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const { toast } = useToast();

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedPlatforms.length === 0) {
      toast({
        title: "Please select at least one platform",
        description: "You need to select platforms to continue",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const steps = [
    {
      title: "Choose Your Platforms",
      subtitle: "Select the platforms where you want to run your ad campaigns",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OnboardingCard
            icon={<Facebook className="w-6 h-6" />}
            title="Facebook Ads"
            description="Reach billions of users with targeted Facebook advertisements"
            selected={selectedPlatforms.includes("facebook")}
            onClick={() => handlePlatformToggle("facebook")}
          />
          <OnboardingCard
            icon={<Instagram className="w-6 h-6" />}
            title="Instagram Ads"
            description="Connect with users through visual Instagram campaigns"
            selected={selectedPlatforms.includes("instagram")}
            onClick={() => handlePlatformToggle("instagram")}
          />
          <OnboardingCard
            icon={<Youtube className="w-6 h-6" />}
            title="YouTube Ads"
            description="Engage audiences with video advertisements"
            selected={selectedPlatforms.includes("youtube")}
            onClick={() => handlePlatformToggle("youtube")}
          />
          <OnboardingCard
            icon={<Target className="w-6 h-6" />}
            title="Google Ads"
            description="Reach customers across Google's advertising network"
            selected={selectedPlatforms.includes("google")}
            onClick={() => handlePlatformToggle("google")}
          />
        </div>
      ),
    },
    {
      title: "Campaign Settings",
      subtitle: "Configure your campaign tracking and targeting options",
      content: (
        <div className="space-y-6">
          <OnboardingCard
            icon={<Users className="w-6 h-6" />}
            title="Audience Targeting"
            description="Set up behavioral triggers and user segmentation"
            selected={true}
          />
          <OnboardingCard
            icon={<BarChart className="w-6 h-6" />}
            title="Performance Tracking"
            description="Monitor campaign metrics and optimize performance"
            selected={true}
          />
        </div>
      ),
    },
    {
      title: "Ready to Launch",
      subtitle: "Your campaign setup is complete",
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <ArrowRight className="w-12 h-12 text-primary" />
          </div>
          <p className="text-gray-600 max-w-md mx-auto">
            Your ad campaign is configured and ready to go. Click the button below
            to launch your first campaign.
          </p>
        </div>
      ),
    },
  ];

  return (
    <OnboardingLayout currentStep={currentStep} totalSteps={steps.length}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <StepTitle
            title={steps[currentStep - 1].title}
            subtitle={steps[currentStep - 1].subtitle}
          />
          {steps[currentStep - 1].content}
          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleNext}
              className="flex items-center space-x-2"
              size="lg"
            >
              <span>
                {currentStep === steps.length ? "Launch Campaign" : "Continue"}
              </span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </OnboardingLayout>
  );
};

export default Index;