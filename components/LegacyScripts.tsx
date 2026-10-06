"use client";

import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

type LegacyScript = {
  code: string;
  type?: string;
};

export default function LegacyScripts({ scripts }: { scripts: LegacyScript[] }) {
  useEffect(() => {
    const mounted: HTMLScriptElement[] = [];
    let loaded = 0;

    const signalReady = () => {
      loaded += 1;
      if (loaded === scripts.length) {
        document.dispatchEvent(new Event("DOMContentLoaded"));
      }
    };

    for (const item of scripts) {
      if (item.type === "module") {
        const code = item.code.replace(/^\s*import\s+.*?;\s*$/gm, "");
        const runLegacyModule = new Function(
          "initializeApp",
          "getFirestore",
          "collection",
          "addDoc",
          "getDocs",
          "deleteDoc",
          "doc",
          "orderBy",
          "query",
          "updateDoc",
          "where",
          code,
        );

        runLegacyModule(
          initializeApp,
          getFirestore,
          collection,
          addDoc,
          getDocs,
          deleteDoc,
          doc,
          orderBy,
          query,
          updateDoc,
          where,
        );
        signalReady();
        continue;
      }

      const script = document.createElement("script");
      script.type = item.type || "text/javascript";
      script.textContent = item.code;
      script.addEventListener("load", signalReady, { once: true });
      document.body.appendChild(script);
      mounted.push(script);

      signalReady();
    }

    return () => {
      for (const script of mounted) script.remove();
    };
  }, [scripts]);

  return null;
}
