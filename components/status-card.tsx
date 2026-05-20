"use client";

import Link from "next/link";
import { Loader2, LucideIcon } from "lucide-react";

type LoadingCardProps = {
  title?: string;
  message: string;
  compact?: boolean;
};

export function LoadingCard({ title = "Түр хүлээнэ үү", message, compact = false }: LoadingCardProps) {
  return (
    <div className={`soft-border mx-auto max-w-xl rounded-lg bg-white/[0.035] text-center ${compact ? "p-5" : "p-8"}`}>
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-teal-300/12 text-teal-100">
        <Loader2 size={23} className="animate-spin" />
      </div>
      <h1 className="mt-4 text-xl font-semibold text-white">{title}</h1>
      <p className="mt-2 text-sm leading-6 text-slate-400">{message}</p>
      <div className="mx-auto mt-5 grid max-w-sm gap-2">
        <span className="loading-bar h-2 rounded-full bg-white/10" />
        <span className="loading-bar h-2 w-3/4 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

type ActionCardProps = {
  icon: LucideIcon;
  tone?: "amber" | "rose" | "teal";
  title: string;
  description: string;
  href: string;
  action: string;
};

export function ActionCard({ icon: Icon, tone = "teal", title, description, href, action }: ActionCardProps) {
  const toneClass = {
    amber: "bg-amber-300/12 text-amber-100",
    rose: "bg-rose-300/12 text-rose-100",
    teal: "bg-teal-300/12 text-teal-100"
  }[tone];

  return (
    <div className="soft-border mx-auto max-w-xl rounded-lg bg-white/[0.035] p-8 text-center">
      <div className={`mx-auto grid h-12 w-12 place-items-center rounded-lg ${toneClass}`}>
        <Icon size={24} />
      </div>
      <h1 className="mt-4 text-2xl font-semibold text-white">{title}</h1>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
      <Link className="yt-focus mt-5 inline-flex rounded-md bg-teal-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-teal-200" href={href}>
        {action}
      </Link>
    </div>
  );
}
