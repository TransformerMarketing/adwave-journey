import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import ProductCard from "@/components/dashboard/ProductCard";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  url: string;
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 199.99,
      image: "/placeholder.svg",
      url: "https://example.com/headphones",
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      price: 149.99,
      image: "/placeholder.svg",
      url: "https://example.com/watch",
    },
    {
      id: "3",
      name: "Organic Coffee Beans",
      price: 24.99,
      image: "/placeholder.svg",
      url: "https://example.com/coffee",
    },
    {
      id: "4",
      name: "Yoga Mat Premium",
      price: 79.99,
      image: "/placeholder.svg",
      url: "https://example.com/yoga",
    },
    {
      id: "5",
      name: "Mechanical Keyboard",
      price: 129.99,
      image: "/placeholder.svg",
      url: "https://example.com/keyboard",
    },
    {
      id: "6",
      name: "Leather Backpack",
      price: 89.99,
      image: "/placeholder.svg",
      url: "https://example.com/backpack",
    },
  ]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Campaign Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your product campaigns and retargeting ads
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="px-4 py-2">
            Ad Account Connected
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            Catalog Synced
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;