import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  (import.meta as any).env?.VITE_SUPABASE_URL || "https://demo.supabase.co";
const supabaseKey =
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "demo-key";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Mock data para desarrollo
export const mockUser = {
  id: 1,
  name: "Juan Pérez",
  email: "juan.perez@clgrupo.com",
  role: "CoDir" as const,
  plantId: 1,
  createdAt: new Date().toISOString(),
};

export const mockPlants = [
  { id: 1, name: "AGSA", createdAt: new Date().toISOString() },
  { id: 2, name: "Alter Enersun", createdAt: new Date().toISOString() },
  { id: 3, name: "Biomasa Forestal", createdAt: new Date().toISOString() },
  { id: 4, name: "General", createdAt: new Date().toISOString() },
];

export const mockAreas = [
  { id: 1, name: "General", createdAt: new Date().toISOString() },
  { id: 2, name: "Comercial", createdAt: new Date().toISOString() },
  { id: 3, name: "Compras", createdAt: new Date().toISOString() },
  { id: 4, name: "Eficiencia Energética", createdAt: new Date().toISOString() },
  { id: 5, name: "Producción", createdAt: new Date().toISOString() },
  { id: 6, name: "Mantenimiento", createdAt: new Date().toISOString() },
  { id: 7, name: "Calidad", createdAt: new Date().toISOString() },
  { id: 8, name: "Recursos Humanos", createdAt: new Date().toISOString() },
  { id: 9, name: "Otra", createdAt: new Date().toISOString() },
];

export const mockBadges = [
  {
    id: 1,
    name: "Primera Idea",
    description: "Has propuesto tu primera idea",
    icon: "lightbulb",
    criteria: "first_idea",
  },
  {
    id: 2,
    name: "Contribuidor",
    description: "Has propuesto 5 ideas",
    icon: "star",
    criteria: "5_ideas",
  },
  {
    id: 3,
    name: "Innovador",
    description: "Tu primera idea fue implementada",
    icon: "trophy",
    criteria: "first_implemented",
  },
  {
    id: 4,
    name: "Agente de Cambio",
    description: "Tienes 5 ideas implementadas",
    icon: "crown",
    criteria: "5_implemented",
  },
];
