import type { FaqItem } from "@/lib/types";
import { faqLd } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { Accordion } from "@/components/ui/Accordion";

/** پرسش‌های متداول + JSON-LD (FAQPage) */
export function FaqList({ items, className, schema = true }: { items: FaqItem[]; className?: string; schema?: boolean }) {
  return (
    <>
      {schema ? <JsonLd data={faqLd(items)} /> : null}
      <Accordion items={items} className={className} />
    </>
  );
}
