import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Store, Mail, Bell, Shield, Database, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { syncApi, getApiBase } from "@/lib/api";

const AdminSettings = () => {
  const [storeName, setStoreName] = useState("strom");
  const [supportEmail, setSupportEmail] = useState("online@strom.com.pk");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("5000");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);

  const [syncing, setSyncing] = useState(false);
  const handleSyncToCloud = async () => {
    setSyncing(true);
    try {
      await syncApi.pushToRemote();
      toast.success("Data synced to cloud (MongoDB/Postgres).");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Sync failed.");
    } finally {
      setSyncing(false);
    }
  };

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
            Settings
          </h1>
          <p className="text-muted-foreground font-body text-sm mt-1">
            Manage your store configuration
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg uppercase tracking-wider flex items-center gap-2">
              <Store className="h-5 w-5" />
              Store Information
            </CardTitle>
            <CardDescription>Basic store details displayed to customers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="strom"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                placeholder="support@example.com"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg uppercase tracking-wider flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Shipping & Delivery
            </CardTitle>
            <CardDescription>Configure shipping rules and thresholds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="freeShipping">Free Shipping Threshold (Rs.)</Label>
              <Input
                id="freeShipping"
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(e.target.value)}
                placeholder="5000"
              />
              <p className="text-xs text-muted-foreground">
                Orders above this amount qualify for free delivery
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg uppercase tracking-wider flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure admin notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails for new orders and inquiries
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Low Stock Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when product stock falls below threshold
                </p>
              </div>
              <Switch checked={lowStockAlerts} onCheckedChange={setLowStockAlerts} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg uppercase tracking-wider flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database &amp; Cloud Sync
            </CardTitle>
            <CardDescription>
              Local DB syncs from Live (MongoDB/Postgres) on startup and every 5 min. Optional: push local data to live now.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground font-mono">
              Backend API: {getApiBase()}
            </p>
            <Button
              variant="outline"
              onClick={handleSyncToCloud}
              disabled={syncing}
            >
              {syncing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Database className="h-4 w-4 mr-2" />}
              {syncing ? "Syncing…" : "Sync to cloud now"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg uppercase tracking-wider flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Account and security options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline">Change Password</Button>
            <p className="text-xs text-muted-foreground">
              Last password change: Never
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
