import { Brain, Leaf, Github, Linkedin, Mail, ExternalLink, Target, Lightbulb, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const team = [
  { name: "Dr. Arjun Sharma", role: "Lead AI Researcher", avatar: "🧑‍🔬", expertise: "Ensemble ML, SHAP", affiliation: "IIT Bombay" },
  { name: "Priya Nair", role: "ML Engineer", avatar: "👩‍💻", expertise: "XGBoost, Feature Engineering", affiliation: "BITS Pilani" },
  { name: "Ravi Kumar", role: "Agri Domain Expert", avatar: "👨‍🌾", expertise: "Soil Science, Precision Agri", affiliation: "ICAR, Hyderabad" },
  { name: "Sneha Patel", role: "Data Scientist", avatar: "👩‍🔬", expertise: "SMOTE, Model Interpretability", affiliation: "NIT Surat" },
];

const techStack = [
  { name: "Random Forest", desc: "Primary ensemble classifier", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  { name: "XGBoost", desc: "Gradient boosting optimizer", color: "text-lime", bg: "bg-lime/10", border: "border-lime/20" },
  { name: "SHAP", desc: "Global feature importance", color: "text-gold", bg: "bg-gold/10", border: "border-gold/20" },
  { name: "LIME", desc: "Local model explanations", color: "text-sky", bg: "bg-sky/10", border: "border-sky/20" },
  { name: "SMOTE", desc: "Synthetic data balancing", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  { name: "Neural Networks", desc: "Deep learning baseline", color: "text-lime", bg: "bg-lime/10", border: "border-lime/20" },
  { name: "SVM", desc: "Support vector classifier", color: "text-gold", bg: "bg-gold/10", border: "border-gold/20" },
  { name: "Naive Bayes", desc: "Probabilistic baseline", color: "text-sky", bg: "bg-sky/10", border: "border-sky/20" },
];

const parameters = [
  { name: "Nitrogen (N)", desc: "Primary macronutrient for leaf growth", unit: "kg/ha", range: "0–140" },
  { name: "Phosphorus (P)", desc: "Root development and energy transfer", unit: "kg/ha", range: "5–145" },
  { name: "Potassium (K)", desc: "Disease resistance and water regulation", unit: "kg/ha", range: "5–205" },
  { name: "pH Value", desc: "Soil acidity/alkalinity balance", unit: "scale", range: "3.5–9.0" },
  { name: "Temperature", desc: "Growing season thermal requirement", unit: "°C", range: "8–43" },
  { name: "Humidity", desc: "Atmospheric moisture availability", unit: "%", range: "14–100" },
  { name: "Rainfall", desc: "Annual precipitation patterns", unit: "mm", range: "20–300" },
];

const milestones = [
  { year: "2023", event: "Research initiated at IIT Bombay" },
  { year: "Q1 2024", event: "Dataset compilation: 2,200+ records across 22 crops" },
  { year: "Q2 2024", event: "SMOTE balancing & feature engineering complete" },
  { year: "Q3 2024", event: "Ensemble models trained; 99.4% accuracy achieved" },
  { year: "Q4 2024", event: "SHAP & LIME integration for XAI explanations" },
  { year: "2025", event: "CropSense AI platform launched publicly" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary tracking-wide uppercase">Our Mission</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Bridging AI & <span className="text-gradient">Agriculture</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              CropSense AI was born from a simple belief: every farmer deserves access to the same precision insights that large agri-corporations enjoy.
              By combining ensemble machine learning with explainable AI, we make data-driven farming accessible, transparent, and trustworthy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
            {[
              { icon: Target, title: "Precision", desc: "99%+ accuracy through ensemble models comparing 7 algorithms on 2,200+ data points across 22 crops.", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
              { icon: Lightbulb, title: "Transparency", desc: "SHAP and LIME explanations ensure farmers understand why a crop is recommended — no black boxes.", color: "text-gold", bg: "bg-gold/10", border: "border-gold/20" },
              { icon: Globe, title: "Accessibility", desc: "Designed for farmers of all literacy levels with simple inputs and clear, actionable outputs in local languages.", color: "text-lime", bg: "bg-lime/10", border: "border-lime/20" },
            ].map((p) => (
              <div key={p.title} className={`rounded-2xl bg-gradient-card border ${p.border} p-6 card-shadow`}>
                <div className={`inline-flex p-3 rounded-xl ${p.bg} border ${p.border} mb-4`}>
                  <p.icon className={`w-6 h-6 ${p.color}`} />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-border/40 bg-gradient-card card-shadow p-8 md:p-12 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div>
                <span className="text-primary text-sm font-medium uppercase tracking-widest">The Research</span>
                <h2 className="font-display text-3xl font-bold mt-2 mb-4">Methodology & Approach</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our research paper proposes an intelligent crop recommendation system leveraging ensemble machine learning algorithms integrated with Explainable AI (XAI) to provide transparent, actionable insights for farmers.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We address the "black box" problem of complex models by integrating LIME and SHAP, enabling farmers to understand the reasoning behind every recommendation — a critical factor for real-world adoption and trust.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Random Forest", "XGBoost", "LIME", "SHAP", "SMOTE", "Neural Networks"].map((t) => (
                    <span key={t} className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-lg border border-primary/20 font-medium">{t}</span>
                  ))}
                </div>
                <Button variant="outline" className="border-border/60 gap-2">
                  <ExternalLink className="w-4 h-4" /> Read Full Paper
                </Button>
              </div>

              <div>
                <h3 className="font-display font-semibold mb-4">7 Input Parameters</h3>
                <div className="space-y-2">
                  {parameters.map((p, i) => (
                    <div key={p.name} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40 hover:bg-secondary/70 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">{p.name}</span>
                          <span className="text-xs text-muted-foreground">{p.range} {p.unit}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-10">
              <span className="text-primary text-sm font-medium uppercase tracking-widest">Under the Hood</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Technology Stack</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {techStack.map((t) => (
                <div key={t.name} className={`rounded-xl bg-gradient-card border ${t.border} p-4 transition-all duration-300 group`}>
                  <div className={`w-8 h-8 rounded-lg ${t.bg} border ${t.border} mb-3 flex items-center justify-center`}>
                    <Brain className={`w-4 h-4 ${t.color}`} />
                  </div>
                  <h4 className={`font-display font-semibold text-sm mb-1 ${t.color}`}>{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-10">
              <span className="text-primary text-sm font-medium uppercase tracking-widest">Journey</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Research Timeline</h2>
            </div>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
              <div className="space-y-6">
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-6 pl-12 relative">
                    <div className="absolute left-2 top-1 w-5 h-5 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <div className="flex-1 p-4 rounded-xl bg-gradient-card border border-border/40 hover:border-primary/30 transition-colors">
                      <span className="text-xs font-semibold text-primary mb-1 block">{m.year}</span>
                      <p className="text-sm text-muted-foreground">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="text-primary text-sm font-medium uppercase tracking-widest">The People</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Meet the Team</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {team.map((member) => (
                <div key={member.name} className="group rounded-2xl bg-gradient-card border border-border/40 hover:border-primary/30 p-6 card-shadow text-center hover:-translate-y-1 transition-all duration-300">
                  <div className="text-5xl mb-4">{member.avatar}</div>
                  <h3 className="font-display font-semibold text-base mb-0.5 group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-xs text-primary font-medium mb-1">{member.role}</p>
                  <p className="text-xs text-muted-foreground mb-1">{member.affiliation}</p>
                  <p className="text-xs text-muted-foreground/60 mb-4">{member.expertise}</p>
                  <div className="flex justify-center gap-2">
                    {[Github, Linkedin, Mail].map((Icon, j) => (
                      <a key={j} href="#" className="p-1.5 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all">
                        <Icon className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center rounded-3xl border border-primary/20 p-10 bg-gradient-card">
            <h2 className="font-display text-3xl font-bold mb-3">Ready to experience it?</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">Try our AI crop recommender and see SHAP-powered explanations in action.</p>
            <Link to="/recommend">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold px-8 gap-2">
                Try Crop Advisor <Leaf className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
