import { describe, expect, it } from 'vitest';
import { DriveThru, DriveThruConfig, MIN_SERVE_SECONDS } from '../src/core/drivethru';

const CFG: DriveThruConfig = {
  spawnX: 820,
  windowX: 210,
  exitX: -100,
  speed: 300,
  gap: 170,
  maxCars: 4,
  variants: 5,
};

/** Gerador determinístico p/ testes reprodutíveis. */
function seeded(seed = 42) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function run(seconds: number, serviceSeconds: number, check?: (d: DriveThru) => void) {
  const d = new DriveThru(CFG, seeded());
  const dt = 1 / 60;
  let payments = 0;
  const paidTimes: number[] = [];
  for (let t = 0; t < seconds; t += dt) {
    const paid = d.update(dt, serviceSeconds);
    payments += paid.length;
    paid.forEach(() => paidTimes.push(t));
    check?.(d);
  }
  return { d, payments, paidTimes };
}

describe('drive-thru (clientes)', () => {
  it('sem tempo decorrido não há venda', () => {
    const d = new DriveThru(CFG, seeded());
    expect(d.update(0, 4)).toHaveLength(0);
    expect(d.update(-5, 4)).toHaveLength(0);
  });

  it('primeiro pagamento só acontece depois que o carro chega e é atendido', () => {
    const { paidTimes } = run(20, 4);
    const travel = (CFG.spawnX - CFG.windowX) / CFG.speed; // ~2.03s
    const serve = 4 - CFG.gap / CFG.speed; // ~3.43s
    expect(paidTimes[0]).toBeGreaterThan(travel + serve - 0.1);
    expect(paidTimes[0]).toBeLessThan(travel + serve + 0.1);
  });

  it('com fila cheia o intervalo entre pagamentos = serviceSeconds', () => {
    const { paidTimes } = run(60, 4);
    for (let i = 2; i < paidTimes.length; i++) {
      expect(paidTimes[i] - paidTimes[i - 1]).toBeCloseTo(4, 1);
    }
    // 60s a 4s/cliente, descontando a 1ª chegada => 14 clientes
    expect(paidTimes.length).toBe(14);
  });

  it('caixa mais rápido atende mais clientes no mesmo tempo', () => {
    const slow = run(60, 4).payments;
    const fast = run(60, 2).payments;
    expect(fast).toBeGreaterThan(slow);
    expect(fast).toBe(29);
  });

  it('nenhum carro passa do guichê sem pagar e carros na fila nunca se sobrepõem', () => {
    run(90, 3, (d) => {
      const queue = d.cars.filter((c) => c.phase !== 'leaving').sort((a, b) => a.x - b.x);
      for (const c of queue) expect(c.x).toBeGreaterThanOrEqual(CFG.windowX - 1e-6);
      for (let i = 1; i < queue.length; i++) {
        expect(queue[i].x - queue[i - 1].x).toBeGreaterThanOrEqual(CFG.gap - 1e-6);
      }
      expect(queue.length).toBeLessThanOrEqual(CFG.maxCars);
    });
  });

  it('cada carro paga exatamente uma vez e sai pela esquerda', () => {
    const d = new DriveThru(CFG, seeded(7));
    const paidIds: number[] = [];
    const seen = new Set<number>();
    for (let t = 0; t < 120; t += 1 / 30) {
      d.update(1 / 30, 2.6).forEach((c) => paidIds.push(c.id));
      d.cars.forEach((c) => seen.add(c.id));
    }
    expect(new Set(paidIds).size).toBe(paidIds.length); // sem pagamento duplicado
    // carros que já sumiram da cena pagaram antes de sair
    const gone = [...seen].filter((id) => !d.cars.some((c) => c.id === id));
    for (const id of gone) expect(paidIds).toContain(id);
  });

  it('atendimento nunca fica abaixo do mínimo legível', () => {
    const d = new DriveThru(CFG, seeded());
    expect(d.serveSecondsFor(0.1)).toBe(MIN_SERVE_SECONDS);
  });

  it('salto grande de tempo (aba oculta) é limitado e não gera rajada de vendas', () => {
    const d = new DriveThru(CFG, seeded());
    const paid = d.update(3600, 2);
    expect(paid.length).toBe(0); // 1s no máximo: nem chega ao guichê
  });
});
