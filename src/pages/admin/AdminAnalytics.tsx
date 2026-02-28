import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { salesByMonth, trafficData, topProducts } from "@/data/admin";
import { formatPrice } from "@/data/products";

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(348 80% 35%)" },
  orders: { label: "Orders", color: "hsl(220 70% 45%)" },
  visitors: { label: "Visitors", color: "hsl(160 60% 40%)" },
  pageviews: { label: "Page Views", color: "hsl(280 65% 50%)" },
} satisfies ChartConfig;

const AdminAnalytics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
          Analytics
        </h1>
        <p className="text-muted-foreground font-body text-sm mt-1">
          Deep dive into your store performance
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg uppercase tracking-wider">
              Revenue & Orders Trend
            </CardTitle>
            <CardDescription>Monthly comparison over the last 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={salesByMonth}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis
                  yAxisId="left"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(348 80% 35%)"
                  strokeWidth={2}
                  dot={{ fill: "hsl(348 80% 35%)" }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  stroke="hsl(220 70% 45%)"
                  strokeWidth={2}
                  dot={{ fill: "hsl(220 70% 45%)" }}
                />
              </LineChart>
            </ChartContainer>
            <div className="flex gap-6 mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Revenue (Rs.)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "hsl(220 70% 45%)" }} />
                <span className="text-sm text-muted-foreground">Orders</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg uppercase tracking-wider">
              Traffic Overview
            </CardTitle>
            <CardDescription>Visitors and page views by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="visitors" fill="hsl(160 60% 40%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pageviews" fill="hsl(280 65% 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
            <div className="flex gap-6 mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: "hsl(160 60% 40%)" }}
                />
                <span className="text-sm text-muted-foreground">Visitors</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: "hsl(280 65% 50%)" }}
                />
                <span className="text-sm text-muted-foreground">Page Views</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg uppercase tracking-wider">
            Product Performance
          </CardTitle>
          <CardDescription>Top products by revenue and units sold</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[320px] w-full">
            <BarChart data={topProducts} margin={{ left: 0, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                yAxisId="left"
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                tickLine={false}
                axisLine={false}
              />
              <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} />
              <ChartTooltip
                content={({ active, payload }) =>
                  active && payload?.length ? (
                    <div className="rounded-lg border bg-background px-3 py-2 shadow-lg">
                      <p className="font-medium">{payload[0].payload.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Revenue: {formatPrice(payload[0].payload.revenue)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Units Sold: {payload[0].payload.sales}
                      </p>
                    </div>
                  ) : null
                }
              />
              <Bar
                yAxisId="left"
                dataKey="revenue"
                fill="hsl(348 80% 35%)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                yAxisId="right"
                dataKey="sales"
                fill="hsl(220 70% 45%)"
                radius={[4, 4, 0, 0]}
                opacity={0.7}
              />
            </BarChart>
          </ChartContainer>
          <div className="flex gap-6 mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full opacity-70"
                style={{ backgroundColor: "hsl(220 70% 45%)" }}
              />
              <span className="text-sm text-muted-foreground">Units Sold</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
