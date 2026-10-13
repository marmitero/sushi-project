/**
 * Representação decimal de números grandes (mantissa + expoente).
 * value = m * 10^e, com m normalizado em [1, 10) para valores != 0.
 * Evita perder precisão além do limite seguro de Number e permite
 * valores muito altos típicos de idle games.
 */
export interface Big {
  m: number; // mantissa
  e: number; // expoente decimal
}

const EPS = 1e-9;

export function big(v: number | Big): Big {
  if (typeof v === 'object') return norm({ m: v.m, e: v.e });
  if (!isFinite(v)) throw new Error('Big: valor não finito');
  if (v === 0) return { m: 0, e: 0 };
  const neg = v < 0;
  let a = Math.abs(v);
  let e = 0;
  if (a >= 10) {
    e = Math.floor(Math.log10(a));
    a /= Math.pow(10, e);
  } else if (a < 1) {
    e = Math.floor(Math.log10(a));
    a /= Math.pow(10, e);
  }
  return norm({ m: neg ? -a : a, e });
}

function norm(b: Big): Big {
  if (b.m === 0 || !isFinite(b.m)) return { m: b.m === 0 ? 0 : b.m, e: 0 };
  let { m, e } = b;
  while (Math.abs(m) >= 10) {
    m /= 10;
    e += 1;
  }
  while (Math.abs(m) < 1 && m !== 0) {
    m *= 10;
    e -= 1;
  }
  return { m, e };
}

export function cmp(a: Big, b: Big): number {
  if (a.m === 0 && b.m === 0) return 0;
  if (a.m === 0) return b.m > 0 ? -1 : 1;
  if (b.m === 0) return a.m > 0 ? 1 : -1;
  const aneg = a.m < 0;
  const bneg = b.m < 0;
  if (aneg !== bneg) return aneg ? -1 : 1;
  const sign = aneg ? -1 : 1;
  if (a.e !== b.e) return a.e > b.e ? sign : -sign;
  if (a.m === b.m) return 0;
  return a.m > b.m ? 1 : -1;
}

export function gte(a: Big, b: Big): boolean {
  return cmp(a, b) >= 0;
}
export function lt(a: Big, b: Big): boolean {
  return cmp(a, b) < 0;
}

export function add(a: Big, b: Big): Big {
  if (a.m === 0) return big(b);
  if (b.m === 0) return big(a);
  const d = a.e - b.e;
  if (d > 15) return big(a);
  if (d < -15) return big(b);
  if (d >= 0) return norm({ m: a.m + b.m * Math.pow(10, -d), e: a.e });
  return norm({ m: b.m + a.m * Math.pow(10, d), e: b.e });
}

export function sub(a: Big, b: Big): Big {
  return add(a, { m: -b.m, e: b.e });
}

export function mul(a: Big, b: Big): Big {
  return norm({ m: a.m * b.m, e: a.e + b.e });
}

export function mulNum(a: Big, n: number): Big {
  return mul(a, big(n));
}

/** Converte para Number (possível perda p/ valores muito grandes — só p/ exibição/gráficos). */
export function toNumber(a: Big): number {
  return a.m * Math.pow(10, a.e);
}

const UNITS = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];

/** Formata p/ exibição: 1.23K, 4.5M, etc. Valores < 1000 mostram até 1 casa se fracionário. */
export function fmt(a: Big): string {
  if (a.m === 0) return '0';
  const neg = a.m < 0;
  const abs = { m: Math.abs(a.m), e: a.e };
  if (abs.e < 3) {
    // +1e-9: absorve resíduo de ponto flutuante (ex.: 499.9999999 de uma subtração) sem
    // arredondar para cima valores reais — a HUD nunca mostra mais do que o jogador tem.
    const n = toNumber(abs) + 1e-9;
    const s = n < 10 && n % 1 > 1e-6 ? (Math.floor(n * 10) / 10).toFixed(1) : Math.floor(n).toString();
    return (neg ? '-' : '') + s;
  }
  let idx = Math.floor(abs.e / 3);
  const rem = abs.e - idx * 3;
  let val = abs.m * Math.pow(10, rem); // [1,1000)
  while (val >= 1000) {
    val /= 1000;
    idx += 1;
  }
  const unit = idx >= 0 && idx < UNITS.length ? UNITS[idx] : `e${idx * 3}`;
  const digits = val >= 100 ? 0 : val >= 10 ? 1 : 2;
  return (neg ? '-' : '') + val.toFixed(digits) + unit;
}
