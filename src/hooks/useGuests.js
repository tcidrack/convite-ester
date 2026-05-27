import { useState, useEffect, useCallback } from "react";
import { CONFIG } from "../config/event";
import { supabase } from "../lib/supabase";

const STORAGE_KEY = `guests_${CONFIG.eventId}`;
const TABLE = "convidados_ester";

// ── Helpers de localStorage ──────────────────────────────────
function localLoad() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function localSave(guests) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guests));
  } catch {
    /* storage cheio — ignora */
  }
}

// Formata o timestamp do Supabase para exibição
function formatTime(isoString) {
  return new Date(isoString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Mapeia uma linha do Supabase para o formato interno do app
function fromRow(row) {
  return {
    id:       row.id,
    name:     row.name,
    presence: row.presence,
    message:  row.message || "",
    time:     formatTime(row.created_at),
  };
}

// ── Hook ─────────────────────────────────────────────────────
export function useGuests() {
  const [guests, setGuests] = useState(localLoad);
  const [loading, setLoading] = useState(true);

  // Carrega do Supabase ao montar; cai no localStorage se falhar
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from(TABLE)
        .select("*")
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (!error && data) {
        const mapped = data.map(fromRow);
        setGuests(mapped);
        localSave(mapped); // mantém cache local sincronizado
      }
      // Em caso de erro de rede, permanece com o estado local já carregado
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  // Insere no Supabase E no localStorage
  const addGuest = useCallback(async (guest) => {
    const payload = {
      name:     guest.name,
      presence: guest.presence,
      message:  guest.message || "",
    };

    // Tenta inserir no Supabase
    const { data, error } = await supabase
      .from(TABLE)
      .insert(payload)
      .select()
      .single();

    const entry = error
      ? { ...payload, id: Date.now(), time: formatTime(new Date().toISOString()) }
      : fromRow(data);

    setGuests((prev) => {
      const next = [entry, ...prev];
      localSave(next);
      return next;
    });

    if (error) {
      console.warn("Supabase insert falhou, salvo apenas localmente:", error.message);
    }

    return entry;
  }, []);

  const stats = {
    total: guests.length,
    yes:   guests.filter((g) => g.presence === "yes").length,
    no:    guests.filter((g) => g.presence === "no").length,
  };

  return { guests, addGuest, stats, loading };
}
