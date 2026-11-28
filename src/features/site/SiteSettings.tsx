"use client";
import { createContext, useContext, type ReactNode } from "react";
export type PublicSettings = Record<string, Record<string, string | null>>;
const SettingsContext = createContext<PublicSettings>({});
export type SiteNavigation = {
  products: { slug: string; title: string }[];
  brands: { slug: string; name: string }[];
  categories: { slug: string; name: string }[];
};
const NavigationContext = createContext<SiteNavigation>({
  products: [],
  brands: [],
  categories: [],
});
export function SiteSettingsProvider({
  value,
  navigation,
  children,
}: {
  value: PublicSettings;
  navigation?: SiteNavigation;
  children: ReactNode;
}) {
  return (
    <NavigationContext.Provider
      value={navigation || { products: [], brands: [], categories: [] }}
    >
      <SettingsContext.Provider value={value}>
        {children}
      </SettingsContext.Provider>
    </NavigationContext.Provider>
  );
}
export function useSiteSettings() {
  return useContext(SettingsContext);
}
export function useSiteNavigation() {
  return useContext(NavigationContext);
}
