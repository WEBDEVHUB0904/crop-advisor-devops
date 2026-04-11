import { useState } from "react";
import { Sprout, Thermometer, Droplets, CloudRain, Beaker, Info, Leaf, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/api";

const SHAP_FEATURES = [
  { feature: "Humidity", value: "+0.34", color: "text-primary", bar: 85 },
  { feature: "Rainfall", value: "+0.28", color: "text-lime", bar: 70 },
  { feature: "pH", value: "+0.21", color: "text-gold", bar: 52 },
  { feature: "Nitrogen (N)", value: "-0.15", color: "text-destructive", bar: 38 },
  { feature: "Temperature", value: "+0.12", color: "text-sky", bar: 30 },
  { feature: "Potassium (K)", value: "-0.09", color: "text-destructive", bar: 22 },
  { feature: "Phosphorus (P)", value: "+0.06", color: "text-primary", bar: 15 },
];

const defaultValues = { N: 90, P: 42, K: 43, pH: 6.5, temperature: 25, humidity: 80, rainfall: 200 };

const CROP_EMOJI = {
  rice: "🌾",
  maize: "🌽",
  wheat: "🌿",
  cotton: "☁️",
  sugarcane: "🎋",
  chickpea: "🫛",
  kidneybeans: "🫘",
  pigeonpeas: "🫛",
  mothbeans: "🫘",
  mungbean: "🫛",
  blackgram: "🫘",
  lentil: "🫘",
  pomegranate: "🍎",
  banana: "🍌",
  mango: "🥭",
  grapes: "🍇",
  watermelon: "🍉",
  muskmelon: "🍈",
  apple: "🍏",
  orange: "🍊",
  papaya: "🧡",
  coconut: "🥥",
  coffee: "☕",
  default: "🌱",
};

function toPercent(value) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return 0;
  if (numeric <= 1) return Math.round(numeric * 100);
  return Math.round(numeric);
}

function buildCropReason(values, isTopMatch) {
  const climateSummary = `Temp ${values.temperature}°C, humidity ${values.humidity}%, rainfall ${values.rainfall}mm`;
  return isTopMatch
    ? `Best overall fit for your soil and climate profile (${climateSummary}).`
    : `Alternative fit based on your current parameter mix (${climateSummary}).`;
}

