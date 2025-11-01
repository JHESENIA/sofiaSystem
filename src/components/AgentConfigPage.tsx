import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Bot, Save, RefreshCw, AlertCircle, Brain, Cpu, Zap, HelpCircle, Layers, MessageSquare } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

function HelpTooltip({ term, description }: { term: string; description: string }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <span>{term}</span>
          <HelpCircle className="w-3.5 h-3.5" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{term}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export function AgentConfigPage() {
  const [agentEnabled, setAgentEnabled] = useState(true);
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([2048]);
  const { t } = useLanguage();

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl text-foreground">{t.agentConfig.title}</h2>
          <p className="text-muted-foreground mt-1">
            Configura el modelo LLM que Sofía usa como cerebro de procesamiento
          </p>
        </div>
        <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20">
          <Brain className="w-3 h-3 mr-1" />
          {t.agentConfig.agentRunning}
        </Badge>
      </div>

      {/* Architecture Explanation */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-foreground mb-2">Arquitectura de Sofía</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 text-purple-600" />
                  </div>
                  <h4 className="text-sm text-foreground">Cerebro (LLM)</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Modelo de lenguaje que procesa y comprende el lenguaje natural
                </p>
              </div>
              <div className="p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <h4 className="text-sm text-foreground">Cuerpo (Sofía)</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Sistema completo que gestiona APIs, webhooks, análisis y más
                </p>
              </div>
              <div className="p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                  </div>
                  <h4 className="text-sm text-foreground">Integración</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Sofía usa el LLM solo para lenguaje, gestiona todo lo demás
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Agent Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-foreground">{t.agentConfig.agentStatusTitle}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Habilitar o deshabilitar el sistema completo de Sofía
            </p>
          </div>
          <Switch checked={agentEnabled} onCheckedChange={setAgentEnabled} />
        </div>
      </Card>

      {/* LLM Configuration */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <Cpu className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-foreground">Configuración del Modelo LLM (Cerebro)</h3>
            <p className="text-sm text-muted-foreground">
              Configura el modelo de lenguaje que Sofía utiliza para procesar texto
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Nombre del Sistema</Label>
              <Input id="agent-name" placeholder="Sofía" defaultValue="Sofía" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent-version">Versión del Sistema</Label>
              <Input id="agent-version" placeholder="v1.0.0" defaultValue="v2.1.5" disabled />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="agent-description">Descripción del Sistema</Label>
            <Textarea
              id="agent-description"
              placeholder="Describe el propósito de Sofía..."
              rows={3}
              defaultValue="Sofía es un sistema completo de gestión empresarial con IA. Utiliza un modelo LLM como cerebro para procesar lenguaje natural, mientras que el resto del sistema gestiona APIs, webhooks, análisis de ventas, comunicaciones y automatizaciones."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">
              <HelpTooltip
                term="Modelo LLM (Cerebro de Lenguaje)"
                description="El modelo de lenguaje que Sofía usa únicamente para comprender y generar texto. Sofía se encarga de todo lo demás (APIs, base de datos, análisis, webhooks, etc.)"
              />
            </Label>
            <Select defaultValue="gpt-4">
              <SelectTrigger id="model">
                <SelectValue placeholder={t.agentConfig.selectModel} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    <span>GPT-4 Turbo (Recomendado)</span>
                  </div>
                </SelectItem>
                <SelectItem value="gpt-4o">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    <span>GPT-4o (Más rápido)</span>
                  </div>
                </SelectItem>
                <SelectItem value="gpt-3.5">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    <span>GPT-3.5 Turbo (Económico)</span>
                  </div>
                </SelectItem>
                <SelectItem value="claude-3">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    <span>Claude 3 Sonnet</span>
                  </div>
                </SelectItem>
                <SelectItem value="llama-3">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    <span>Llama 3 70B</span>
                  </div>
                </SelectItem>
                <SelectItem value="custom">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    <span>Modelo Personalizado</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* LLM Personality & Behavior */}
      <Card className="p-6">
        <h3 className="text-foreground mb-4">
          <HelpTooltip
            term="Personalidad del LLM"
            description="Define cómo el modelo LLM debe interpretar y responder. Sofía usa estas instrucciones solo para generar respuestas de texto, el resto del sistema funciona independientemente."
          />
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="system-prompt">Prompt del Sistema (Instrucciones para el LLM)</Label>
            <Textarea
              id="system-prompt"
              rows={6}
              placeholder="Instrucciones para el modelo de lenguaje..."
              defaultValue="Eres el cerebro de lenguaje de Sofía, un sistema empresarial de IA. Tu única función es comprender y generar texto en español de manera clara, profesional y empática. Sofía se encarga de todas las operaciones (APIs, base de datos, webhooks, análisis). Tú solo procesas el lenguaje natural para ayudar a Sofía a comunicarse con los clientes de manera efectiva."
            />
            <p className="text-xs text-muted-foreground">
              Este prompt define solo cómo el LLM procesa lenguaje. Sofía gestiona todo lo demás automáticamente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tone">Tono de Respuesta</Label>
              <Select defaultValue="professional">
                <SelectTrigger id="tone">
                  <SelectValue placeholder={t.agentConfig.selectTone} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">{t.agentConfig.professional}</SelectItem>
                  <SelectItem value="friendly">{t.agentConfig.friendly}</SelectItem>
                  <SelectItem value="casual">{t.agentConfig.casual}</SelectItem>
                  <SelectItem value="formal">{t.agentConfig.formal}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Idioma Principal</Label>
              <Select defaultValue="spanish">
                <SelectTrigger id="language">
                  <SelectValue placeholder={t.agentConfig.selectLanguage} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spanish">{t.agentConfig.spanish}</SelectItem>
                  <SelectItem value="english">{t.agentConfig.english}</SelectItem>
                  <SelectItem value="multilingual">{t.agentConfig.multilingual}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Advanced LLM Parameters */}
      <Card className="p-6">
        <h3 className="text-foreground mb-4">
          <HelpTooltip
            term="Parámetros Avanzados del LLM"
            description="Ajustes técnicos que controlan cómo el modelo de lenguaje genera respuestas. Sofía optimiza estos valores automáticamente según el rendimiento."
          />
        </h3>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature">
                <HelpTooltip
                  term="Temperature (Creatividad)"
                  description="Controla la aleatoriedad de las respuestas del LLM. Valores bajos (0.1-0.3) = más predecible y consistente. Valores altos (0.7-1.0) = más creativo y variado."
                />
              </Label>
              <span className="text-sm text-muted-foreground">{temperature[0]}</span>
            </div>
            <Slider
              id="temperature"
              min={0}
              max={1}
              step={0.1}
              value={temperature}
              onValueChange={setTemperature}
            />
            <p className="text-xs text-muted-foreground">
              Solo afecta el procesamiento de lenguaje del LLM, no las operaciones de Sofía
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="max-tokens">
                <HelpTooltip
                  term="Max Tokens (Longitud Máxima)"
                  description="Número máximo de tokens (palabras aproximadamente) que el LLM puede generar en una respuesta. 1 token ≈ 0.75 palabras en español."
                />
              </Label>
              <span className="text-sm text-muted-foreground">{maxTokens[0]}</span>
            </div>
            <Slider
              id="max-tokens"
              min={256}
              max={4096}
              step={256}
              value={maxTokens}
              onValueChange={setMaxTokens}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeout">
                <HelpTooltip
                  term="Response Timeout"
                  description="Tiempo máximo que Sofía esperará una respuesta del LLM antes de marcar error."
                />
              </Label>
              <Input id="timeout" type="number" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retry">
                <HelpTooltip
                  term="Max Retry Attempts"
                  description="Número de veces que Sofía reintentará obtener respuesta del LLM si falla."
                />
              </Label>
              <Input id="retry" type="number" defaultValue="3" />
            </div>
          </div>
        </div>
      </Card>

      {/* Sofía Capabilities */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-foreground">Capacidades del Sistema Sofía</h3>
            <p className="text-sm text-muted-foreground">
              Funciones que Sofía gestiona automáticamente (independientes del LLM)
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { 
              name: "Memoria de Contexto", 
              desc: "Sofía guarda y gestiona el historial completo de conversaciones",
              enabled: true
            },
            { 
              name: "Análisis de Sentimiento", 
              desc: "Sofía analiza emociones del cliente en tiempo real",
              enabled: true
            },
            { 
              name: "Auto-Escalamiento", 
              desc: "Sofía decide cuándo escalar a agentes humanos",
              enabled: true
            },
            { 
              name: "Scoring de IA", 
              desc: "Sofía calcula probabilidad de compra automáticamente",
              enabled: true
            },
            { 
              name: "Gestión de Webhooks", 
              desc: "Sofía maneja todas las notificaciones y eventos",
              enabled: true
            },
            { 
              name: "Análisis de Ventas", 
              desc: "Sofía procesa y analiza factores de conversión",
              enabled: true
            },
          ].map((capability, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <p className="text-sm text-foreground">{capability.name}</p>
                <p className="text-xs text-muted-foreground">{capability.desc}</p>
              </div>
              <Switch defaultChecked={capability.enabled} />
            </div>
          ))}
        </div>
      </Card>

      {/* Warning */}
      <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-foreground">Sofía Gestiona Todo Automáticamente</p>
          <p className="text-xs text-muted-foreground mt-1">
            Solo configura el LLM (cerebro de lenguaje). Sofía se encarga de APIs, base de datos, webhooks, análisis, scoring, y todas las operaciones empresariales de forma autónoma.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button variant="navy" className="gap-2">
          <Save className="w-4 h-4" />
          {t.agentConfig.saveConfiguration}
        </Button>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          {t.agentConfig.resetToDefault}
        </Button>
        <Button variant="wine" className="gap-2 ml-auto">
          <Bot className="w-4 h-4" />
          Probar Configuración
        </Button>
      </div>
    </div>
  );
}
