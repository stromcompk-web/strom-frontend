import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Clock } from "lucide-react";

const stores = [
  { city: "Lahore", address: "MM Alam Road, Gulberg III", phone: "042-111-364-463" },
  { city: "Karachi", address: "Dolmen Mall, Clifton", phone: "021-111-364-463" },
  { city: "Islamabad", address: "Centaurus Mall, F-8", phone: "051-111-364-463" },
  { city: "Faisalabad", address: "D Ground, Susan Road", phone: "041-111-364-463" },
  { city: "Multan", address: "Gulgasht Colony, Bosan Road", phone: "061-111-364-463" },
  { city: "Peshawar", address: "University Road, GT Market", phone: "091-111-364-463" },
];

const StoreLocatorPage = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <section className="bg-secondary py-12 md:py-16">
        <div className="container text-center">
          <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wider text-foreground">
            Store Locator
          </h1>
          <p className="text-muted-foreground text-sm mt-2 font-body">
            Find a strom store near you
          </p>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stores.map((store) => (
            <div key={store.city} className="border border-border p-6 hover:border-primary transition-colors">
              <h3 className="font-display text-lg uppercase tracking-wider text-foreground mb-4">
                {store.city}
              </h3>
              <div className="space-y-3 text-sm font-body text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {store.address}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  {store.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  10:00 AM – 10:00 PM
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default StoreLocatorPage;
