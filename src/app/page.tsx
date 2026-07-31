import {
  Smartphone,
  Fingerprint,
  QrCode,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { SiteHeader } from "@/components/site/site-header";
import { StatTiles } from "@/components/site/stat-tiles";
import { HeroPreview } from "@/components/site/hero-preview";
import { ContactForm } from "@/components/site/contact-form";

const MODULES = [
  {
    name: "Mobile check-in/out",
    priority: "P0",
    description:
      "GPS-geofenced clock in/out with optional selfie verification, offline queue with background sync.",
  },
  {
    name: "Biometric terminal integration",
    priority: "P0",
    description:
      "SDK/webhook integration accepting punches from ZKTeco-class fingerprint/face devices as an alternate input.",
  },
  {
    name: "Shift scheduling",
    priority: "P0",
    description: "Manager-built rosters, shift swaps/requests, conflict detection.",
  },
  {
    name: "Admin dashboard",
    priority: "P0",
    description:
      "Multi-site view, live attendance status, exception alerts (late, absent, no-show).",
  },
  {
    name: "Reporting & payroll export",
    priority: "P0",
    description:
      "Timesheet reports, CSV/Excel export, direct integration hooks for payroll systems.",
  },
  {
    name: "Leave management",
    priority: "P1",
    description: "Leave types, approval workflow, balance tracking, calendar view.",
  },
  {
    name: "Overtime & attendance rules",
    priority: "P1",
    description:
      "Configurable overtime thresholds, late/early rules, rounding policy per site.",
  },
] as const;

const CAPTURE_LAYER = [
  {
    icon: Smartphone,
    title: "Mobile app",
    detail: "React Native. GPS + selfie, geofenced check-in, offline-first.",
  },
  {
    icon: Fingerprint,
    title: "Biometric terminal",
    detail: "ZKTeco-class fingerprint/face device via SDK/webhook bridge.",
  },
  {
    icon: QrCode,
    title: "Web kiosk / QR",
    detail: "Shared tablet at fixed-site locations.",
  },
] as const;

const ROLES = [
  {
    role: "Staff",
    can: "Clock in/out, view own attendance + schedule, submit leave",
    cannot: "View other staff's data, edit schedules, access admin dashboard",
  },
  {
    role: "Manager",
    can: "Build/edit shifts for their site, approve leave, view site-level reports",
    cannot: "Access other sites, change org billing/plan, add biometric devices",
  },
  {
    role: "Org Admin",
    can: "Full access within their organization: all sites, staff, payroll export, billing",
    cannot: "Access other organizations' data",
  },
  {
    role: "Super Admin",
    can: "Full platform access: all organizations, plan management, support tooling",
    cannot: "—",
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="font-label text-primary">
              Workforce attendance &amp; time management
            </span>
            <h1 className="mt-4 max-w-xl font-serif text-5xl leading-[1.05] md:text-6xl">
              Clock in from the field.{" "}
              <span className="italic text-primary">See it live</span> from
              the office.
            </h1>
            <p className="mt-6 max-w-lg text-muted-foreground">
              Cloud-native, mobile-first attendance for Kenya&apos;s deskless
              workforce — geofenced mobile check-in, ZKTeco/Hikvision-class
              biometric terminals, and shift scheduling in one dashboard your
              site managers will actually open.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact">
                <Button size="lg">
                  Request a pilot <ArrowRight />
                </Button>
              </a>
              <a href="#modules">
                <Button size="lg" variant="outline">
                  See what&apos;s included
                </Button>
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <HeroPreview />
          </div>
        </div>

        <StatTiles
          className="mt-16"
          tiles={[
            { value: "4", label: "Reference systems benchmarked" },
            { value: "7", label: "Core modules" },
            { value: "6", label: "Payment models evaluated" },
            { value: "P0", label: "Company priority" },
          ]}
        />
      </section>

      {/* v1 Core Modules */}
      <section id="modules" className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-3xl">
            v1 core <span className="italic text-primary">modules</span>
          </h2>
          <span className="font-label text-muted-foreground hidden md:block">
            Section 03 · Product scope
          </span>
        </div>
        <Separator className="mt-4 mb-8" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod) => (
            <Card key={mod.name}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle>{mod.name}</CardTitle>
                  <Badge variant={mod.priority === "P0" ? "attention" : "outline"}>
                    {mod.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{mod.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Capture layer */}
      <section id="capture" className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-3xl">
            Where attendance <span className="italic text-primary">happens</span>
          </h2>
          <span className="font-label text-muted-foreground hidden md:block">
            Section 04 · Technical architecture
          </span>
        </div>
        <Separator className="mt-4 mb-8" />

        <div className="grid gap-4 md:grid-cols-3">
          {CAPTURE_LAYER.map(({ icon: Icon, title, detail }) => (
            <Card key={title}>
              <CardHeader>
                <Icon className="size-6 text-primary" strokeWidth={1.5} />
                <CardTitle className="mt-2">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{detail}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-3xl">
            Roles, auth &amp; <span className="italic text-primary">permissions</span>
          </h2>
          <span className="font-label text-muted-foreground hidden md:block">
            Section 06 · RLS, org_id first
          </span>
        </div>
        <Separator className="mt-4 mb-8" />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Can do</TableHead>
              <TableHead>Cannot do</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROLES.map((r) => (
              <TableRow key={r.role}>
                <TableCell className="font-medium">{r.role}</TableCell>
                <TableCell className="text-muted-foreground">
                  <span className="inline-flex items-start gap-2">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    {r.can}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {r.cannot !== "—" && (
                    <span className="inline-flex items-start gap-2">
                      <X className="mt-0.5 size-3.5 shrink-0" />
                      {r.cannot}
                    </span>
                  )}
                  {r.cannot === "—" && r.cannot}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* CTA band — two-thirds ink field, per DS-01 section-opener convention */}
      <section className="bg-pac-ink text-pac-paper">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <span className="font-label text-primary">Ready when you are</span>
          <h2 className="mt-4 max-w-xl font-serif text-4xl">
            Bring AttendPAC to your sites.
          </h2>
          <p className="mt-4 max-w-lg text-pac-paper/70">
            One geofenced check-in flow for guards, field staff, and site
            teams — with a live dashboard that tells you who&apos;s on site
            right now, not who clocked in yesterday.
          </p>
          <a href="#contact">
            <Button size="lg" className="mt-8">
              Request a pilot <ArrowRight />
            </Button>
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="font-label text-primary">Get in touch</span>
            <h2 className="mt-4 font-serif text-3xl">
              Tell us about your <span className="italic text-primary">sites</span>.
            </h2>
            <p className="mt-4 max-w-sm text-muted-foreground">
              Share a bit about your team and we&apos;ll set up a pilot on
              your own sites — no long procurement process, no hardware
              purchase required to start.
            </p>
            <Separator className="my-6" />
            <dl className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="font-label text-muted-foreground">Response time</dt>
                <dd>Within 1 business day</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-label text-muted-foreground">Coverage</dt>
                <dd>Nairobi &amp; nationwide</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-label text-muted-foreground">Email</dt>
                <dd>hello@pac.africa</dd>
              </div>
            </dl>
          </div>

          <ContactForm />
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-8 text-muted-foreground">
          <span className="font-label">
            PAC Africa · Gordian Knotz Technovation · Confidential
          </span>
        </div>
      </footer>
    </div>
  );
}
