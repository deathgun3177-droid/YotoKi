import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Play, Star } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { TitleEpisodeList } from "@/components/title-episode-list";
import { findTitleBySlug } from "@/lib/content";

type DetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function DetailPage({ params }: DetailPageProps) {
  const { slug } = await params;
  const title = await findTitleBySlug(slug);

  if (!title) {
    notFound();
  }

  const firstEpisode = title.episodes[0];

  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#050506]">
      <SiteHeader />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={title.banner} alt="" fill priority className="object-cover opacity-34" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-[#050506]/72 to-[#050506]/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050506] via-[#050506]/52 to-transparent" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-6 px-4 pb-8 pt-8 sm:gap-8 sm:px-6 sm:pb-10 sm:pt-10 lg:grid-cols-[230px_1fr] lg:px-8 lg:pb-14">
          <div className="relative aspect-[2/3] w-40 overflow-hidden rounded-2xl shadow-2xl shadow-black/50 sm:w-56 sm:rounded-lg lg:w-full">
            <Image src={title.poster} alt={title.title} fill priority className="object-cover" sizes="(max-width: 1024px) 14rem, 230px" />
          </div>

          <div className="flex max-w-3xl flex-col justify-end">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge>{title.kind === "anime" ? "Аниме" : "Кино"}</Badge>
              <Badge>{title.quality}</Badge>
              <Badge>MN</Badge>
              <Badge>{title.rating}</Badge>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-6xl">{title.title}</h1>
            <p className="mt-2 text-sm text-slate-400">{title.originalTitle} • {title.year}</p>
            <p className="mt-4 line-clamp-3 max-w-2xl text-sm leading-6 text-slate-300 sm:mt-5 sm:line-clamp-none sm:text-base sm:leading-7">{title.synopsis}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {title.genres.map((genre) => (
                <span className="rounded-md bg-white/8 px-3 py-1.5 text-sm text-slate-300" key={genre}>
                  {genre}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {firstEpisode ? (
                <Link
                  className="yt-focus inline-flex items-center gap-2 rounded-md bg-teal-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-teal-200"
                  href={`/watch/${title.slug}/${firstEpisode.number}`}
                >
                  <Play size={18} fill="currentColor" />
                  Үзэх
                </Link>
              ) : (
                <span className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.055] px-5 py-3 text-sm font-semibold text-slate-300">
                  Анги нэмэгдээгүй
                </span>
              )}
              <div className="soft-border inline-flex items-center gap-2 rounded-md bg-black/30 px-4 py-3 text-sm text-slate-300">
                <Star size={17} className="text-amber-300" />
                {title.episodes.length} анги
              </div>
            </div>
          </div>
        </div>
      </section>

      <TitleEpisodeList slug={title.slug} status={title.status} episodes={title.episodes} />
    </main>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-100">{children}</span>;
}
