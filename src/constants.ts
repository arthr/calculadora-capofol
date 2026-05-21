export const RECIPE = {
  opium: 50,
  leaves: 50,
  syringe: 20,
  needle: 20,
};

// Pesos em Quilogramas (KG) por unidade
export const WEIGHTS = {
  opium: 0.150, // 150g
  leaves: 0.100, // 100g
  syringe: 0.300, // 300g
  needle: 0.200, // 200g
};

export const CAPOFOL_UNIT_WEIGHT = 0.100; // 100g
export const CAPOFOL_UNITS_PER_BATCH = 100; // 100 unidades por lote
export const CAPOFOL_BATCH_WEIGHT = 15; // 15kg por lote (conforme pontuado pelo usuário)

export type Ingredients = keyof typeof RECIPE;