export default function Recommend() {
  const [values, setValues] = useState(defaultValues);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");

    try {
      const payload = {
        N: values.N,
        P: values.P,
        K: values.K,
        ph: values.pH,
        temperature: values.temperature,
        humidity: values.humidity,
        rainfall: values.rainfall,
      };

      const response = await apiRequest("/api/v1/model/rc/", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const topCropName = String(response?.recommended_crop || "Unknown");
      const topConfidence = toPercent(response?.confidence);

      const mappedTopCrop = {
        name: topCropName,
        confidence: topConfidence,
        reason: buildCropReason(values, true),
        icon: CROP_EMOJI[topCropName.toLowerCase()] || CROP_EMOJI.default,
        suitable: true,
      };

      const mappedAlternatives = Array.isArray(response?.alternatives)
        ? response.alternatives.map((alt) => {
            const name = String(alt.crop || "Unknown");
            return {
              name,
              confidence: toPercent(alt.confidence),
              reason: buildCropReason(values, false),
              icon: CROP_EMOJI[name.toLowerCase()] || CROP_EMOJI.default,
              suitable: toPercent(alt.confidence) >= 60,
            };
          })
        : [];

      setResult([mappedTopCrop, ...mappedAlternatives]);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Could not get recommendation from server.");
    } finally {
      setLoading(false);
    }
  };

  const setValue = (key, val) =>
    setValues((v) => ({ ...v, [key]: val }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sprout className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary tracking-wide uppercase">AI Crop Advisor</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Find Your <span className="text-gradient">Perfect Crop</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Enter your soil and climate parameters below. Our ensemble ML model will analyze 22 crop suitability profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Input Panel */}
            <div className="lg:col-span-2 space-y-5">
              <div className="rounded-2xl bg-gradient-card border border-border/60 p-6 card-shadow">
                <h2 className="font-display font-semibold text-lg mb-5 flex items-center gap-2">
                  <Beaker className="w-4 h-4 text-primary" /> Soil Nutrients
                </h2>

                {[
                  { key: "N", label: "Nitrogen (N)", unit: "kg/ha", min: 0, max: 140 },
                  { key: "P", label: "Phosphorus (P)", unit: "kg/ha", min: 5, max: 145 },
                  { key: "K", label: "Potassium (K)", unit: "kg/ha", min: 5, max: 205 },
                ].map((param) => (
                  <div key={param.key} className="mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-sm font-medium">{param.label}</Label>
                      <span className="text-sm font-semibold text-primary">{values[param.key]} <span className="text-xs text-muted-foreground">{param.unit}</span></span>
                    </div>
                    <Slider
                      min={param.min} max={param.max} step={1}
                      value={[values[param.key]]}
                      onValueChange={([v]) => setValue(param.key, v)}
                      className="w-full"
                    />
                  </div>
                ))}

                <div className="mb-2">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm font-medium">Soil pH</Label>
                    <span className="text-sm font-semibold text-gold">{values.pH}</span>
                  </div>
                  <Slider min={3.5} max={9} step={0.1} value={[values.pH]} onValueChange={([v]) => setValue("pH", v)} />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Acidic</span><span>Neutral</span><span>Alkaline</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-card border border-border/60 p-6 card-shadow">
                <h2 className="font-display font-semibold text-lg mb-5 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-lime" /> Climate Parameters
                </h2>

                {[
                  { key: "temperature", label: "Temperature", unit: "°C", min: 8, max: 43, icon: Thermometer, color: "text-gold" },
                  { key: "humidity", label: "Humidity", unit: "%", min: 14, max: 100, icon: Droplets, color: "text-sky" },
                  { key: "rainfall", label: "Rainfall", unit: "mm", min: 20, max: 300, icon: CloudRain, color: "text-primary" },
                ].map((param) => (
                  <div key={param.key} className="mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-sm font-medium flex items-center gap-1.5">
                        <param.icon className={`w-3.5 h-3.5 ${param.color}`} />{param.label}
                      </Label>
                      <span className={`text-sm font-semibold ${param.color}`}>{values[param.key]} <span className="text-xs text-muted-foreground">{param.unit}</span></span>
                    </div>
                    <Slider
                      min={param.min} max={param.max} step={param.key === "rainfall" ? 5 : 1}
                      value={[values[param.key]]}
                      onValueChange={([v]) => setValue(param.key, v)}
                    />
                  </div>
                ))}
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={loading}
                size="lg"
                className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold gap-2 h-12"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />Analyzing with AI...</>
                ) : (
                  <><Sprout className="w-4 h-4" />Recommend Crops</>
                )}
              </Button>

              {error && (
                <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-3 space-y-5">
              {!result ? (
                <div className="rounded-2xl bg-gradient-card border border-border/60 p-12 card-shadow flex flex-col items-center justify-center text-center min-h-80">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 animate-pulse-glow">
                    <Leaf className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-2">Ready to Analyze</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Adjust the parameters on the left and click "Recommend Crops" to see AI-powered suggestions.
                  </p>
                </div>
              ) : (
                <>
                  <div className="rounded-2xl bg-gradient-card border border-border/60 p-6 card-shadow">
                    <h3 className="font-display font-semibold text-lg mb-5 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" /> Crop Recommendations
                      <span className="ml-auto text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/20">Ensemble ML</span>
                    </h3>
                    <div className="space-y-3">
                      {result.map((crop, i) => (
                        <div key={crop.name} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${i === 0 ? "border-primary/30 bg-primary/5" : "border-border/40 bg-secondary/30"}`}>
                          <div className="text-2xl">{crop.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">{crop.name}</span>
                              {i === 0 && <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full">Best Match</span>}
                              {crop.suitable ? (
                                <CheckCircle className="w-3.5 h-3.5 text-primary ml-auto flex-shrink-0" />
                              ) : (
                                <AlertCircle className="w-3.5 h-3.5 text-muted-foreground ml-auto flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{crop.reason}</p>
                            <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-700 ${crop.suitable ? "bg-gradient-primary" : "bg-muted-foreground/40"}`}
                                style={{ width: `${crop.confidence}%` }}
                              />
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className={`text-lg font-display font-bold ${crop.suitable ? "text-primary" : "text-muted-foreground"}`}>{crop.confidence}%</div>
                            <div className="text-xs text-muted-foreground">confidence</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gradient-card border border-border/60 p-6 card-shadow">
                    <h3 className="font-display font-semibold text-lg mb-1 flex items-center gap-2">
                      <Info className="w-4 h-4 text-gold" /> SHAP Feature Importance
                      <span className="ml-auto text-xs bg-gold/10 text-gold px-2.5 py-1 rounded-full border border-gold/20">XAI</span>
                    </h3>
                    <p className="text-xs text-muted-foreground mb-5">Why was Rice recommended? SHAP values explain each feature's contribution.</p>
                    <div className="space-y-3">
                      {SHAP_FEATURES.map((f) => (
                        <div key={f.feature} className="flex items-center gap-3">
                          <span className="text-sm w-32 text-muted-foreground flex-shrink-0">{f.feature}</span>
                          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${f.value.startsWith("+") ? "bg-primary" : "bg-destructive"}`}
                              style={{ width: `${f.bar}%`, opacity: 0.7 }}
                            />
                          </div>
                          <span className={`text-sm font-semibold w-14 text-right flex-shrink-0 ${f.color}`}>{f.value}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 p-3 bg-secondary/50 rounded-xl">
                      <strong className="text-foreground">Interpretation:</strong> Positive SHAP values (green) push toward Rice recommendation, negative values (red) push against it.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
