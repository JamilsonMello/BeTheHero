export const formatted = price => Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format(price);
