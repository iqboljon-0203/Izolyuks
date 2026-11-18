import Image from 'next/image'
import Link from 'next/link'
import Catalog from '@/components/Catalog'
import Finder from '@/components/Finder'
import HeroSlider from '@/components/HeroSlider'
import PrefillButton from '@/components/PrefillButton'
import ProductCard from '@/components/ProductCard'
import { CalcSection, ContactSection, FaqSection } from '@/components/Sections'
import { Icon, JsonLd, Rich, SecHead } from '@/components/ui'
import { getContent, published } from '@/lib/content'
import { getDict } from '@/lib/i18n'
import { faqLd, itemListLd } from '@/lib/seo'
import { specValue, type Lang } from '@/lib/types'

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang
  const c = await getContent()
  const d = getDict(lang)
  const prods = published(c)
  const bySlug = new Map(c.products.map((p) => [p.slug, p]))
  // Hero showcase: each product with its OWN two short facts (no fixed XPS numbers on other products).
  const heroSlides = prods
    .filter((p, i, a) => a.findIndex((x) => x.image === p.image) === i && !p.image.endsWith('.svg'))
    .slice(0, 6)
    .map((p) => ({
      image: p.image,
      name: p.name[lang],
      cat: d.catalog.cats[p.cat],
      href: `/${lang}/mahsulotlar/${p.slug}`,
      tags: p.specs
        .map((s) => ({ value: specValue(s.value, lang), label: s.label[lang] }))
        .filter((t) => t.value && t.value !== '—' && t.value.length <= 16)
        .slice(0, 2),
    }))
  const xps35 = prods.find((p) => p.slug === 'xps-premium')
  const xps25 = prods.find((p) => p.slug === 'xps-standard')
  const marquee = [...d.marquee, ...d.marquee, ...d.marquee, ...d.marquee]

  return (
    <>
      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-bg" /><div className="grid-bg" />
        <div className="wrap hero-in">
          <div className="rv">
            <span className="eyebrow">{c.hero.eyebrow[lang]}</span>
            <h1><Rich text={c.hero.title[lang]} /></h1>
            <p className="lead">{c.hero.lead[lang]}</p>
            <div className="hero-cta">
              <Link href={`/${lang}#finder`} className="btn btn-dark"><span>{d.heroBtn1}</span><Icon name="arrow" /></Link>
              <Link href={`/${lang}/aloqa`} className="btn btn-line">{d.heroBtn2}</Link>
            </div>
            <div className="facts">
              {c.stats.map((s, i) => <div key={i}><b>{s.value}</b><span>{s.label[lang]}</span></div>)}
            </div>
          </div>
          <HeroSlider slides={heroSlides} now={d.now} more={d.catalog.more} />
        </div>
      </section>

      <div className="marq" aria-hidden="true"><div className="marq-t">{marquee.map((m, i) => <span key={i}>{m}</span>)}</div></div>

      {/* AUDIENCE */}
      <section id="audience">
        <div className="wrap">
          <SecHead eb={d.aud.eb} title={d.aud.t} p={d.aud.p} />
          <div className="aud">
            <div className="aud-c rv">
              <span className="big-ic"><Icon name="home" /></span>
              <span className="eyebrow">{d.aud.retail.eb}</span>
              <h3>{d.aud.retail.t}</h3>
              <ul>{d.aud.retail.items.map((x) => <li key={x}>{x}</li>)}</ul>
              <Link href={`/${lang}#finder`} className="btn btn-dark"><span>{d.aud.retail.b}</span><Icon name="arrow" /></Link>
            </div>
            <div className="aud-c pro rv">
              <span className="big-ic"><Icon name="crane" /></span>
              <span className="eyebrow">{d.aud.pro.eb}</span>
              <h3>{d.aud.pro.t}</h3>
              <ul>{d.aud.pro.items.map((x) => <li key={x}>{x}</li>)}</ul>
              <PrefillButton className="btn" message={`${d.contact.form.wholesale}: `}><span>{d.aud.pro.b}</span><Icon name="arrow" /></PrefillButton>
            </div>
          </div>
        </div>
      </section>

      {/* FINDER */}
      <section id="finder" className="alt">
        <div className="wrap">
          <SecHead eb={d.finder.eb} title={d.finder.t} p={d.finder.p} />
          <Finder
            lang={lang}
            d={d}
            solutions={c.solutions.map((s) => ({
              slug: s.slug, zone: s.zone, name: s.name[lang], text: s.text[lang], thickness: s.thickness,
              products: s.products.map((slug) => bySlug.get(slug)).filter((p) => p && p.published).map((p) => ({ slug: p!.slug, name: p!.name[lang], cat: d.catalog.cats[p!.cat], image: p!.image })),
            }))}
          />
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products">
        <div className="wrap">
          <SecHead eb={d.catalog.eb} title={d.catalog.t} p={d.catalog.p} />
          <Catalog d={d} items={prods.map((p, i) => ({ cat: p.cat, node: <ProductCard p={p} lang={lang} d={d} num={i + 1} /> }))} />
        </div>
      </section>

      {/* XPS COMPARE */}
      {xps35 && xps25 && (
        <section id="xps" className="pt0">
          <div className="wrap">
            <SecHead eb={d.xps.eb} title={d.xps.t} p={d.xps.p} />
            <div className="cmp">
              {[{ p: xps25, lbl: d.xps.std, pro: false }, { p: xps35, lbl: d.xps.pro, pro: true }].map(({ p, lbl, pro }) => (
                <Link key={p.slug} href={`/${lang}/mahsulotlar/${p.slug}`} className={pro ? 'cmp-c pro rv' : 'cmp-c rv'}>
                  <span className="lbl">{lbl}</span>
                  <h3>{p.name[lang]}</h3>
                  <div className="den">{specValue(p.specs[0]?.value ?? '', lang).replace(' kg/m³', '')} <small>kg/m³</small></div>
                  <ul>{p.features.map((f, i) => <li key={i}><Icon name="check" /><span>{f[lang]}</span></li>)}</ul>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FACTORY GALLERY */}
      <section id="factory" className="pt40">
        <div className="wrap">
          <SecHead eb={d.factory.eb} title={d.factory.t} p={d.factory.p} />
          <div className="gal rv">
            {c.gallery.slice(0, 5).map((g, i) => (
              <figure className="ph" key={i}>
                <Image src={g.image} alt={g.caption[lang]} fill sizes={i === 0 ? '(max-width: 1020px) 100vw, 520px' : '(max-width: 640px) 100vw, 380px'} />
                <figcaption><span>{g.caption[lang]}</span><small>{String(i + 1).padStart(2, '0')}</small></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="alt" id="why">
        <div className="wrap">
          <SecHead eb={d.why.eb} title={d.why.t} />
          <div className="wgrid rv">
            {c.advantages.map((a, i) => (
              <div className="witem" key={i}>
                <div className="top"><span className="ic"><Icon name={a.icon} /></span><span className="n">{String(i + 1).padStart(2, '0')}</span></div>
                <h3>{a.title[lang]}</h3>
                <p>{a.text[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section id="process">
        <div className="wrap">
          <SecHead eb={d.steps.eb} title={d.steps.t} />
          <div className="steps">
            {c.steps.map((s, i) => <div className="step rv" key={i}><h3>{s.title[lang]}</h3><p>{s.text[lang]}</p></div>)}
          </div>
        </div>
      </section>

      <CalcSection c={c} lang={lang} d={d} />

      {/* DELIVERY */}
      <section id="delivery">
        <div className="wrap deliv">
          <div className="rv">
            <span className="eyebrow">{d.delivery.eb}</span>
            <h2 className="bigtxt"><Rich text={c.delivery.title[lang]} /></h2>
            <p className="muted" style={{ marginTop: 24, maxWidth: 480 }}>{c.delivery.text[lang]}</p>
          </div>
          <div className="routes rv">
            {c.delivery.routes.map((r) => <div key={r.code}><span>{r.name[lang]}</span><code>{r.code}</code></div>)}
          </div>
        </div>
      </section>

      <FaqSection c={c} lang={lang} d={d} bg />
      <ContactSection c={c} lang={lang} d={d} bg={false} />

      <JsonLd data={faqLd(c, lang)} />
      <JsonLd data={itemListLd(prods.map((p) => ({ name: p.name[lang], path: `/${lang}/mahsulotlar/${p.slug}` })))} />
    </>
  )
}
