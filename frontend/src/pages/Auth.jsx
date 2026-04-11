import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Sprout, Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import heroFarm from "@/assets/hero-farm.jpg";
import { useAuth } from "@/context/auth-context";

const benefits = [
  "AI-powered crop recommendations",
  "Access to all government schemes",
  "Personalized agri news feed",
  "SHAP explainability reports",
  "Soil history tracking",
];

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, register, user } = useAuth();
  const [tab, setTab] = useState(
    searchParams.get("tab") === "register" ? "register" : "login"
  );
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (searchParams.get("tab") === "register") {
      setTab("register");
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (tab === "register" && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      if (tab === "login") {
        await login({ email: form.email, password: form.password });
        navigate("/");
        return;
      }

      await register({
        email: form.email,
        password: form.password,
        full_name: form.name,
      });
      setSuccess("Account created. Check your email to verify your account.");
      setTab("login");
      setForm({ name: "", email: form.email, password: "", confirmPassword: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">
        <img src={heroFarm} alt="Farm" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background/60" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

        <Link to="/" className="relative flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
            <Sprout className="w-5 h-5 text-primary" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-lg">CropSense</span>
            <span className="text-[10px] text-muted-foreground tracking-widest uppercase">AI</span>
          </div>
        </Link>

        <div className="relative">
          <h2 className="font-display text-4xl font-bold mb-6 leading-tight">
            Smarter Farming<br />Starts <span className="text-gradient">Here</span>
          </h2>
          <div className="space-y-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{b}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 p-5 glass rounded-2xl border-glow">
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              "CropSense AI helped me switch from wheat to mustard — the SHAP report showed exactly why it was better for my soil. Doubled my income!"
            </p>
            <div className="flex items-center gap-2.5 mt-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-sm">👨‍🌾</div>
              <div>
                <p className="text-xs font-semibold">Ramesh Yadav</p>
                <p className="text-xs text-muted-foreground">Farmer, Madhya Pradesh</p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative text-xs text-muted-foreground">© 2025 CropSense AI · Precision Agriculture Platform</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
              <Sprout className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display font-bold">CropSense AI</span>
          </Link>

          <div className="flex gap-1 p-1 bg-secondary rounded-xl mb-8">
            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  tab === t ? "bg-card text-foreground shadow-sm border border-border/40" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold mb-1">
              {tab === "login" ? "Welcome back 👋" : "Join CropSense AI"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {tab === "login"
                ? "Sign in to access your crop recommendations and dashboard."
                : "Create your free account and start getting AI-powered crop advice."}
            </p>
          </div>

          {(error || success) && (
            <div className={`mb-4 rounded-xl border px-4 py-3 text-sm ${error ? "border-destructive/30 bg-destructive/10 text-destructive" : "border-primary/30 bg-primary/10 text-primary"}`}>
              {error || success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "register" && (
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name" placeholder="Ramesh Yadav" type="text"
                    className="pl-9 bg-secondary/50 border-border/60 focus:border-primary/50 h-11"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email" placeholder="you@example.com" type="email"
                  className="pl-9 bg-secondary/50 border-border/60 focus:border-primary/50 h-11"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password" placeholder="••••••••"
                  type={showPass ? "text" : "password"}
                  className="pl-9 pr-10 bg-secondary/50 border-border/60 focus:border-primary/50 h-11"
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {tab === "register" && (
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-sm">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword" placeholder="••••••••"
                    type={showPass ? "text" : "password"}
                    className="pl-9 bg-secondary/50 border-border/60 focus:border-primary/50 h-11"
                    value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
            )}

            {tab === "login" && (
              <div className="flex justify-end">
                <Link to="/auth?tab=register" className="text-xs text-primary hover:underline">Create an account</Link>
              </div>
            )}

            <Button
              type="submit" disabled={loading} size="lg"
              className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold gap-2 h-12 mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>{tab === "login" ? "Sign In" : "Create Account"} <ArrowRight className="w-4 h-4" /></>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/40" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-xs text-muted-foreground">or continue with</span>
            </div>
          </div>

          <Button variant="outline" className="w-full border-border/60 h-11 gap-3 hover:bg-secondary">
            <span className="text-lg">🇬</span>
            <span className="text-sm">Continue with Google</span>
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-6">
            {tab === "login" ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setTab(tab === "login" ? "register" : "login")} className="text-primary hover:underline font-medium">
              {tab === "login" ? "Sign up free" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
