import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SizeGuidePage = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <section className="bg-secondary py-12 md:py-16">
        <div className="container text-center">
          <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wider text-foreground">
            Size Guide
          </h1>
        </div>
      </section>

      <section className="container py-12 md:py-16 max-w-4xl mx-auto space-y-12">
        {/* Men's */}
        <div>
          <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-6">Men's Sizes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-display text-xs uppercase tracking-widest text-muted-foreground">Size</th>
                  <th className="text-center py-3 px-4 font-display text-xs uppercase tracking-widest text-muted-foreground">Chest (in)</th>
                  <th className="text-center py-3 px-4 font-display text-xs uppercase tracking-widest text-muted-foreground">Waist (in)</th>
                  <th className="text-center py-3 px-4 font-display text-xs uppercase tracking-widest text-muted-foreground">Length (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { size: "S", chest: "36-38", waist: "30-32", length: "27" },
                  { size: "M", chest: "38-40", waist: "32-34", length: "28" },
                  { size: "L", chest: "40-42", waist: "34-36", length: "29" },
                  { size: "XL", chest: "42-44", waist: "36-38", length: "30" },
                  { size: "XXL", chest: "44-46", waist: "38-40", length: "31" },
                ].map((row) => (
                  <tr key={row.size} className="hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 font-display">{row.size}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.chest}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.waist}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Women's */}
        <div>
          <h2 className="font-display text-2xl uppercase tracking-wider text-foreground mb-6">Women's Sizes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-display text-xs uppercase tracking-widest text-muted-foreground">Size</th>
                  <th className="text-center py-3 px-4 font-display text-xs uppercase tracking-widest text-muted-foreground">Bust (in)</th>
                  <th className="text-center py-3 px-4 font-display text-xs uppercase tracking-widest text-muted-foreground">Waist (in)</th>
                  <th className="text-center py-3 px-4 font-display text-xs uppercase tracking-widest text-muted-foreground">Hip (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { size: "XS", bust: "32-33", waist: "25-26", hip: "35-36" },
                  { size: "S", bust: "34-35", waist: "27-28", hip: "37-38" },
                  { size: "M", bust: "36-37", waist: "29-30", hip: "39-40" },
                  { size: "L", bust: "38-40", waist: "31-33", hip: "41-43" },
                  { size: "XL", bust: "41-43", waist: "34-36", hip: "44-46" },
                ].map((row) => (
                  <tr key={row.size} className="hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 font-display">{row.size}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.bust}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.waist}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Measurement tips */}
        <div className="bg-secondary p-6 md:p-8">
          <h3 className="font-display text-lg uppercase tracking-wider text-foreground mb-4">How to Measure</h3>
          <ul className="space-y-2 text-sm font-body text-muted-foreground list-disc pl-5">
            <li>Use a flexible measuring tape for accurate measurements</li>
            <li>Measure over undergarments for best results</li>
            <li>Stand straight and keep the tape snug but not tight</li>
            <li>If between sizes, we recommend ordering the larger size</li>
          </ul>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default SizeGuidePage;
