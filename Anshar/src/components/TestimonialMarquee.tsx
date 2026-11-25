import { TESTIMONIALS } from "@/lib/catalog";
import { Star } from "lucide-react";

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <figure className="mx-2.5 w-[330px] shrink-0 border border-[rgba(35,32,28,0.12)] bg-[#fffdf9] p-5">
      <div className="flex gap-0.5 text-[#b5651d]">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <blockquote className="mt-3 text-[0.86rem] leading-relaxed text-[#4a443c]">
        “{t.text}”
      </blockquote>
      <figcaption className="mt-4 border-t border-dashed border-[rgba(35,32,28,0.14)] pt-3">
        <p className="text-[0.8rem] font-semibold text-[#23201c]">{t.name}</p>
        <p className="text-[0.7rem] uppercase tracking-wider text-[#8b7355]">{t.role}</p>
      </figcaption>
    </figure>
  );
}

export default function TestimonialMarquee() {
  const items = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <div className="marquee-viewport relative py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#faf8f5] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#faf8f5] to-transparent" />
      <div className="marquee-track">
        {items.map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </div>
    </div>
  );
}
