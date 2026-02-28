import { Link } from "react-router-dom";
import {
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  salesByMonth,
  revenueByCategory,
  topProducts,
} from "@/data/admin";
import { useOrders } from "@/contexts/OrderContext";
import { formatPrice as formatProductPrice } from "@/data/products";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(348 80% 35%)",
  },
  orders: {
    label: "Orders",
    color: "hsl(220 70% 45%)",
  },
  visitors: {
    label: "Visitors",
    color: "hsl(160 60% 40%)",
  },
} satisfies ChartConfig;

const AdminDashboard = () => {
  const { orders } = useOrders();
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + o.total, 0);
  const avgOrderValue = orders.filter((o) => o.status !== "cancelled").length
    ? Math.round(totalRevenue / orders.filter((o) => o.status !== "cancelled").length)
    : 0;
  const orderGrowth = 12.5;
  const revenueGrowth = 8.2;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground font-body text-sm mt-1">
          Welcome back. Here's what's happening with your store.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-display text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-display text-2xl font-bold text-primary">
              {formatProductPrice(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{revenueGrowth}%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-display text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-display text-2xl font-bold">
              {orders.filter((o) => o.status !== "cancelled").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{orderGrowth}%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-display text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Avg. Order Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-display text-2xl font-bold">
              {formatProductPrice(avgOrderValue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <ArrowDownRight className="h-3 w-3 text-amber-600" />
              <span className="text-amber-600">-2.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-display text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-display text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+3</span> new this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg uppercase tracking-wider">
              Revenue Overview
            </CardTitle>
            <CardDescription>Monthly revenue and order count (last 7 months)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <AreaChart data={salesByMonth}>
                <defs>
                  <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(348 80% 35%)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(348 80% 35%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(348 80% 35%)"
                  fill="url(#fillRevenue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg uppercase tracking-wider">
              Revenue by Category
            </CardTitle>
            <CardDescription>Distribution across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="h-[220px] w-full max-w-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <ChartTooltip
                      content={({ active, payload }) =>
                        active && payload?.length ? (
                          <div className="rounded-lg border bg-background px-3 py-2 shadow-lg">
                            <p className="font-medium">{payload[0].name}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatProductPrice(payload[0].value as number)}
                            </p>
                          </div>
                        ) : null
                      }
                    />
                    <Pie
                      data={revenueByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                    >
                      {revenueByCategory.map((entry, index) => (
                        <Cell key={index} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {revenueByCategory.map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatProductPrice(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-display text-lg uppercase tracking-wider">
                Top Products
              </CardTitle>
              <CardDescription>Best sellers by revenue</CardDescription>
            </div>
            <Link to="/admin/products">
              <Package className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[220px] w-full">
              <BarChart data={topProducts} layout="vertical" margin={{ left: 0, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                <XAxis type="number" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="name" width={100} tickLine={false} />
                <ChartTooltip
                  content={({ active, payload }) =>
                    active && payload?.length ? (
                      <div className="rounded-lg border bg-background px-3 py-2 shadow-lg">
                        <p className="font-medium">{payload[0].payload.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Sales: {payload[0].value} | {formatProductPrice(payload[0].payload.revenue)}
                        </p>
                      </div>
                    ) : null
                  }
                />
                <Bar dataKey="revenue" fill="hsl(348 80% 35%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-display text-lg uppercase tracking-wider">
                Recent Orders
              </CardTitle>
              <CardDescription>Latest order activity</CardDescription>
            </div>
            <Link to="/admin/orders">
              <ShoppingCart className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-sm text-primary">
                      {formatProductPrice(order.total)}
                    </p>
                    <span
                      className={`inline-block text-xs px-2 py-0.5 rounded ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
