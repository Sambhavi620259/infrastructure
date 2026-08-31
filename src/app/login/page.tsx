"use client";

import { ArrowRightIcon, ComputerDesktopIcon, ShieldCheckIcon, TicketIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { startDemoSession } from "@/lib/demo-session";
import { defaultRouteForRole, roles, type Role } from "@/lib/roles";

const loginOptions: readonly { role: Role; title: string; description: string; icon: typeof ShieldCheckIcon; style: string }[] = [
  { role: roles.SUPER_ADMIN, title: "Super Admin", description: "Companies, subscriptions, tenants and platform governance.", icon: ShieldCheckIcon, style: "border-violet-200 hover:border-violet-400 hover:bg-violet-50/50" },
  { role: roles.IT_ADMIN, title: "IT Admin", description: "Organization-wide IT asset and configuration operations.", icon: ComputerDesktopIcon, style: "border-blue-200 hover:border-blue-400 hover:bg-blue-50/50" },
  { role: roles.IT_AGENT, title: "IT Agent", description: "Tickets, asset lookup, inventory and approved reports.", icon: TicketIcon, style: "border-cyan-200 hover:border-cyan-400 hover:bg-cyan-50/50" },
] as const;

export default function LoginPage() {
  const router = useRouter();

  const signIn = (role: Role) => {
    startDemoSession(role);
    router.replace(defaultRouteForRole(role));
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 sm:py-12 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:p-0">
      <section className="mx-auto flex w-full max-w-xl flex-col justify-center py-8 lg:mx-0 lg:max-w-none lg:px-[clamp(2rem,8vw,9rem)] lg:py-16">
        <div className="mb-10 flex items-center gap-3 text-white"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500 text-lg font-black shadow-lg shadow-brand-500/30">B</span><span><span className="block text-sm font-extrabold">Bold And Wise</span><span className="block text-[10px] font-semibold tracking-wider text-brand-300">IT ASSET MANAGEMENT</span></span></div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">Secure workspace access</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Choose your portal.</h1>
        <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300">Each role enters only its assigned dashboard. You cannot switch into another workspace after signing in.</p>
        <div className="mt-8 grid gap-3">
          {loginOptions.map(({ role, title, description, icon: Icon, style }) => (
            <button key={role} type="button" onClick={() => signIn(role)} className={`group flex w-full items-center gap-4 rounded-2xl border bg-white p-4 text-left shadow-sm transition sm:p-5 ${style}`}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-700 group-hover:bg-white"><Icon className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold text-slate-900">{title}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{description}</span></span>
              <ArrowRightIcon className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-slate-900" />
            </button>
          ))}
        </div>
        <p className="mt-6 text-[11px] leading-5 text-slate-400">Demo access only: this selector will be replaced by your identity provider login and a server-side session in production.</p>
      </section>
      <aside className="mx-auto hidden w-full max-w-xl flex-col justify-end rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-violet-800 p-10 text-white shadow-2xl lg:m-6 lg:flex lg:max-w-none"><p className="text-sm font-bold">One role. One workspace.</p><p className="mt-3 max-w-md text-2xl font-extrabold leading-tight">Role-aware navigation keeps platform administration and daily IT operations separate.</p><div className="mt-10 grid grid-cols-3 gap-3 text-center text-[11px] font-semibold"><span className="rounded-xl bg-white/10 px-3 py-3">Platform control</span><span className="rounded-xl bg-white/10 px-3 py-3">IT operations</span><span className="rounded-xl bg-white/10 px-3 py-3">Agent support</span></div></aside>
    </main>
  );
}
