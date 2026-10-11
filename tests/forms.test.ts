import test from "node:test";
import assert from "node:assert/strict";
import {
  buildPayload,
  validateForm,
  initialValues,
} from "../src/lib/form-schema";
import { submitWithWriter } from "../src/lib/submissions";
import { availabilityOptions, mentorSkills } from "../src/content/site";

test("registration rejects missing consent and team data", () => {
  const errors = validateForm("registrations", {
    ...initialValues.registrations,
    leadName: "Test Person",
    leadEmail: "invalid",
  });
  assert.ok(errors.teamName);
  assert.ok(errors.leadEmail);
  assert.ok(errors.agreed);
});
test("solo payload uses the original collection contract without stale team fields", () => {
  const values = {
    ...initialValues.registrations,
    track: "solo",
    teamName: "Old team",
    memberCount: "6",
    leadName: " Test Person ",
    leadEmail: "TEST@example.org ",
    agreed: true,
  };
  assert.deepEqual(validateForm("registrations", values), {});
  assert.deepEqual(buildPayload("registrations", values), {
    leadName: "Test Person",
    leadEmail: "test@example.org",
    leadPhone: null,
    institution: null,
    challengePref: "Not sure yet",
    track: "solo",
    memberCount: 1,
    teamName: null,
    agreedToCodeOfConduct: true,
  });
});
test("mentor applications retain skills and availability under volunteers", () => {
  const values = {
    role: "mentor",
    fullName: "Test Person",
    email: "test@example.org",
    skills: [mentorSkills[0]],
    availability: [availabilityOptions[0]],
  };
  assert.deepEqual(validateForm("volunteers", values), {});
  const payload = buildPayload("volunteers", values);
  assert.equal(payload.role, "mentor");
  assert.deepEqual(payload.skills, [mentorSkills[0]]);
  assert.deepEqual(payload.availability, [availabilityOptions[0]]);
  assert.ok(
    validateForm("volunteers", { ...values, skills: ["Invalid skill"] }).skills,
  );
});
test("ambassador contract and maximum lengths match existing rules", () => {
  const values = {
    ...initialValues.ambassadors,
    fullName: "Test Person",
    email: "test@example.org",
    institution: "Test University",
    motivation: "Connect my campus.",
    agreed: true,
  };
  assert.deepEqual(validateForm("ambassadors", values), {});
  assert.equal(buildPayload("ambassadors", values).agreedToCommitment, true);
  assert.ok(
    validateForm("ambassadors", { ...values, motivation: "x".repeat(1001) })
      .motivation,
  );
});
test("contact rejects long messages, malformed email and invalid optional phone elsewhere", () => {
  assert.ok(
    validateForm("messages", {
      ...initialValues.messages,
      name: "Person",
      email: "bad",
      message: "x".repeat(2001),
    }).message,
  );
  assert.ok(
    validateForm("messages", {
      ...initialValues.messages,
      name: "Person",
      email: "bad",
      message: "Hello",
    }).email,
  );
  assert.ok(
    validateForm("registrations", {
      ...initialValues.registrations,
      leadPhone: "123",
    }).leadPhone,
  );
});
test("success returns only after the writer confirms the correct collection and payload", async () => {
  const payload = buildPayload("messages", {
    ...initialValues.messages,
    name: "Test Person",
    email: "test@example.org",
    message: "Local unit test",
  });
  const result = await submitWithWriter(
    "messages",
    payload,
    async (kind, data) => {
      assert.equal(kind, "messages");
      assert.equal(data.message, "Local unit test");
      return "local-test-receipt";
    },
  );
  assert.deepEqual(result, { ok: true, id: "local-test-receipt" });
});
test("permission and offline failures never report success", async () => {
  for (const code of ["permission-denied", "unavailable"]) {
    const result = await submitWithWriter("messages", {}, async () => {
      throw { code };
    });
    assert.equal(result.ok, false);
  }
});
test("timeout reports an unconfirmed write and asks users to check before duplicating it", async () => {
  const result = await submitWithWriter(
    "messages",
    {},
    () => new Promise(() => {}),
    5,
  );
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.message, /could not confirm/);
});
