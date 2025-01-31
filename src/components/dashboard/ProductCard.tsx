import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  url: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [discount, setDiscount] = useState("10");
  const [isDeploying, setIsDeploying] = useState(false);

  const generateAdCopy = (discountPercentage: string) => {
    return `🔥 Limited Time Offer! Get ${discountPercentage}% OFF ${product.name}! 
    
Don't miss out on this exclusive deal. Shop now and save big! 

✨ Premium Quality
🚚 Fast Shipping
⭐ Customer Favorite

Click now to claim your discount! 👉`;
  };

  const handleDeployAd = async () => {
    setIsDeploying(true);
    try {
      // Simulate API call to Facebook Ads
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Campaign Created Successfully!",
        description: `Retargeting campaign for ${product.name} has been launched with ${discount}% discount offer.`,
      });
    } catch (error) {
      toast({
        title: "Error Creating Campaign",
        description: "There was an error creating your campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div>
            <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
            <p className="text-muted-foreground">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Select
                value={discount}
                onValueChange={setDiscount}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select discount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10% Discount</SelectItem>
                  <SelectItem value="15">15% Discount</SelectItem>
                  <SelectItem value="20">20% Discount</SelectItem>
                  <SelectItem value="25">25% Discount</SelectItem>
                  <SelectItem value="30">30% Discount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Generated Ad Copy:</p>
              <p className="text-sm text-muted-foreground">
                {generateAdCopy(discount)}
              </p>
            </div>

            <Button
              className="w-full"
              onClick={handleDeployAd}
              disabled={isDeploying}
            >
              {isDeploying ? "Deploying Campaign..." : "Deploy Retargeting Campaign"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;