"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { useSyncExternalStore } from "react";
import { getProgressSnapshot, getServerProgressSnapshot, progressStorageKey } from "@/lib/storage";
import type { Episode, MediaTitle } from "@/lib/types";

type TitleEpisodeListProps = {
  slug: string;
  status: MediaTitle["status"];
  episodes: Episode[];
};

export function TitleEpisodeList({ slug, status, episodes }: TitleEpisodeListProps) {
  const progressItems = useSyncExternalStore(subscribeToProgress, getProgressSnapshot, getServerProgressSnapshot);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-[calc(4rem+env(safe-area-inset-bottom))] sm:px-6 sm:pb-16 lg:px-8">
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Ангиуд</h2>
        <span className="shrink-0 text-xs font-medium uppercase tracking-[0.14em] text-slate-500 sm:tracking-[0.18em]">
          {status === "ongoing" ? "Үргэлжилж байна" : "Дууссан"}
        </span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {episodes.length ? (
          episodes.map((episode) => {
            const progress = progressItems.find((item) => item.mediaSlug === slug && item.episodeNumber === episode.number);
            const percent = progress && progress.duration > 0 ? Math.min(100, Math.round((progress.currentTime / progress.duration) * 100)) : 0;
            const watched = percent >= 90;
            const started = percent > 0;

            return (
              <Link
                className={`soft-border group relative grid min-h-[88px] grid-cols-[100px_minmax(0,1fr)] overflow-hidden rounded-lg transition sm:min-h-[96px] sm:grid-cols-[140px_minmax(0,1fr)] ${
                  started
                    ? "border-teal-300/28 bg-teal-300/[0.07] hover:border-teal-300/45"
                    : "bg-white/[0.035] hover:border-teal-300/40 hover:bg-white/[0.06]"
                }`}
                href={`/watch/${slug}/${episode.number}`}
                key={episode.id}
              >
                {episode.isFree ? (
                  <span className="pointer-events-none absolute right-2 top-2 z-10 rounded bg-amber-300 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-black shadow-lg shadow-amber-300/20">
                    ҮНЭГҮЙ
                  </span>
                ) : null}
                <div className="relative h-full min-h-[88px] w-full overflow-hidden bg-white/[0.04] sm:min-h-[96px]">
                  <Image src={episode.thumbnail} alt="" fill className="object-cover" sizes="(max-width: 640px) 112px, 140px" />
                  {started ? (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-white/18">
                      <div className="h-full bg-teal-300" style={{ width: `${percent}%` }} />
                    </div>
                  ) : null}
                  <div className="absolute inset-0 grid place-items-center bg-black/20 opacity-0 transition group-hover:opacity-100">
                    <Play size={22} fill="white" className="text-white" />
                  </div>
                </div>
                <div className="flex min-w-0 flex-col justify-center p-3 sm:p-4">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-semibold text-white">{episode.number}-р анги</h3>
                    {watched ? <span className="rounded bg-teal-300/16 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-teal-100">Үзсэн</span> : null}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{episode.runtime}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
                    <span className="rounded bg-white/8 px-2 py-1 text-slate-300">{episode.quality}</span>
                    {episode.subtitleUrl ? <span className="rounded bg-teal-300/14 px-2 py-1 text-teal-100">MN</span> : null}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="soft-border rounded-lg bg-white/[0.035] p-8 text-center text-slate-400 md:col-span-2">
            Одоогоор анги нэмэгдээгүй байна.
          </div>
        )}
      </div>
    </section>
  );
}

function subscribeToProgress(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(progressStorageKey, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(progressStorageKey, callback);
  };
}
