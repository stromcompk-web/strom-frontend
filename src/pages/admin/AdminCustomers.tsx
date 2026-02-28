import { useState } from "react";
import { Search, Mail, Phone, MapPin } from "lucide-react";
import { useCustomers } from "@/contexts/CustomerContext";
import { formatPrice } from "@/data/products";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminCustomers = () => {
  const [search, setSearch] = useState("");
  const { customers, isLoading } = useCustomers();

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.ordersCount > 0).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
          Customers
        </h1>
        <p className="text-muted-foreground font-body text-sm mt-1">
          View and manage your customer base
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-display text-2xl font-bold">{totalCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active (with orders)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-display text-2xl font-bold text-green-600">{activeCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-display text-2xl font-bold text-primary">
              {formatPrice(customers.reduce((s, c) => s + c.totalSpent, 0))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <CardDescription>
            {filtered.length} customer{filtered.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-12 text-center text-muted-foreground">Loading customers...</div>
            ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {customer.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="flex items-center gap-2 text-sm">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                          {customer.email}
                        </p>
                        <p className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        {customer.city}
                      </span>
                    </TableCell>
                    <TableCell>{customer.ordersCount}</TableCell>
                    <TableCell className="font-display text-primary">
                      {formatPrice(customer.totalSpent)}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {customer.lastOrder}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCustomers;
