"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { LOGO_SRC } from "../../utils/brand";
import {
  SELLER,
  type InvoiceData,
  type InvoiceTotals,
  formatDisplayDate,
  formatINR,
  lineTotal,
} from "../../utils/invoice";

type Props = {
  data: InvoiceData;
  totals: InvoiceTotals;
};

export default function InvoicePreview({ data, totals }: Props) {
  const t = useTranslations("invoice");

  return (
    <div
      id="invoice-preview"
      className="invoice-sheet mx-auto w-full max-w-[210mm] bg-white text-[var(--ink)] shadow-[0_18px_50px_rgba(61,46,26,0.14)]"
    >
      {/* Header */}
      <div className="relative overflow-hidden border-b-2 border-[var(--gold)] px-6 py-5 sm:px-8">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-[var(--gold)]" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[var(--gold)]/50 bg-[var(--ivory)]">
              <Image
                src={LOGO_SRC}
                alt={SELLER.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <p className="font-serif text-2xl font-semibold text-[var(--deep)]">
                {SELLER.name}
              </p>
              <p className="text-sm text-[var(--bronze)]">{SELLER.tagline}</p>
              <p className="mt-1 text-xs text-[var(--ink)]/65">
                {SELLER.address}
              </p>
              <p className="text-xs text-[var(--ink)]/65">
                {SELLER.phone} · {SELLER.website}
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="inline-block rounded-sm bg-[var(--deep)] px-3 py-1 font-sans text-xs font-semibold tracking-[0.18em] text-[var(--cream)] uppercase">
              {t("taxInvoice")}
            </p>
            <p className="mt-3 font-serif text-lg font-semibold text-[var(--deep)]">
              {data.invoiceNumber || "—"}
            </p>
            <p className="text-sm text-[var(--ink)]/70">
              {t("date")}: {formatDisplayDate(data.invoiceDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Meta row */}
      <div className="grid gap-4 border-b border-[var(--bronze)]/20 px-6 py-4 sm:grid-cols-2 sm:px-8">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.16em] text-[var(--bronze)] uppercase">
            {t("billTo")}
          </p>
          <p className="mt-1 font-serif text-lg font-semibold text-[var(--deep)]">
            {data.customerName || t("customerPlaceholder")}
          </p>
          {data.customerPhone ? (
            <p className="text-sm text-[var(--ink)]/75">{data.customerPhone}</p>
          ) : null}
          {(data.customerAddress || data.customerCity || data.customerPincode) && (
            <p className="mt-1 text-sm leading-relaxed text-[var(--ink)]/70">
              {[data.customerAddress, data.customerCity, data.customerPincode]
                .filter(Boolean)
                .join(", ")}
            </p>
          )}
        </div>
        <div className="sm:text-right">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-[var(--bronze)] uppercase">
            {t("orderDetails")}
          </p>
          <p className="mt-1 text-sm text-[var(--ink)]/80">
            {t("orderType")}:{" "}
            <span className="font-semibold text-[var(--deep)]">
              {t(`orderTypes.${data.orderType}`)}
            </span>
          </p>
          <p className="text-sm text-[var(--ink)]/80">
            {t("payment")}:{" "}
            <span className="font-semibold text-[var(--deep)]">
              {t(`paymentMethods.${data.paymentMethod}`)}
            </span>
          </p>
        </div>
      </div>

      {/* Items table */}
      <div className="px-6 py-5 sm:px-8">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[var(--deep)] text-[var(--cream)]">
              <th className="px-3 py-2.5 text-left font-sans text-[11px] font-semibold tracking-wider uppercase">
                #
              </th>
              <th className="px-3 py-2.5 text-left font-sans text-[11px] font-semibold tracking-wider uppercase">
                {t("item")}
              </th>
              <th className="px-3 py-2.5 text-left font-sans text-[11px] font-semibold tracking-wider uppercase">
                {t("unit")}
              </th>
              <th className="px-3 py-2.5 text-right font-sans text-[11px] font-semibold tracking-wider uppercase">
                {t("qty")}
              </th>
              <th className="px-3 py-2.5 text-right font-sans text-[11px] font-semibold tracking-wider uppercase">
                {t("rate")}
              </th>
              <th className="px-3 py-2.5 text-right font-sans text-[11px] font-semibold tracking-wider uppercase">
                {t("amount")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.items.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="border border-[var(--bronze)]/15 px-3 py-6 text-center text-[var(--ink)]/50"
                >
                  {t("noItems")}
                </td>
              </tr>
            ) : (
              data.items.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-[var(--bronze)]/15 odd:bg-[var(--ivory)]/40"
                >
                  <td className="px-3 py-2.5 text-[var(--ink)]/60">{index + 1}</td>
                  <td className="px-3 py-2.5 font-medium text-[var(--deep)]">
                    {item.name || t("unnamedItem")}
                  </td>
                  <td className="px-3 py-2.5 text-[var(--ink)]/70">
                    {t(`units.${item.unit}`)}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {item.quantity || 0}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {formatINR(item.rate || 0)}
                  </td>
                  <td className="px-3 py-2.5 text-right font-semibold tabular-nums text-[var(--deep)]">
                    {formatINR(lineTotal(item))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Totals */}
        <div className="mt-6 flex justify-end">
          <div className="w-full max-w-xs space-y-2 text-sm">
            <div className="flex justify-between text-[var(--ink)]/75">
              <span>{t("subtotal")}</span>
              <span className="tabular-nums">{formatINR(totals.subtotal)}</span>
            </div>
            {totals.packagingCharge > 0 && (
              <div className="flex justify-between text-[var(--ink)]/75">
                <span>{t("packaging")}</span>
                <span className="tabular-nums">
                  {formatINR(totals.packagingCharge)}
                </span>
              </div>
            )}
            {totals.deliveryCharge > 0 && (
              <div className="flex justify-between text-[var(--ink)]/75">
                <span>{t("delivery")}</span>
                <span className="tabular-nums">
                  {formatINR(totals.deliveryCharge)}
                </span>
              </div>
            )}
            {totals.discount > 0 && (
              <div className="flex justify-between text-[var(--bronze)]">
                <span>{t("discount")}</span>
                <span className="tabular-nums">
                  −{formatINR(totals.discount)}
                </span>
              </div>
            )}
            <div className="flex justify-between border-t-2 border-[var(--gold)] pt-3 font-serif text-lg font-semibold text-[var(--deep)]">
              <span>{t("grandTotal")}</span>
              <span className="tabular-nums">{formatINR(totals.grandTotal)}</span>
            </div>
          </div>
        </div>

        {data.notes ? (
          <div className="mt-6 rounded-md border border-[var(--bronze)]/20 bg-[var(--ivory)]/50 px-4 py-3">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-[var(--bronze)] uppercase">
              {t("notes")}
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-[var(--ink)]/80">
              {data.notes}
            </p>
          </div>
        ) : null}
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--bronze)]/20 px-6 py-4 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-[var(--ink)]/70">{t("thankYou")}</p>
            <p className="mt-1 text-xs text-[var(--ink)]/50">{SELLER.hours}</p>
          </div>
          <div className="text-left sm:text-right">
            <div className="mb-8 h-10 border-b border-dashed border-[var(--bronze)]/40 sm:w-48 sm:ml-auto" />
            <p className="text-xs font-semibold tracking-wide text-[var(--deep)]">
              {t("authorisedSignatory")}
            </p>
            <p className="text-xs text-[var(--ink)]/55">{SELLER.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
