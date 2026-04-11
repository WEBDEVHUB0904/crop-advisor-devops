import { useEffect, useState } from "react";
import { Search, Calendar, ExternalLink, TrendingUp, Rss } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/api";

const categories = ["All", "Technology", "Policy", "Market", "Research", "Climate", "Export"];

const tagColors = {
  trending: "bg-primary/15 text-primary border-primary/30",
  new: "bg-lime/15 text-lime border-lime/30",
  hot: "bg-gold/15 text-gold border-gold/30",
  important: "bg-destructive/15 text-destructive border-destructive/30",
};

export default function News() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadNews() {
      setLoading(true);
      setApiError("");
      try {
        const response = await apiRequest("/api/v1/model/news/");
        const fetchedItems = Array.isArray(response?.items) ? response.items : [];
        if (isMounted) {
          if (fetchedItems.length > 0) {
            setItems(fetchedItems);
          } else {
            setApiError("No news available at the moment. Please try again later.");
            setItems([]);
          }
        }
      } catch (error) {
        if (isMounted) {
          setApiError("Failed to load agriculture news. Please try again later.");
          setItems([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadNews();
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = items.filter((n) => {
    const matchCat = activeCategory === "All" || n.category === activeCategory;
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Rss className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary tracking-wide uppercase">Agriculture News</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Agri <span className="text-gradient">News & Insights</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Stay updated with the latest in agriculture, policy, markets, and agri-tech from across India.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-secondary/50 border-border/60 focus:border-primary/50"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant={activeCategory === cat ? "default" : "outline"}
                  onClick={() => setActiveCategory(cat)}
                  className={activeCategory === cat ? "bg-gradient-primary text-primary-foreground" : "border-border/60 text-muted-foreground hover:text-foreground"}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {(loading || apiError) && (
            <div className={`mb-6 rounded-xl border px-4 py-3 text-sm ${apiError ? "border-destructive/30 bg-destructive/10 text-destructive" : "border-primary/30 bg-primary/10 text-primary"}`}>
              {loading ? "Loading latest agriculture news..." : apiError}
            </div>
          )}

          {!loading && items.length === 0 && !apiError && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No news available. Please refresh later.</p>
            </div>
          )}

          {filtered.length > 0 && activeCategory === "All" && !search && (
            <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-gradient-card card-shadow mb-8 group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
              <div className="p-8 md:p-10">
                <div className="flex items-start gap-6">
                  <div className="text-6xl hidden md:block">{filtered[0].emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${tagColors.trending}`}>Featured</span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">{filtered[0].category}</span>
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {filtered[0].title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">{filtered[0].summary}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{filtered[0].date}</span>
                      <span>{filtered[0].readTime} read</span>
                      {filtered[0].url ? (
                        <a href={filtered[0].url} target="_blank" rel="noreferrer" className="ml-auto">
                          <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10 gap-1 text-xs">
                            Read More <ExternalLink className="w-3 h-3" />
                          </Button>
                        </a>
                      ) : (
                        <Button size="sm" variant="ghost" className="ml-auto text-primary hover:bg-primary/10 gap-1 text-xs" disabled>
                          Read More <ExternalLink className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(activeCategory === "All" && !search ? filtered.slice(1) : filtered).map((article) => (
              <div key={article.id} className="group rounded-2xl bg-gradient-card border border-border/40 hover:border-primary/30 p-6 card-shadow hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{article.emoji}</span>
                  <div className="flex items-center gap-2">
                    {article.tag && (
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${tagColors[article.tag]}`}>
                        {article.tag}
                      </span>
                    )}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{article.category}</span>
                  </div>
                </div>

                <h3 className="font-display font-semibold text-base mb-3 group-hover:text-primary transition-colors leading-snug flex-1">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{article.summary}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/40">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{article.date}</span>
                  <span>{article.readTime} read</span>
                  {article.url ? (
                    <a href={article.url} target="_blank" rel="noreferrer" className="group-hover:text-primary transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <ExternalLink className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="font-display text-xl font-semibold mb-2">No articles found</p>
              <p className="text-sm">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
