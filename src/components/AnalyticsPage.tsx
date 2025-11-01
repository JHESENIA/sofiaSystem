import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { TrendingUp, Clock, MessageSquare, Smile, ShoppingCart, DollarSign, Target, Sparkles, TrendingDown, Eye, Award, Users, Brain, Zap, TrendingDown as ArrowDown, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { useLanguage } from "../lib/LanguageContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface Sale {
  id: number;
  customer: string;
  course: string;
  amount: number;
  date: string;
  conversionFactors: {
    factor: string;
    weight: number;
    impact: "high" | "medium" | "low";
  }[];
  journey: {
    stage: string;
    touchpoints: number;
    duration: string;
  }[];
  keyInsights: string[];
}

export function AnalyticsPage() {
  const { t } = useLanguage();
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  // Mock sales data with detailed analysis
  const salesData: Sale[] = [
    {
      id: 1,
      customer: "María González",
      course: "Desarrollo Web Full Stack",
      amount: 299,
      date: "2025-01-15",
      conversionFactors: [
        { factor: t.analytics.factors.discount, weight: 85, impact: "high" },
        { factor: t.analytics.factors.testimonials, weight: 78, impact: "high" },
        { factor: t.analytics.factors.followUp, weight: 72, impact: "high" },
        { factor: t.analytics.factors.courseContent, weight: 65, impact: "medium" },
        { factor: t.analytics.factors.timing, weight: 58, impact: "medium" },
      ],
      journey: [
        { stage: t.analytics.journeyStages.awareness, touchpoints: 3, duration: "2 días" },
        { stage: t.analytics.journeyStages.consideration, touchpoints: 5, duration: "4 días" },
        { stage: t.analytics.journeyStages.decision, touchpoints: 2, duration: "1 día" },
        { stage: t.analytics.journeyStages.purchase, touchpoints: 1, duration: "1 hora" },
      ],
      keyInsights: [
        "Descuento del 15% fue decisivo para la compra inmediata",
        "Los testimonios de estudiantes previos generaron confianza",
        "Seguimiento personalizado después de 3 días aumentó el interés",
        "El contenido del módulo 'React Avanzado' fue muy atractivo",
      ],
    },
    {
      id: 2,
      customer: "Carlos Rodríguez",
      course: "Marketing Digital Avanzado",
      amount: 249,
      date: "2025-01-14",
      conversionFactors: [
        { factor: t.analytics.factors.trial, weight: 92, impact: "high" },
        { factor: t.analytics.factors.instructor, weight: 88, impact: "high" },
        { factor: t.analytics.factors.certification, weight: 75, impact: "high" },
        { factor: t.analytics.factors.community, weight: 68, impact: "medium" },
        { factor: t.analytics.factors.pricing, weight: 55, impact: "medium" },
      ],
      journey: [
        { stage: t.analytics.journeyStages.awareness, touchpoints: 2, duration: "1 día" },
        { stage: t.analytics.journeyStages.consideration, touchpoints: 8, duration: "7 días" },
        { stage: t.analytics.journeyStages.decision, touchpoints: 3, duration: "2 días" },
        { stage: t.analytics.journeyStages.purchase, touchpoints: 1, duration: "30 min" },
      ],
      keyInsights: [
        "Acceso de prueba gratuito de 7 días permitió experimentar el valor",
        "Reputación del instructor (15 años de experiencia) fue determinante",
        "Certificación reconocida internacionalmente agregó valor percibido",
        "Comunidad activa con más de 5,000 estudiantes generó confianza",
      ],
    },
    {
      id: 3,
      customer: "Ana Martínez",
      course: "Diseño UX/UI Profesional",
      amount: 349,
      date: "2025-01-13",
      conversionFactors: [
        { factor: t.analytics.factors.personalization, weight: 95, impact: "high" },
        { factor: t.analytics.factors.recommendations, weight: 82, impact: "high" },
        { factor: t.analytics.factors.support, weight: 76, impact: "high" },
        { factor: t.analytics.factors.courseContent, weight: 71, impact: "medium" },
        { factor: t.analytics.factors.urgency, weight: 62, impact: "medium" },
      ],
      journey: [
        { stage: t.analytics.journeyStages.awareness, touchpoints: 4, duration: "3 días" },
        { stage: t.analytics.journeyStages.consideration, touchpoints: 6, duration: "5 días" },
        { stage: t.analytics.journeyStages.decision, touchpoints: 4, duration: "2 días" },
        { stage: t.analytics.journeyStages.purchase, touchpoints: 1, duration: "15 min" },
      ],
      keyInsights: [
        "Recomendaciones personalizadas basadas en su perfil fueron muy relevantes",
        "Sofía IA identificó su experiencia previa y adaptó el mensaje",
        "Soporte 24/7 y respuesta en menos de 2 horas fue valorado",
        "Oferta limitada de 48 horas creó sentido de urgencia",
      ],
    },
  ];

  const metrics = [
    {
      title: t.analytics.totalSales,
      value: "47",
      change: `+12 ${t.analytics.fromLastWeek}`,
      icon: ShoppingCart,
      trend: "up" as const,
    },
    {
      title: t.analytics.conversionRate,
      value: "34.2%",
      change: `+5.3% ${t.analytics.fromLastWeek}`,
      icon: Target,
      trend: "up" as const,
    },
    {
      title: t.analytics.avgTimeToConversion,
      value: "6.8d",
      change: `-1.2d ${t.analytics.fromLastWeek}`,
      icon: Clock,
      trend: "up" as const,
    },
    {
      title: "Valor Promedio Venta",
      value: "$289",
      change: `+$45 ${t.analytics.fromLastWeek}`,
      icon: DollarSign,
      trend: "up" as const,
    },
  ];

  // Aggregate conversion factors from all sales
  const topFactors = [
    { name: t.analytics.factors.personalization, value: 87, color: "#8b5cf6" },
    { name: t.analytics.factors.trial, value: 82, color: "#3b82f6" },
    { name: t.analytics.factors.testimonials, value: 76, color: "#10b981" },
    { name: t.analytics.factors.discount, value: 71, color: "#f59e0b" },
    { name: t.analytics.factors.instructor, value: 68, color: "#ef4444" },
  ];

  const conversionTrend = [
    { date: "Ene 10", ventas: 4, conversión: 28 },
    { date: "Ene 11", ventas: 6, conversión: 31 },
    { date: "Ene 12", ventas: 5, conversión: 29 },
    { date: "Ene 13", ventas: 8, conversión: 35 },
    { date: "Ene 14", ventas: 7, conversión: 33 },
    { date: "Ene 15", ventas: 9, conversión: 38 },
    { date: "Ene 16", ventas: 8, conversión: 34 },
  ];

  const getImpactBadgeClass = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
      case "low":
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
      default:
        return "";
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case "high":
        return t.analytics.high;
      case "medium":
        return t.analytics.medium;
      case "low":
        return t.analytics.low;
      default:
        return impact;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl text-foreground">{t.analytics.title}</h2>
          <p className="text-muted-foreground mt-1">{t.analytics.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            {t.analytics.today}
          </Button>
          <Button variant="navy" size="sm" className="h-9">
            {t.analytics.last7Days}
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            {t.analytics.last30Days}
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            {t.analytics.last90Days}
          </Button>
        </div>
      </div>

      {/* Sales Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Sofía AI Control Panel */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-foreground">Panel de Control de Sofía IA</h3>
              <p className="text-sm text-muted-foreground">Análisis inteligente de conversiones gestionado por Sofía</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm">Sofía Analizando</span>
          </div>
        </div>
      </div>

      {/* Top Conversion Factors & Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Conversion Factors */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">{t.analytics.topConversionFactors}</h3>
          <div className="space-y-4">
            {topFactors.map((factor, index) => (
              <div key={factor.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">#{index + 1}</span>
                    <span className="text-sm text-foreground">{factor.name}</span>
                  </div>
                  <span className="text-sm">{factor.value}%</span>
                </div>
                <Progress value={factor.value} className="h-2" style={{ 
                  // @ts-ignore
                  '--progress-background': factor.color 
                }} />
              </div>
            ))}
          </div>
        </Card>

        {/* Conversion Trend */}
        <Card className="p-6">
          <h3 className="text-foreground mb-4">Tendencia de Conversión</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={conversionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis yAxisId="left" stroke="#9ca3af" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="ventas" stroke="#8b5cf6" strokeWidth={2} name="Ventas" />
              <Line yAxisId="right" type="monotone" dataKey="conversión" stroke="#10b981" strokeWidth={2} name="Tasa %" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Detailed Sales Analysis */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-foreground">{t.analytics.saleDetails}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Análisis detallado de cada venta y factores que influyeron
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {salesData.map((sale) => (
            <Card key={sale.id} className="p-5 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-950/10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Sale Info */}
                <div className="lg:col-span-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-foreground">{sale.customer}</h4>
                      <p className="text-sm text-muted-foreground">{sale.course}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg text-green-600">${sale.amount}</span>
                        <span className="text-xs text-muted-foreground">{sale.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Conversion Factors */}
                <div className="lg:col-span-5">
                  <p className="text-xs text-muted-foreground mb-2">{t.analytics.conversionFactors}</p>
                  <div className="space-y-2">
                    {sale.conversionFactors.slice(0, 3).map((factor, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Badge className={`text-xs ${getImpactBadgeClass(factor.impact)}`}>
                          {getImpactLabel(factor.impact)}
                        </Badge>
                        <span className="text-sm text-foreground flex-1">{factor.factor}</span>
                        <span className="text-sm">{factor.weight}%</span>
                        <div className="w-16">
                          <Progress value={factor.weight} className="h-1.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Journey Summary */}
                <div className="lg:col-span-3">
                  <p className="text-xs text-muted-foreground mb-2">{t.analytics.conversionJourney}</p>
                  <div className="space-y-1">
                    {sale.journey.map((step, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{step.stage}</span>
                        <span className="text-foreground">{step.touchpoints} contactos</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-border mt-2">
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {sale.journey.reduce((acc, step) => acc + step.touchpoints, 0)} total
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="lg:col-span-1 flex items-center justify-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedSale(sale)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Análisis Completo de Venta #{sale.id}</DialogTitle>
                        <DialogDescription>
                          {sale.customer} - {sale.course}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-6 mt-4">
                        {/* Sale Overview */}
                        <div className="grid grid-cols-3 gap-4">
                          <Card className="p-4">
                            <p className="text-xs text-muted-foreground mb-1">{t.analytics.purchaseAmount}</p>
                            <p className="text-2xl text-foreground">${sale.amount}</p>
                          </Card>
                          <Card className="p-4">
                            <p className="text-xs text-muted-foreground mb-1">{t.analytics.purchaseDate}</p>
                            <p className="text-lg text-foreground">{sale.date}</p>
                          </Card>
                          <Card className="p-4">
                            <p className="text-xs text-muted-foreground mb-1">{t.analytics.touchpoints}</p>
                            <p className="text-2xl text-foreground">
                              {sale.journey.reduce((acc, step) => acc + step.touchpoints, 0)}
                            </p>
                          </Card>
                        </div>

                        {/* All Conversion Factors */}
                        <div>
                          <h4 className="text-foreground mb-3">{t.analytics.conversionFactors}</h4>
                          <div className="space-y-3">
                            {sale.conversionFactors.map((factor, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Badge className={getImpactBadgeClass(factor.impact)}>
                                      {getImpactLabel(factor.impact)}
                                    </Badge>
                                    <span className="text-sm text-foreground">{factor.factor}</span>
                                  </div>
                                  <span className="text-sm">{factor.weight}%</span>
                                </div>
                                <Progress value={factor.weight} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Journey Details */}
                        <div>
                          <h4 className="text-foreground mb-3">{t.analytics.conversionJourney}</h4>
                          <div className="space-y-3">
                            {sale.journey.map((step, idx) => (
                              <div key={idx} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">
                                  {idx + 1}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm text-foreground">{step.stage}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {step.touchpoints} puntos de contacto • {step.duration}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Key Insights */}
                        <div>
                          <h4 className="text-foreground mb-3">{t.analytics.whatWorked}</h4>
                          <div className="space-y-2">
                            {sale.keyInsights.map((insight, idx) => (
                              <div key={idx} className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                                <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-foreground">{insight}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Sofía AI Insights - Enhanced */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pattern Detection */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-300 dark:border-purple-700">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm text-purple-600 dark:text-purple-400">Patrón Detectado</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Sofía identificó</p>
            </div>
          </div>
          <p className="text-sm text-foreground">
            Los descuentos combinados con seguimiento personalizado aumentan la conversión en un <span className="font-semibold text-purple-600">42%</span>
          </p>
          <div className="mt-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-xs text-green-600">Aplicable ahora</span>
          </div>
        </Card>

        {/* Optimal Timing */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-300 dark:border-blue-700">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm text-blue-600 dark:text-blue-400">Mejor Momento</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Análisis temporal</p>
            </div>
          </div>
          <p className="text-sm text-foreground">
            Las ventas se convierten mejor cuando el seguimiento ocurre entre el <span className="font-semibold text-blue-600">día 3 y 5</span> después del primer contacto
          </p>
          <div className="mt-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-blue-600">Alta confianza</span>
          </div>
        </Card>

        {/* AI Recommendation */}
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-300 dark:border-green-700">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm text-green-600 dark:text-green-400">Recomendación IA</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Acción sugerida</p>
            </div>
          </div>
          <p className="text-sm text-foreground">
            Prioriza mostrar <span className="font-semibold text-green-600">testimonios</span> y ofrecer <span className="font-semibold text-green-600">pruebas gratuitas</span> para cursos de más de $250
          </p>
          <div className="mt-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-xs text-green-600">+28% conversión esperada</span>
          </div>
        </Card>
      </div>

      {/* Sofía AI Summary */}
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200 dark:border-indigo-800">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-foreground">Resumen Ejecutivo de Sofía</h3>
              <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                Actualizado hace 5 min
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs text-muted-foreground">Tasa de Éxito</span>
                </div>
                <p className="text-lg text-foreground">89.3%</p>
                <p className="text-xs text-green-600 mt-1">+12.5% vs mes anterior</p>
              </div>
              <div className="p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-xs text-muted-foreground">Ventas Asistidas</span>
                </div>
                <p className="text-lg text-foreground">47 / 53</p>
                <p className="text-xs text-purple-600 mt-1">88.7% con ayuda de IA</p>
              </div>
              <div className="p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-muted-foreground">Ingreso Optimizado</span>
                </div>
                <p className="text-lg text-foreground">$13,583</p>
                <p className="text-xs text-green-600 mt-1">+$2,140 por IA</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
