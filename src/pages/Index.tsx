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
  ShoppingBag,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [enableRetargeting, setEnableRetargeting] = useState(true);
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
      title: "Choose Your Platforms & Products",
      subtitle: "Select the platforms and configure product targeting",
      content: (
        <div className="space-y-6">
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

          {selectedPlatforms.includes("facebook") && (
            <div className="mt-8 space-y-6">
              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Product Catalog Selection
                </h3>
                <p className="text-sm text-gray-600">
                  Choose products from your Facebook Commerce Manager to include in your ads
                </p>
                <div className="space-y-2">
                  {["Product 1", "Product 2", "Product 3"].map((product) => (
                    <div key={product} className="flex items-center space-x-2">
                      <Checkbox
                        id={product}
                        checked={selectedProducts.includes(product)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedProducts((prev) => [...prev, product]);
                          } else {
                            setSelectedProducts((prev) =>
                              prev.filter((p) => p !== product)
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={product}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {product}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <LinkIcon className="w-5 h-5" />
                  URL-Based Retargeting
                </h3>
                <p className="text-sm text-gray-600">
                  Automatically create retargeting audiences based on URL visits
                </p>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="enable-retargeting"
                    checked={enableRetargeting}
                    onCheckedChange={(checked) => {
                      setEnableRetargeting(checked as boolean);
                    }}
                  />
                  <label
                    htmlFor="enable-retargeting"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Enable automatic retargeting for selected products
                  </label>
                </div>
              </div>
            </div>
          )}
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
