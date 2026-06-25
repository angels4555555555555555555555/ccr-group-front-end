"use client";
import React, { useMemo, useState } from "react";
import { Pagination } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import MentineMenu from "@/features/common/MentineMenu";
import { useDeleteUser, useRevealPassword } from "@/hooks/admin/userManagement";
import { useQueryClient } from "@tanstack/react-query";
import LoadingBackdrop from "@/features/common/LoadingBackdrop";
const EMPTY_VALUE = "-";
const CURRENCY_FORMATTER = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

const productAmount = (row, product, field) => {
  if (!row.products?.includes(product)) return EMPTY_VALUE;
  const amount = row[product]?.[field];
  if (amount === null || amount === undefined || amount === "") return EMPTY_VALUE;
  const value = Number(amount);
  return Number.isFinite(value) ? CURRENCY_FORMATTER.format(value) : EMPTY_VALUE;
};

const UserList = ({
  data,
  setCurrentUser,
  setPassword,
  openPassword,
  setFilter,
  filter,
  openEdit,
}) => {
  const [selected, setSelected] = useState(new Set());
  const allIds = useMemo(() => data?.users.map((d) => d._id) || [], [data]);
  const allSelected = selected.size === allIds?.length && allIds.length > 0;
  const isIndeterminate = selected.size > 0 && !allSelected;
  const isTabletOrMobile = useMediaQuery("(max-width: 1023px)", undefined, {
    getInitialValueInEffect: true,
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useDeleteUser(() => {
    queryClient.invalidateQueries({ queryKey: ["usersList"] });
    setSelected(new Set());
  });
  const { mutate: revealPassword, isPending: isRevealingPassword } =
    useRevealPassword((res) => {
      setPassword(res.password);
      openPassword();
    });
  const toggleAll = (checked) => {
    if (checked) setSelected(new Set(allIds));
    else setSelected(new Set());
  };

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const handleBulkDelete = () => {
    const ids = Array.from(selected);
    if (!ids.length) return;
    if (window.confirm(`${ids.length} Benutzer wirklich löschen?`)) mutate(ids);
  };
  const handleEdit = (id) => {
    setCurrentUser(id);
    openEdit();
  };
  const handleRevealPassword = (id) => {
    revealPassword(id);
  };
  const handleDelete = (id) => {
    if (window.confirm("Diesen Benutzer wirklich löschen?")) mutate([id]);
  };
  //  Menu Items
  const bulkMenuItems = [
    { label: "Ausgewählte Benutzer löschen", onClick: handleBulkDelete },
  ];
  const rowMenuItems = (id) => [
    { label: "Benutzer löschen", onClick: () => handleDelete(id) },
    { label: "Benutzer bearbeiten", onClick: () => handleEdit(id) },
    { label: "Passwort anzeigen", onClick: () => handleRevealPassword(id) },
  ];

  return (
    <>
      {(isPending || isRevealingPassword) && <LoadingBackdrop />}
      <div className="w-full overflow-x-auto rounded-md border border-[#D8DEE8] bg-white">
        {/* Kopfzeile */}
        {!isTabletOrMobile ? (
          <div className="grid min-w-[1120px] grid-cols-[64px_minmax(180px,1.2fr)_minmax(230px,1.2fr)_minmax(220px,1.75fr)_minmax(140px,0.9fr)_minmax(150px,0.9fr)_minmax(130px,0.8fr)_48px] items-center h-20 bg-[#F4F4F5] text-[14px] font-bold uppercase tracking-[0.14em] text-[#3B4263]">
            <div className="flex items-center justify-center">
              <input
                type="checkbox"
                className="size-5 accent-black"
                checked={allSelected}
                onChange={(e) => toggleAll(e.target.checked)}
                ref={(el) => {
                  if (el) el.indeterminate = isIndeterminate;
                }}
                aria-label="Alle Zeilen auswählen"
              />
            </div>

            <div className="px-4">Name</div>
            <div className="px-4">E-Mail</div>
            <div className="px-4">Land</div>
            <div className="px-4 text-right">Festgeld</div>
            <div className="px-4 text-right">Tagesgeld</div>
            <div className="px-4 text-right">OpenAI</div>
            <div>
              <div className="flex justify-center">
                <MentineMenu items={bulkMenuItems} ariaLabel="Sammelaktionen" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-between px-4 pt-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="size-4 accent-black"
                checked={allSelected}
                onChange={(e) => toggleAll(e.target.checked)}
                ref={(el) => {
                  if (el) el.indeterminate = isIndeterminate;
                }}
                aria-label="Alle Zeilen auswählen"
              />
            </div>
            <div className="flex justify-center">
              <MentineMenu items={bulkMenuItems} ariaLabel="Sammelaktionen" />
            </div>
          </div>
        )}

        {/* Zeilen */}
        <div className="overflow-y-auto lg:max-h-[calc(100dvh-420px)] md:max-h-[calc(100dvh-400px)] max-h-[calc(100dvh-480px)]">
          {isTabletOrMobile ? (
            <div className="grid md:grid-cols-2 gap-4 p-4">
              {data?.users.map((row) => {
                const isChecked = selected.has(row._id);
                return (
                  <div
                    key={row._id}
                    className="border border-[#F1F5F9] bg-white"
                  >
                    {/* Kopfzeile: Checkbox + Name (links), Aktionen (rechts) */}
                    <div className="flex md:items-start justify-between items-center px-4 py-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="size-4 accent-black"
                          checked={isChecked}
                          onChange={() => toggleOne(row._id)}
                          aria-label={`Auswählen: ${row.firstName} ${row.lastName}`}
                        />
                        <span className="font-semibold text-[15px]">
                          {row.firstName} {row.lastName}
                        </span>
                      </label>

                      <MentineMenu
                        items={rowMenuItems(row._id)}
                        ariaLabel={`Aktionen für ${row.firstName} ${row.lastName}`}
                      />
                    </div>
                    <hr className="border-1 border-[#E2E8F0] mb-4" />

                    {/* Inhalte */}
                    <div className="px-4 pb-4 text-[14px] flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">E-Mail</span>
                        <span className="text-right text-[#334155] break-all">
                          {row.email}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">Land</span>
                        <span className="font-semibold">{row.country}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">Festgeld</span>
                        <span className="font-medium">{productAmount(row, "festgeld", "betrag")}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">Tagesgeld</span>
                        <span className="font-medium">{productAmount(row, "tagesgeld", "betrag")}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">OpenAI</span>
                        <span className="font-medium">{productAmount(row, "openAI", "investition")}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {data?.users.map((row, idx) => {
                const isChecked = selected.has(row._id);
                return (
                  <div
                    key={row._id}
                    className={`grid min-w-[1120px] grid-cols-[64px_minmax(180px,1.2fr)_minmax(230px,1.2fr)_minmax(220px,1.75fr)_minmax(140px,0.9fr)_minmax(150px,0.9fr)_minmax(130px,0.8fr)_48px] items-center h-20 text-[18px] text-[#020B2D] ${
                      idx !== data.users.length - 1
                        ? "border-b border-[#E2E8F0]"
                        : ""
                    } hover:bg-[#F8FAFC]`}
                  >
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="size-5 accent-black"
                        checked={isChecked}
                        onChange={() => toggleOne(row._id)}
                        aria-label={`Auswählen: ${row.firstName} ${row.lastName}`}
                      />
                    </div>
                    <div className="truncate px-4 font-semibold">
                      {row.firstName} {row.lastName}
                    </div>
                    <div className="truncate px-4 text-[#4A526C]">
                      {row.email}
                    </div>
                    <div className="truncate px-4">{row.country}</div>
                    <div className="px-4 text-right font-medium">{productAmount(row, "festgeld", "betrag")}</div>
                    <div className="px-4 text-right font-medium">{productAmount(row, "tagesgeld", "betrag")}</div>
                    <div className="px-4 text-right font-medium">{productAmount(row, "openAI", "investition")}</div>
                    <div>
                      <div className="flex justify-center">
                        <MentineMenu
                          items={rowMenuItems(row._id)}
                          ariaLabel={`Aktionen für ${row.firstName} ${row.lastName}`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <hr className="mt-4 mb-8 border-1 border-[#F1F5F9]" />
        <div className="pagination">
          <Pagination
            total={Math.max(1, data?.totalPages || 1)}
            value={filter.page}
            onChange={(page) => {
              setSelected(new Set());
              setFilter((prev) => ({ ...prev, page }));
            }}
            siblings={0}
            boundaries={1}
            mt="sm"
          />
        </div>
      </div>
    </>
  );
};

export default UserList;
