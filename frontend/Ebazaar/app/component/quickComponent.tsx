import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  DollarSign,
  Package,
  Star,
  TrendingUp,
  Clock,
  Eye,
} from "lucide-react";

export function QuickStatsCard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Orders in Progress */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Orders in Progress
          </CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">Current active orders</p>
          <Badge variant="secondary" className="mt-2">
            <Clock className="h-3 w-3 mr-1" />
            Active
          </Badge>
        </CardContent>
      </Card>

      {/* Total Earnings */}
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Today:</span>
              <span className="text-lg font-semibold text-green-600">$120</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">This week:</span>
              <span className="text-lg font-semibold text-green-600">$850</span>
            </div>
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-sm text-muted-foreground">This month:</span>
              <span className="text-xl font-bold text-green-600">$3,200</span>
            </div>
          </div>
          <Badge variant="outline" className="mt-3">
            <TrendingUp className="h-3 w-3 mr-1" />
            Growing
          </Badge>
        </CardContent>
      </Card>

      {/* Active Services/Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Services</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground">
            Total live services/products
          </p>
          <Badge variant="default" className="mt-2">
            <Eye className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </CardContent>
      </Card>

      {/* Reviews & Ratings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Reviews & Ratings
          </CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-2">
            <div className="text-2xl font-bold">4.7</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= 4
                      ? "fill-yellow-400 text-yellow-400"
                      : star === 5
                      ? "fill-yellow-400/70 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-2">Average rating</p>
          <Badge variant="secondary">+5 new reviews this week</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
