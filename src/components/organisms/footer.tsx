import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
  storeName?: string;
}

export function Footer({ className, storeName }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "mt-auto border-t border-outline-variant bg-surface-container",
        className
      )}
    >
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-body-sm text-on-surface-variant">
            &copy; {year} {storeName || "Cardápio Digital"}. Todos os direitos
            reservados.
          </p>
          <p className="text-body-sm text-on-surface-variant">
            Feito com{" "}
            <span aria-label="amor" role="img">
              ❤️
            </span>{" "}
            via{" "}
            <Link
              href="/"
              className="text-primary hover:text-primary-container transition-colors underline underline-offset-2"
            >
              Manda-Vai
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
