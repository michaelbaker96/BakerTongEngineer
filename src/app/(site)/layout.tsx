import { EditorialShell } from "@/components/editorial-shell";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <EditorialShell>{children}</EditorialShell>;
}
