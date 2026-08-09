export type NavigationItem = {
  label: string;
  href: string;
};

export type QuickAddType = "expense" | "reminder" | "event" | "grocery";

export type QuickAddAction = {
  id: QuickAddType;
  key: string;
  label: string;
  detail: string;
};
