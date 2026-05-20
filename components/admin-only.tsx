"use client";

import { ShieldAlert } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { ActionCard, LoadingCard } from "@/components/status-card";

export function AdminOnly({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingCard title="Admin эрх шалгаж байна" message="Таны session болон role мэдээллийг баталгаажуулж байна." />;
  }

  if (!user) {
    return (
      <ActionCard
        icon={ShieldAlert}
        tone="rose"
        title="Нэвтрэх шаардлагатай"
        description="Энэ admin хэсэг зөвхөн эрхтэй хэрэглэгчид нээлттэй."
        action="Нэвтрэх"
        href="/auth"
      />
    );
  }

  if (user.role !== "admin") {
    return (
      <ActionCard
        icon={ShieldAlert}
        tone="rose"
        title="Admin эрх шаардлагатай"
        description="Энэ хэсэг зөвхөн admin profile дээрээс ашиглагдана."
        action="Профайл руу буцах"
        href="/profile"
      />
    );
  }

  return children;
}
