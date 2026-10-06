import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main id="main-content" className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center mx-auto shadow-inner font-black text-2xl">
            404
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Page Not Found
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The job posting, company profile, or page you were looking for could not be found or has been expired.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link href="/jobs">
              <Button variant="primary" size="md" className="font-semibold bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4 mr-1.5" />
                <span>Browse All Jobs</span>
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="md" className="font-semibold">
                <Home className="w-4 h-4 mr-1.5" />
                <span>Return Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
