import { permanentRedirect } from "next/navigation";

export default function EventsRedirect() {
  permanentRedirect("/event-details");
}
