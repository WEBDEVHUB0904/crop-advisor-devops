import { Link } from "react-router-dom";
import { Sprout, Twitter, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                <Sprout className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-xl">CropSense AI</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Empowering farmers with AI-driven crop recommendations for smarter, more sustainable agriculture.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-foreground">Platform</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Crop Advisor", href: "/recommend" },
                { label: "Agri News", href: "/news" },
                { label: "Govt Schemes", href: "/schemes" },
                { label: "About Us", href: "/about" },
              ].map((item) => (
                <Link key={item.href} to={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-foreground">Resources</h4>
            <div className="flex flex-col gap-2.5">
              {["Documentation", "Research Paper", "API Access", "Contact Us"].map((item) => (
                <a key={item} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-10 pt-6 border-t border-border/50 gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 CropSense AI. Built for precision agriculture.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Powered by</span>
            <span className="text-gradient font-semibold">Ensemble ML + XAI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
