export type FormKind =
  "registrations" | "volunteers" | "ambassadors" | "messages";
export type SubmitResult =
  { ok: true; id: string } | { ok: false; message: string };
export type SubmissionWriter = (
  kind: FormKind,
  data: Record<string, unknown>,
) => Promise<string>;

export async function submitWithWriter(
  kind: FormKind,
  data: Record<string, unknown>,
  writer: SubmissionWriter,
  timeoutMs = 12000,
): Promise<SubmitResult> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const id = await Promise.race([
      writer(kind, data),
      new Promise<never>((_, reject) => {
        timer = setTimeout(
          () => reject({ code: "deadline-exceeded" }),
          timeoutMs,
        );
      }),
    ]);
    return { ok: true, id };
  } catch (error: unknown) {
    const code =
      typeof error === "object" && error !== null && "code" in error
        ? error.code
        : "";
    if (code === "deadline-exceeded")
      return {
        ok: false,
        message:
          "We could not confirm that your submission was saved. Please contact info@nasaspaceapps.lk before sending it again.",
      };
    if (code === "unavailable")
      return {
        ok: false,
        message:
          "No connection to the server. Check your network and try again.",
      };
    if (code === "permission-denied")
      return {
        ok: false,
        message:
          "We could not save your submission. Please contact info@nasaspaceapps.lk for help.",
      };
    return {
      ok: false,
      message:
        "Something went wrong. Please try again, or email info@nasaspaceapps.lk.",
    };
  } finally {
    clearTimeout(timer);
  }
}

export async function submitForm(
  kind: FormKind,
  data: Record<string, unknown>,
): Promise<SubmitResult> {
  // Load Firebase only when a form is submitted, not on the marketing pages.
  return submitWithWriter(kind, data, async (collectionName, payload) => {
    const [{ addDoc, collection, serverTimestamp }, { getSubmissionDatabase }] =
      await Promise.all([
        import("firebase/firestore/lite"),
        import("./firebase"),
      ]);
    const ref = await addDoc(
      collection(getSubmissionDatabase(), collectionName),
      {
        ...payload,
        createdAt: serverTimestamp(),
        source: "web",
        appVersion: "2.0.0",
        status: "new",
      },
    );
    return ref.id;
  });
}
