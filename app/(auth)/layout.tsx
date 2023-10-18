export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-indigo-900 to-slate-900">
      {children}
    </div>
  );
}
