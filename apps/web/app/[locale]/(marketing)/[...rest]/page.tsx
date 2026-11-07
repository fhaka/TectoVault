import { notFound } from "next/navigation";

// Any URL that matches no page renders the localized 404 (not-found.tsx in
// this route group) inside the site layout, in the visitor's language.
export default function CatchAllNotFound() {
  notFound();
}
