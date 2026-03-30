export default function BurgerShopSite() {
  const burgers = [
    {
      name: "Hambúrguer Simples",
      description: "Pão, hambúrguer, alface, tomate, cebola roxa, maionese, queijo cheddar e bacon.",
      price: "R$ 24,90",
    },
    {
      name: "Hambúrguer Duplo",
      description: "Pão, 2 hambúrgueres, alface, tomate, cebola roxa, maionese, queijo cheddar e bacon.",
      price: "R$ 29,90",
    },
    {
      name: "Costela",
      description: "Pão, hambúrguer de costela, alface, tomate, cebola roxa, maionese, queijo cheddar e bacon.",
      price: "R$ 29,90",
    },
    {
      name: "Costelão",
      description: "Burger especial de costela da casa.",
      price: "R$ 37,90",
    },
  ];

  const combos = [
    "Combo Casal — 2 pães, 2 hambúrgueres, alface, tomate, cebola roxa, maionese, queijo cheddar, bacon e 2 porções de batata frita 150g",
    "Coca-Cola 1,5L — R$ 14,00",
    "Coca-Cola Zero 1,5L — R$ 14,00",
    "Coca Lata — R$ 6,00",
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,140,0,0.25),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-orange-400">Hamburgueria artesanal</p>
              <h1 className="text-2xl font-black sm:text-3xl">Chapa 10</h1>
            </div>
            <a
              href="#pedido"
              className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:scale-105"
            >
              Fazer pedido
            </a>
          </div>

          <div className="grid gap-10 py-16 md:grid-cols-2 md:items-center">
            <div>
              <span className="mb-4 inline-block rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-300">
                Sabor que marca
              </span>
              <h2 className="max-w-xl text-4xl font-black leading-tight sm:text-6xl">
                O sabor da Chapa 10 feito na medida da sua fome.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
                Hambúrgueres artesanais, costela na chapa e combos caprichados para pedir rápido e sem complicação.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#cardapio"
                  className="rounded-2xl bg-white px-6 py-3 font-semibold text-neutral-950 transition hover:scale-105"
                >
                  Ver cardápio
                </a>
                <a
                  href="#contato"
                  className="rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Falar conosco
                </a>
              </div>
            </div>

            <div>
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
                <div className="aspect-[4/5] rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-orange-500 via-amber-500 to-red-500 p-6">
                  <div className="flex h-full flex-col justify-end rounded-[1.25rem] bg-black/20 p-6">
                    <p className="text-sm uppercase tracking-[0.3em] text-orange-100">Destaque da semana</p>
                    <h3 className="mt-2 text-3xl font-black">Hambúrguer Duplo</h3>
                    <p className="mt-3 max-w-sm text-white/90">
                      Duplo smash, muito queijo e bacon crocante em um combo irresistível.
                    </p>
                    <p className="mt-4 text-2xl font-bold">R$ 29,90</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16" id="cardapio">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-400">Cardápio</p>
            <h2 className="text-3xl font-black sm:text-4xl">Os favoritos da casa</h2>
          </div>
          <p className="max-w-xl text-white/60">
            Escolha o seu burger favorito e peça em poucos cliques.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {burgers.map((item) => (
            <div
              key={item.name}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl transition hover:-translate-y-1 hover:bg-white/10"
            >
              <div className="mb-4 h-40 rounded-[1.5rem] bg-gradient-to-br from-orange-500/80 via-amber-400/60 to-red-500/70" />
              <h3 className="text-2xl font-bold">{item.name}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">{item.description}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xl font-black text-orange-400">{item.price}</span>
                <button className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold transition hover:scale-105">
                  Pedir
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/5">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-400">Combos</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Mais sabor por um preço melhor</h2>
            <div className="mt-6 space-y-4">
              {combos.map((combo) => (
                <div key={combo} className="rounded-2xl border border-white/10 bg-neutral-900/80 p-4 text-white/80">
                  {combo}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-orange-400/20 bg-gradient-to-br from-orange-500/20 to-red-500/10 p-8 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-300">Entrega rápida</p>
            <h3 className="mt-2 text-3xl font-black">Peça pelo Instagram</h3>
            <p className="mt-4 text-white/75">
              Atendimento rápido, cardápio fácil de navegar e chamada direta para conversão.
            </p>
            <a
              id="pedido"
              href="https://instagram.com/chapa10.hamburgueria"
              className="mt-8 inline-flex rounded-2xl bg-green-500 px-6 py-3 font-bold text-white transition hover:scale-105"
            >
              Pedir agora
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16" id="contato">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-400">Sobre</p>
            <h2 className="mt-2 text-3xl font-black">Feito para destacar sua marca</h2>
            <p className="mt-4 leading-7 text-white/70">
              Esse layout foi pensado para hamburguerias que querem vender mais com um visual forte, moderno e profissional.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-400">Contato</p>
            <h2 className="mt-2 text-3xl font-black">Atendimento</h2>
            <div className="mt-5 space-y-3 text-white/75">
              <p>📍 Atendimento pelo Instagram @chapa10.hamburgueria</p>
              <p>🕒 Todos os dias, das 18h às 23h</p>
              <p>📞 Chame no direct para pedidos</p>
              <p>📲 Instagram: @chapa10.hamburgueria</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
