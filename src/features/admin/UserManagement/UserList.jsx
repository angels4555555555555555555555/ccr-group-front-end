"use client";
import React, { useMemo, useState } from "react";
import { Pagination } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import MentineMenu from "@/features/common/MentineMenu";
import { useDeleteUser, useRevealPassword } from "@/hooks/admin/userManagement";
import { useQueryClient } from "@tanstack/react-query";
import LoadingBackdrop from "@/features/common/LoadingBackdrop";
const PRODUCT_LABELS = { festgeld: "Festgeld", tagesgeld: "Tagesgeld", openAI: "OpenAI" };
const productNames = (products = []) => products.map((product) => PRODUCT_LABELS[product] || product).join(", ") || "–";
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
      <div className="w-full overflow-hidden rounded-md border border-[#E2E8F0] bg-white">
        {/* Kopfzeile */}
        {!isTabletOrMobile ? (
          <div className="grid grid-cols-10 items-center h-[64px] px-4 text-[#94A3B8] text-[14px] font-semibold bg-[#F4F4F7]">
            <div className="col-span-1 flex items-center">
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

            <div className="col-span-2">Name</div>
            <div className="col-span-2">E-Mail</div>
            <div className="col-span-1">Geschlecht</div>
            <div className="col-span-1">Land</div>
            <div className="col-span-2">Produkte</div>
            <div className="col-span-1">
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
              {data?.users.map((row, idx) => {
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
                        <span className="text-[#64748B]">Geschlecht</span>
                        <span className="font-medium">{row.gender}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">Land</span>
                        <span className="font-semibold">{row.country}</span>
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <span className="text-[#64748B]">Produkte</span>
                        <span className="text-right font-semibold">{productNames(row.products)}</span>
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
                    className={`grid grid-cols-10 items-center px-4 h-[64px] text-[14px] ${
                      idx !== data.users.length - 1
                        ? "border-b border-[#E2E8F0]"
                        : ""
                    } hover:bg-[#F8FAFC]`}
                  >
                    <div className="col-span-1 flex items-center">
                      <input
                        type="checkbox"
                        className="size-4 accent-black"
                        checked={isChecked}
                        onChange={() => toggleOne(row._id)}
                        aria-label={`Auswählen: ${row.firstName} ${row.lastName}`}
                      />
                    </div>
                    <div className="col-span-2 truncate">
                      {row.firstName} {row.lastName}
                    </div>
                    <div className="col-span-2 truncate text-[#334155]">
                      {row.email}
                    </div>
                    <div className="col-span-1">{row.gender}</div>
                    <div className="col-span-1">{row.country}</div>
                    <div className="col-span-2 truncate font-medium">{productNames(row.products)}</div>
                    <div className="col-span-1">
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
