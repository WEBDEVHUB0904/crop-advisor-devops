import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Brain, BarChart3, Shield, ChevronDown, Star, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroFarm from "@/assets/hero-farm.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Recommendations",
    desc: "Ensemble ML with 99%+ accuracy using Random Forest, XGBoost, and Neural Networks.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: Leaf,
    title: "7 Soil & Climate Parameters",
    desc: "Analyzes N, P, K, pH, temperature, humidity, and rainfall for precise crop matching.",
    color: "text-lime",
    bg: "bg-lime/10",
    border: "border-lime/20",
  },
  {
    icon: Shield,
    title: "Explainable AI (XAI)",
    desc: "LIME & SHAP techniques make AI decisions transparent and trustworthy for farmers.",
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/20",
  },
  {
    icon: BarChart3,
    title: "22 Crop Categories",
    desc: "Comprehensive database covering rice, wheat, maize, cotton, sugarcane, pulses and more.",
    color: "text-sky",
    bg: "bg-sky/10",
    border: "border-sky/20",
  },
];

const stats = [
  { value: "99%+", label: "Accuracy Rate", icon: TrendingUp },
  { value: "22", label: "Crop Types", icon: Leaf },
  { value: "10K+", label: "Farmers Helped", icon: Users },
  { value: "4.9★", label: "User Rating", icon: Star },
];

const steps = [
  { num: "01", title: "Enter Soil Data", desc: "Input NPK levels, pH, and moisture readings from your soil test." },
  { num: "02", title: "Add Climate Info", desc: "Provide temperature, humidity and rainfall patterns for your region." },
  { num: "03", title: "Get Recommendations", desc: "Receive AI-powered crop suggestions ranked by suitability score." },
  { num: "04", title: "Understand the Why", desc: "View SHAP explanations to understand exactly why each crop was recommended." },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroFarm} alt="Agricultural fields" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/70" />
        </div>

        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-lime/8 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto relative z-10 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-medium text-primary tracking-wide uppercase">
                Smart Precision Agriculture Platform
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Grow Smarter with{" "}
              <span className="text-gradient">AI-Powered</span>{" "}
              Crop Insights
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Harness ensemble machine learning and explainable AI to discover the perfect crops for your soil.
              Science-backed recommendations trusted by thousands of farmers across India.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/recommend">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold text-base px-8 gap-2 glow-primary">
                  Analyze My Soil <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-base px-8 border-border/60 hover:bg-secondary">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-4 text-center border-glow">
                <div className="text-3xl font-display font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground animate-bounce">
          <span className="text-xs">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-forest-deep/30 to-transparent pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-medium uppercase tracking-widest">Why CropSense AI</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
              Science Meets the Field
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our cutting-edge system combines SMOTE-balanced data, multi-algorithm comparison, and XAI for unmatched precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className={`group p-6 rounded-2xl bg-gradient-card card-shadow border ${f.border} hover:border-opacity-60 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className={`inline-flex p-3 rounded-xl ${f.bg} border ${f.border} mb-4`}>
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-medium uppercase tracking-widest">Simple Process</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From soil data to harvest-ready recommendations in minutes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {steps.map((step) => (
              <div key={step.num} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-card border border-primary/20 flex items-center justify-center mb-5 group-hover:border-primary/60 group-hover:glow-primary transition-all duration-300">
                  <span className="font-display text-2xl font-bold text-gradient">{step.num}</span>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/recommend">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold px-10 gap-2">
                Start Your Analysis <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 p-12 text-center bg-gradient-card glow-primary">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-lime/5 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <span className="relative z-10 text-primary text-sm font-medium uppercase tracking-widest">Join the Revolution</span>
            <h2 className="relative z-10 font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
              Ready to Transform Your Farm?
            </h2>
            <p className="relative z-10 text-muted-foreground max-w-lg mx-auto mb-8">
              Join thousands of farmers using AI insights to make better decisions, reduce costs, and maximize yield.
            </p>
            <div className="relative z-10 flex flex-wrap justify-center gap-4">
              <Link to="/auth?tab=register">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold px-8 gap-2">
                  Create Free Account <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/news">
                <Button size="lg" variant="outline" className="px-8 border-border/60">
                  Read Agri News
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
