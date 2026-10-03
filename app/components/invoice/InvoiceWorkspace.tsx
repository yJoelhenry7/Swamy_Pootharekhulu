"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  FaPlus,
  FaTrash,
  FaPrint,
  FaRedo,
} from "react-icons/fa";
import Link from "next/link";
import InvoicePreview from "./InvoicePreview";
import {
  PRODUCT_PRESETS,
  calculateTotals,
  createDefaultInvoice,
  createEmptyItem,
  createLineId,
  formatINR,
  type InvoiceData,
  type InvoiceLineItem,
  type InvoiceOrderType,
  type InvoicePaymentMethod,
  type InvoiceUnit,
} from "../../utils/invoice";

const fieldClass =
  "w-full rounded-lg border border-[var(--bronze)]/30 bg-white px-3 py-2 text-sm text-[var(--deep)] outline-none transition focus:border-[var(--bronze)] focus:ring-2 focus:ring-[var(--gold)]/30";

const labelClass =
  "mb-1 block text-xs font-semibold tracking-wide text-[var(--deep)]";

export default function InvoiceWorkspace() {
  const t = useTranslations("invoice");
  const locale = useLocale();
  const [data, setData] = useState<InvoiceData>(() => createDefaultInvoice());
  const totals = useMemo(() => calculateTotals(data), [data]);

  const update = <K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const updateItem = (
    id: string,
    key: keyof InvoiceLineItem,
    value: string | number,
  ) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      ),
    }));
  };

  const addItem = () => {
    setData((prev) => ({ ...prev, items: [...prev.items, createEmptyItem()] }));
  };

  const addPreset = (preset: (typeof PRODUCT_PRESETS)[number]) => {
    setData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: createLineId(),
          name: preset.name,
          unit: preset.unit,
          quantity: 1,
          rate: preset.rate,
        },
      ],
    }));
  };

  const removeItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.length <= 1
        ? prev.items
        : prev.items.filter((item) => item.id !== id),
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setData(createDefaultInvoice());
  };

  return (
    <div className="invoice-workspace">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-[var(--bronze)] uppercase">
            {t("tag")}
          </p>
          <h1 className="font-serif text-3xl font-semibold text-[var(--deep)] md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-1 max-w-xl text-sm text-[var(--ink)]/70">
            {t("description")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/${locale}`}
            className="rounded-full border border-[var(--bronze)]/30 bg-white px-4 py-2 text-sm font-semibold text-[var(--deep)] transition hover:border-[var(--bronze)]"
          >
            {t("backHome")}
          </Link>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--bronze)]/30 bg-white px-4 py-2 text-sm font-semibold text-[var(--deep)] transition hover:border-[var(--bronze)]"
          >
            <FaRedo className="h-3 w-3" />
            {t("reset")}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--deep)] px-5 py-2 text-sm font-semibold text-[var(--cream)] shadow-md transition hover:bg-[var(--bronze)]"
          >
            <FaPrint className="h-3.5 w-3.5" />
            {t("print")}
          </button>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* Form */}
        <form
          className="print:hidden space-y-5 rounded-2xl border border-[var(--bronze)]/20 bg-white/90 p-5 shadow-[0_12px_40px_rgba(61,46,26,0.08)] sm:p-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-[var(--deep)]">
              {t("sections.invoice")}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className={labelClass}>{t("fields.invoiceNumber")}</span>
                <input
                  className={fieldClass}
                  value={data.invoiceNumber}
                  onChange={(e) => update("invoiceNumber", e.target.value)}
                />
              </label>
              <label className="block">
                <span className={labelClass}>{t("fields.invoiceDate")}</span>
                <input
                  type="date"
                  className={fieldClass}
                  value={data.invoiceDate}
                  onChange={(e) => update("invoiceDate", e.target.value)}
                />
              </label>
              <label className="block">
                <span className={labelClass}>{t("fields.orderType")}</span>
                <select
                  className={fieldClass}
                  value={data.orderType}
                  onChange={(e) =>
                    update("orderType", e.target.value as InvoiceOrderType)
                  }
                >
                  {(
                    ["counter", "whatsapp", "stall", "bulk", "gift"] as const
                  ).map((key) => (
                    <option key={key} value={key}>
                      {t(`orderTypes.${key}`)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={labelClass}>{t("fields.payment")}</span>
                <select
                  className={fieldClass}
                  value={data.paymentMethod}
                  onChange={(e) =>
                    update(
                      "paymentMethod",
                      e.target.value as InvoicePaymentMethod,
                    )
                  }
                >
                  {(["cash", "upi", "bank", "pending"] as const).map((key) => (
                    <option key={key} value={key}>
                      {t(`paymentMethods.${key}`)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-[var(--deep)]">
              {t("sections.customer")}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className={labelClass}>{t("fields.customerName")}</span>
                <input
                  className={fieldClass}
                  value={data.customerName}
                  onChange={(e) => update("customerName", e.target.value)}
                  placeholder={t("placeholders.customerName")}
                />
              </label>
              <label className="block">
                <span className={labelClass}>{t("fields.customerPhone")}</span>
                <input
                  className={fieldClass}
                  value={data.customerPhone}
                  onChange={(e) => update("customerPhone", e.target.value)}
                  placeholder="+91"
                />
              </label>
              <label className="block">
                <span className={labelClass}>{t("fields.customerPincode")}</span>
                <input
                  className={fieldClass}
                  value={data.customerPincode}
                  onChange={(e) => update("customerPincode", e.target.value)}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className={labelClass}>{t("fields.customerAddress")}</span>
                <textarea
                  className={`${fieldClass} min-h-[72px] resize-y`}
                  value={data.customerAddress}
                  onChange={(e) => update("customerAddress", e.target.value)}
                  placeholder={t("placeholders.customerAddress")}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className={labelClass}>{t("fields.customerCity")}</span>
                <input
                  className={fieldClass}
                  value={data.customerCity}
                  onChange={(e) => update("customerCity", e.target.value)}
                />
              </label>
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="font-serif text-xl font-semibold text-[var(--deep)]">
                {t("sections.items")}
              </h2>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--ivory)] px-3 py-1.5 text-xs font-semibold text-[var(--deep)] ring-1 ring-[var(--bronze)]/25 transition hover:bg-[var(--deep)] hover:text-[var(--cream)]"
              >
                <FaPlus className="h-3 w-3" />
                {t("addItem")}
              </button>
            </div>

            <div className="mb-3 flex flex-wrap gap-1.5">
              {PRODUCT_PRESETS.slice(0, 6).map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => addPreset(preset)}
                  className="rounded-full border border-[var(--bronze)]/20 bg-[var(--cream)] px-2.5 py-1 text-[11px] font-medium text-[var(--deep)] transition hover:border-[var(--bronze)]"
                >
                  + {preset.name.split(" ")[0]}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {data.items.map((item, index) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-[var(--bronze)]/20 bg-[var(--ivory)]/35 p-3"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--bronze)]">
                      {t("item")} #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      disabled={data.items.length <= 1}
                      className="rounded-full p-1.5 text-[var(--deep)] transition hover:bg-white disabled:opacity-30"
                      aria-label={t("removeItem")}
                    >
                      <FaTrash className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <label className="block sm:col-span-2">
                      <span className={labelClass}>{t("fields.itemName")}</span>
                      <input
                        list="invoice-product-presets"
                        className={fieldClass}
                        value={item.name}
                        onChange={(e) =>
                          updateItem(item.id, "name", e.target.value)
                        }
                      />
                    </label>
                    <label className="block">
                      <span className={labelClass}>{t("fields.unit")}</span>
                      <select
                        className={fieldClass}
                        value={item.unit}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "unit",
                            e.target.value as InvoiceUnit,
                          )
                        }
                      >
                        {(["pack", "kg", "piece"] as const).map((unit) => (
                          <option key={unit} value={unit}>
                            {t(`units.${unit}`)}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className={labelClass}>{t("fields.qty")}</span>
                      <input
                        type="number"
                        min={0}
                        step={1}
                        className={fieldClass}
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "quantity",
                            Number(e.target.value) || 0,
                          )
                        }
                      />
                    </label>
                    <label className="block">
                      <span className={labelClass}>{t("fields.rate")}</span>
                      <input
                        type="number"
                        min={0}
                        step={1}
                        className={fieldClass}
                        value={item.rate}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "rate",
                            Number(e.target.value) || 0,
                          )
                        }
                      />
                    </label>
                    <div className="flex items-end">
                      <p className="w-full rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[var(--deep)] ring-1 ring-[var(--bronze)]/15">
                        {formatINR(
                          Math.max(0, item.quantity) * Math.max(0, item.rate),
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <datalist id="invoice-product-presets">
              {PRODUCT_PRESETS.map((preset) => (
                <option key={preset.name} value={preset.name} />
              ))}
            </datalist>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-[var(--deep)]">
              {t("sections.charges")}
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="block">
                <span className={labelClass}>{t("fields.packaging")}</span>
                <input
                  type="number"
                  min={0}
                  className={fieldClass}
                  value={data.packagingCharge}
                  onChange={(e) =>
                    update("packagingCharge", Number(e.target.value) || 0)
                  }
                />
              </label>
              <label className="block">
                <span className={labelClass}>{t("fields.delivery")}</span>
                <input
                  type="number"
                  min={0}
                  className={fieldClass}
                  value={data.deliveryCharge}
                  onChange={(e) =>
                    update("deliveryCharge", Number(e.target.value) || 0)
                  }
                />
              </label>
              <label className="block">
                <span className={labelClass}>{t("fields.discount")}</span>
                <input
                  type="number"
                  min={0}
                  className={fieldClass}
                  value={data.discount}
                  onChange={(e) =>
                    update("discount", Number(e.target.value) || 0)
                  }
                />
              </label>
            </div>
            <label className="mt-3 block">
              <span className={labelClass}>{t("fields.notes")}</span>
              <textarea
                className={`${fieldClass} min-h-[80px] resize-y`}
                value={data.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder={t("placeholders.notes")}
              />
            </label>
          </section>

          <div className="flex items-center justify-between rounded-xl bg-[var(--deep)] px-4 py-3 text-[var(--cream)]">
            <span className="text-sm font-medium">{t("liveTotal")}</span>
            <span className="font-serif text-2xl font-semibold tabular-nums">
              {formatINR(totals.grandTotal)}
            </span>
          </div>
        </form>

        {/* Preview */}
        <div className="invoice-preview-pane xl:sticky xl:top-24 xl:self-start">
          <div className="mb-3 flex items-center justify-between print:hidden">
            <p className="text-xs font-semibold tracking-[0.16em] text-[var(--bronze)] uppercase">
              {t("preview")}
            </p>
            <button
              type="button"
              onClick={handlePrint}
              className="text-sm font-semibold text-[var(--bronze)] underline-offset-4 hover:underline"
            >
              {t("printHint")}
            </button>
          </div>
          <InvoicePreview data={data} totals={totals} />
        </div>
      </div>
    </div>
  );
}
