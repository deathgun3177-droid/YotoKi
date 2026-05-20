"use client";

import { Lock } from "lucide-react";
import { hasActiveWatchAccess } from "@/lib/auth/access";
import { useAuth } from "@/components/auth-provider";
import { ActionCard, LoadingCard } from "@/components/status-card";

export function WatchAccessGate({ children, freePreview = false }: { children: React.ReactNode; freePreview?: boolean }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <LoadingCard title="Үзэх эрх шалгаж байна" message="Таны аккаунтын үзэх эрхийг баталгаажуулж байна." />
      </div>
    );
  }

  if (!user) {
    return (
      <AccessMessage
        title="Нэвтрэх шаардлагатай"
        description="Анги, кино үзэхийн тулд аккаунтаараа нэвтэрнэ үү."
        href="/auth"
        action="Нэвтрэх"
      />
    );
  }

  if (freePreview) {
    return children;
  }

  if (!hasActiveWatchAccess(user)) {
    return (
      <AccessMessage
        title="Үзэх эрх идэвхгүй байна"
        description="Үзэх эрх авах эсвэл сунгуулах мэдээллээ шалгаад, гүйлгээний утга дээр User ID-гаа бичнэ үү."
        href="/info"
        action="Мэдээлэл харах"
      />
    );
  }

  return children;
}

function AccessMessage({
  title,
  description,
  href,
  action
}: {
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ActionCard icon={Lock} tone="amber" title={title} description={description} href={href} action={action} />
    </div>
  );
}
