import data from "./site.config.json" with { type: "json" };
import type { Language } from "./i18n";

type Localized<T> = Record<Language, T>;

interface SiteSettings {
  site: {
    name: string;
    logoText: string;
    favicon: string;
    keywords?: Partial<Localized<string[]>>;
  };
  author: {
    name: Localized<string>;
    handle: string;
    github: string;
    avatar: string;
    role: Localized<string>;
    about: Localized<string>;
  };
  navigation: { label: string; url: string }[];
  socialLinks?: { name: string; label?: string; icon: string; url: string }[];
  text?: Partial<Localized<Record<string, string>>>;
}

// Pages CMS omits empty lists and objects when saving structured files.
// Keep optional data typed independently of the current JSON file's contents.
const settings: SiteSettings = data;
export default settings;
