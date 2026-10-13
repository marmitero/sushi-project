/**
 * Simulação pura (sem Phaser) do drive-thru do térreo.
 *
 * Fluxo de cada cliente (carro): entra pela DIREITA → avança para a ESQUERDA até o guichê
 * (ou até o fim da fila) → para e é atendido → PAGA → segue para a esquerda e sai.
 * A arte dos 5 carros do kit é desenhada virada para a esquerda e o caixa traz a placa
 * "« DRIVE THRU" apontando para a esquerda, por isso o sentido é sempre direita → esquerda.
 *
 * Cada evento de pagamento retornado por `update()` corresponde a UMA venda; a cena converte
 * cada evento em `sellToCustomer()` (núcleo econômico). Sem carro no guichê, não há receita.
 *
 * Ritmo: com fila cheia, o intervalo entre pagamentos é exatamente `serviceSeconds`
 * (tempo no guichê = serviceSeconds − tempo de avanço de uma posição na fila).
 */
export type CarPhase = 'arriving' | 'serving' | 'leaving';

export interface SimCar {
  id: number;
  /** Modelo do carro (0..variants-1) → Car1..Car5 do kit. */
  variant: number;
  /** Centro do carro em coordenadas do mundo. */
  x: number;
  phase: CarPhase;
  /** Segundos restantes no guichê (fase 'serving'). */
  serveLeft: number;
}

export interface DriveThruConfig {
  /** x de entrada (fora da tela, à direita). */
  spawnX: number;
  /** x do centro do carro quando a janela do motorista está alinhada ao guichê. */
  windowX: number;
  /** x de saída (fora da tela, à esquerda). */
  exitX: number;
  /** Velocidade (unidades do mundo por segundo). */
  speed: number;
  /** Distância mínima entre centros de carros consecutivos. */
  gap: number;
  /** Máximo de carros aguardando/no guichê ao mesmo tempo. */
  maxCars: number;
  /** Quantidade de modelos de carro disponíveis. */
  variants: number;
}

/** Tempo mínimo de atendimento no guichê (legibilidade da animação). */
export const MIN_SERVE_SECONDS = 0.4;
/** Passo máximo de integração (estabilidade). */
const MAX_STEP = 0.05;
/** Maior salto aceito por chamada; períodos maiores (aba oculta) são tratados como offline. */
const MAX_DT = 1;

export class DriveThru {
  readonly cars: SimCar[] = [];
  private nextId = 1;
  private lastVariant = -1;

  constructor(
    readonly cfg: DriveThruConfig,
    private readonly rng: () => number = Math.random,
  ) {}

  /** Tempo para o próximo carro da fila avançar até o guichê. */
  get advanceSeconds(): number {
    return this.cfg.gap / this.cfg.speed;
  }

  /** Tempo efetivo parado no guichê para um intervalo-alvo entre pagamentos. */
  serveSecondsFor(serviceSeconds: number): number {
    return Math.max(MIN_SERVE_SECONDS, serviceSeconds - this.advanceSeconds);
  }

  /**
   * Avança `dt` segundos. Retorna os carros que PAGARAM neste intervalo
   * (cada item = exatamente uma venda).
   */
  update(dt: number, serviceSeconds: number): SimCar[] {
    const paid: SimCar[] = [];
    if (!isFinite(dt) || dt <= 0) return paid;
    let remaining = Math.min(dt, MAX_DT);
    while (remaining > 1e-9) {
      const h = Math.min(remaining, MAX_STEP);
      this.step(h, serviceSeconds, paid);
      remaining -= h;
    }
    return paid;
  }

  private step(h: number, serviceSeconds: number, paid: SimCar[]) {
    const { speed, gap, windowX, exitX } = this.cfg;

    // 1) Quem já pagou segue para a esquerda e some ao sair da tela.
    for (const c of this.cars) if (c.phase === 'leaving') c.x -= speed * h;
    for (let i = this.cars.length - 1; i >= 0; i--) {
      if (this.cars[i].phase === 'leaving' && this.cars[i].x < exitX) this.cars.splice(i, 1);
    }

    // 2) Fila: da frente (menor x, junto ao guichê) para trás.
    const queue = this.cars.filter((c) => c.phase !== 'leaving').sort((a, b) => a.x - b.x);
    for (let i = 0; i < queue.length; i++) {
      const c = queue[i];
      if (c.phase === 'serving') {
        c.serveLeft -= h;
        if (c.serveLeft <= 0) {
          c.serveLeft = 0;
          c.phase = 'leaving';
          paid.push(c);
        }
        continue;
      }
      // 'arriving': avança até o guichê (1º da fila) ou até manter `gap` do carro da frente.
      const ahead = i > 0 ? queue[i - 1] : null;
      const target = ahead && ahead.phase !== 'leaving' ? ahead.x + gap : windowX;
      c.x = Math.min(c.x, Math.max(target, c.x - speed * h)); // nunca anda para trás
      if (target === windowX && c.x <= windowX + 1e-6) {
        c.x = windowX;
        c.phase = 'serving';
        c.serveLeft = this.serveSecondsFor(serviceSeconds);
      }
    }

    // 3) Chegada de novos clientes: mantém a fila abastecida sem sobrepor carros.
    this.trySpawn();
  }

  private trySpawn() {
    const { spawnX, gap, maxCars, variants } = this.cfg;
    const waiting = this.cars.filter((c) => c.phase !== 'leaving');
    if (waiting.length >= maxCars) return;
    const last = waiting.reduce((m, c) => Math.max(m, c.x), -Infinity);
    if (waiting.length > 0 && last > spawnX - gap) return;
    let variant = Math.floor(this.rng() * variants) % variants;
    if (variants > 1 && variant === this.lastVariant) variant = (variant + 1) % variants;
    this.lastVariant = variant;
    this.cars.push({ id: this.nextId++, variant, x: spawnX, phase: 'arriving', serveLeft: 0 });
  }
}
