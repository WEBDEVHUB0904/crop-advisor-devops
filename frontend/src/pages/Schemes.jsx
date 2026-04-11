import { useEffect, useState } from "react";
import { Search, Calendar, IndianRupee, Clock, CheckCircle, AlertCircle, ArrowRight, Filter, Landmark } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/api";

const schemeFilters = ["All", "Ongoing", "Upcoming", "Central", "State", "Subsidy", "Insurance"];

const statusColors = {
  Ongoing: "bg-primary/15 text-primary border-primary/30",
  Upcoming: "bg-gold/15 text-gold border-gold/30",
};

export default function Schemes() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadSchemes() {
      setLoading(true);
      setApiError("");
      try {
        const response = await apiRequest("/api/v1/model/schemes/");
        const fetchedItems = Array.isArray(response?.items) ? response.items : [];
        if (isMounted) {
          if (fetchedItems.length > 0) {
            setItems(fetchedItems);
          } else {
            setApiError("No schemes available at the moment. Please try again later.");
            setItems([]);
          }
        }
      } catch (error) {
        if (isMounted) {
          setApiError("Failed to load government schemes. Please try again later.");
          setItems([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadSchemes();
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = items.filter((s) => {
    const matchFilter =
      activeFilter === "All" ||
      s.status === activeFilter ||
      s.type === activeFilter ||
      s.category === activeFilter;
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Landmark className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary tracking-wide uppercase">Government Initiatives</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Agri <span className="text-gradient">Govt Schemes</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover central and state government schemes, subsidies, and insurance programs designed to support Indian farmers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Total Schemes", value: items.length, icon: "📋" },
              { label: "Ongoing", value: items.filter(s => s.status === "Ongoing").length, icon: "✅" },
              { label: "Upcoming", value: items.filter(s => s.status === "Upcoming").length, icon: "🔔" },
              { label: "Total Outlay", value: "₹1L+ Cr", icon: "💰" },
            ].map((item) => (
              <div key={item.label} className="glass rounded-2xl p-4 text-center border-glow">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-2xl font-display font-bold text-primary">{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search schemes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-secondary/50 border-border/60 focus:border-primary/50"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {schemeFilters.map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={activeFilter === f ? "default" : "outline"}
                  onClick={() => setActiveFilter(f)}
                  className={activeFilter === f ? "bg-gradient-primary text-primary-foreground" : "border-border/60 text-muted-foreground hover:text-foreground"}
                >
                  {f}
                </Button>
              ))}
            </div>
          </div>

          {(loading || apiError) && (
            <div className={`mb-6 rounded-xl border px-4 py-3 text-sm ${apiError ? "border-destructive/30 bg-destructive/10 text-destructive" : "border-primary/30 bg-primary/10 text-primary"}`}>
              {loading ? "Loading latest agriculture schemes..." : apiError}
            </div>
          )}

          {!loading && items.length === 0 && !apiError && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No schemes available. Please refresh later.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((scheme) => (
              <div key={scheme.id} className="group rounded-2xl bg-gradient-card border border-border/40 hover:border-primary/30 p-6 card-shadow hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{scheme.icon}</div>
                    <div>
                      <h3 className="font-display font-bold text-lg group-hover:text-primary transition-colors">{scheme.name}</h3>
                      <p className="text-xs text-muted-foreground">{scheme.fullName}</p>
                    </div>
                  </div>
                  <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full border font-medium ${statusColors[scheme.status] || statusColors.Ongoing}`}>
                    {scheme.status === "Ongoing"
                      ? <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 inline" />{scheme.status}</span>
                      : <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3 inline" />{scheme.status}</span>}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{scheme.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <IndianRupee className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-semibold text-gold">{scheme.amount}</span>
                  </div>
                  {scheme.deadline && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
                      <span className="text-muted-foreground">Deadline:</span>
                      <span className="font-semibold text-destructive">{scheme.deadline}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Launched:</span>
                    <span className="font-semibold">{scheme.launch}</span>
                  </div>
                </div>

                <div className="p-3 bg-secondary/40 rounded-xl mb-4">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Eligibility</p>
                  <p className="text-xs text-foreground/80">{scheme.eligibility}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Key Benefits</p>
                  <div className="flex flex-wrap gap-1.5">
                    {scheme.benefits.map((b) => (
                      <span key={b} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-lg border border-primary/20">{b}</span>
                    ))}
                  </div>
                </div>

                {scheme.link ? (
                  <a href={scheme.link} target="_blank" rel="noreferrer" className="w-full mt-auto">
                    <Button size="sm" variant="outline" className="w-full border-border/60 hover:border-primary/50 hover:bg-primary/5 gap-1.5 text-sm group-hover:text-primary transition-colors">
                      Apply / Know More <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </a>
                ) : (
                  <Button size="sm" variant="outline" className="w-full border-border/60 hover:border-primary/50 hover:bg-primary/5 gap-1.5 text-sm mt-auto group-hover:text-primary transition-colors" disabled>
                    Apply / Know More <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <Filter className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="font-display text-xl font-semibold mb-2">No schemes found</p>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
