"use client";
import Link from "next/link";
import { FormSelect } from "./FormSelect";
import { useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { CheckIcon } from "@phosphor-icons/react/dist/csr/Check";
import { ArrowUpRightIcon as ArrowUpRight } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { CheckCircleIcon as CheckCircle2 } from "@phosphor-icons/react/dist/csr/CheckCircle";
import { CircleNotchIcon as LoaderCircle } from "@phosphor-icons/react/dist/csr/CircleNotch";
import {
  fieldsFor,
  initialValues,
  validateForm,
  buildPayload,
  type FormValues,
} from "@/lib/form-schema";
import { useFormSubmit } from "@/lib/useFormSubmit";
import type { FormKind } from "@/lib/submissions";
import {
  availabilityOptions,
  mentorSkills,
  volunteerSkills,
  site,
} from "@/content/site";
import { useI18n, type StringKey } from "@/i18n";

const formTitles: Record<FormKind, StringKey> = {
  registrations: "form.title.registrations",
  volunteers: "form.title.volunteers",
  ambassadors: "form.title.ambassadors",
  messages: "form.title.messages",
};

const formCopy: Record<string, StringKey> = {
  "Full name": "form.field.fullName",
  "Your name": "form.field.yourName",
  "Team name": "form.field.teamName",
  "Team size": "form.field.teamSize",
  "Team lead name": "form.field.teamLead",
  "Email address": "form.field.email",
  "Phone number": "form.field.phone",
  "School, university, or organisation": "form.field.institutionOrganisation",
  "School or university": "form.field.institution",
  "Organisation or university": "form.field.affiliation",
  "Area of interest": "form.field.interest",
  Province: "form.field.province",
  "Academic year": "form.field.academicYear",
  "Why would you like to be an ambassador?": "form.field.motivation",
  Subject: "form.field.subject",
  "Your message": "form.field.message",
  "Not sure yet": "form.option.notSure",
  "General inquiry": "form.option.general",
  "Sponsorship & partners": "form.option.sponsorship",
  "Media & press": "form.option.media",
  "Team question": "form.option.teamQuestion",
};

export function ApplicationForm({ kind }: { kind: FormKind }) {
  const { t } = useI18n();
  const localize = (value: string) => formCopy[value] ? t(formCopy[value]) : value;
  const [values, setValues] = useState<FormValues>(() => ({
    ...initialValues[kind],
  }));
  const {
    errors,
    clearError,
    submitting,
    receipt,
    formError,
    submit,
    reset,
    trap,
    setTrap,
  } = useFormSubmit({
    kind,
    validate: () => validateForm(kind, values),
    build: () => buildPayload(kind, values),
  });
  function update(name: string, value: string | boolean | string[]) {
    setValues((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "role" ? { skills: [] } : {}),
    }));
    clearError(name);
    if (name === "track") {
      clearError("teamName");
      clearError("leadName");
    }
    if (name === "role") clearError("skills");
  }
  function toggle(name: string, value: string) {
    const current = Array.isArray(values[name])
      ? (values[name] as string[])
      : [];
    update(
      name,
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    );
  }
  if (receipt)
    return (
      <div className="application-form form-success" role="status">
        <CheckCircle2 size={42} weight="regular" aria-hidden="true" />
        <h2>
          {kind === "messages" ? t("form.receipt.message") : t("form.receipt.application")}
        </h2>
        <p>
          {t("form.receipt.saved")}
        </p>
        {kind === "registrations" && (
          <p>
            {t("form.receipt.globalFirst")}{" "}
            <a className="text-link" href={site.globalUrl}>
              {t("register.note.link")}{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            .
          </p>
        )}
        <span className="technical-label">{t("form.reference")} / {receipt}</span>
        <button
          className="outline-button"
          onClick={() => {
            reset();
            setValues({ ...initialValues[kind] });
          }}
        >
          <span className="button-label">{t("form.sendAnother")}</span>
        </button>
      </div>
    );
  return (
    <form
      className="application-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      aria-busy={submitting}
    >
      <h2>{t(formTitles[kind])}</h2>
      <div className="form-grid">
        {kind === "registrations" && (
          <fieldset className="choice-group" disabled={submitting}>
            <legend id="track-label">{t("form.joining.label")}</legend>
            <RadioGroup.Root
              className="choice-options"
              name="track"
              aria-labelledby="track-label"
              value={String(values.track)}
              onValueChange={(value) => update("track", value)}
              disabled={submitting}
            >
              {[
                ["team", t("form.joining.team")],
                ["solo", t("form.joining.solo")],
              ].map(([value, label]) => (
                <label key={value}>
                  <RadioGroup.Item
                    className="custom-radio"
                    id={value === "team" ? "field-track" : undefined}
                    value={value}
                  >
                    <RadioGroup.Indicator className="custom-radio-dot" />
                  </RadioGroup.Item>
                  {label}
                </label>
              ))}
            </RadioGroup.Root>
          </fieldset>
        )}
        {kind === "volunteers" && (
          <fieldset className="choice-group" disabled={submitting}>
            <legend id="role-label">{t("form.role.label")}</legend>
            <RadioGroup.Root
              className="choice-options"
              name="role"
              aria-labelledby="role-label"
              value={String(values.role)}
              onValueChange={(value) => update("role", value)}
              disabled={submitting}
            >
              {["volunteer", "mentor"].map((role) => (
                <label key={role}>
                  <RadioGroup.Item
                    className="custom-radio"
                    id={role === "volunteer" ? "field-role" : undefined}
                    value={role}
                  >
                    <RadioGroup.Indicator className="custom-radio-dot" />
                  </RadioGroup.Item>
                  {role === "volunteer"
                    ? t("form.role.volunteer")
                    : t("form.role.mentor")}
                </label>
              ))}
            </RadioGroup.Root>
          </fieldset>
        )}
        {fieldsFor(kind, values).map((field) => {
          const props = {
            id: `field-${field.name}`,
            name: field.name,
            value: String(values[field.name] ?? ""),
            required: field.required,
            disabled: submitting,
            "aria-invalid": !!errors[field.name],
            "aria-describedby": errors[field.name]
              ? `error-${field.name}`
              : undefined,
            onChange: (
              e: React.ChangeEvent<
                HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
              >,
            ) => update(field.name, e.target.value),
          };
          return (
            <div
              className={`field${field.wide ? " wide" : ""}`}
              key={field.name}
            >
              <label htmlFor={props.id}>
                {localize(field.label)}
                {field.required
                  ? " *"
                  : field.type !== "select"
                    ? ` (${t("form.optional")})`
                    : ""}
              </label>
              {field.type === "select" ? (
                <FormSelect id={props.id} name={field.name} value={props.value}
                  options={field.options ?? []} required={field.required} disabled={submitting}
                  invalid={props["aria-invalid"]} describedBy={props["aria-describedby"]}
                  placeholder={t("form.select.placeholder")} emptyLabel={t("form.select.empty")}
                  getOptionLabel={localize}
                  onValueChange={(value) => update(field.name, value)} />
              ) : field.type === "textarea" ? (
                <textarea {...props} maxLength={field.max} rows={5} />
              ) : (
                <input
                  {...props}
                  type={field.type || "text"}
                  maxLength={field.max}
                  autoComplete={field.autoComplete}
                />
              )}
              {errors[field.name] && (
                <span id={`error-${field.name}`} className="field-error">
                  {errors[field.name]}
                </span>
              )}
            </div>
          );
        })}
        {kind === "volunteers" &&
          (
            [
              [
                "skills",
                t("form.skills.label"),
                values.role === "mentor" ? mentorSkills : volunteerSkills,
              ],
              [
                "availability",
                t("form.availability.label"),
                availabilityOptions,
              ],
            ] as const
          ).map(([name, label, options]) => (
            <fieldset
              className="choice-group"
              key={name}
              disabled={submitting}
              aria-describedby={errors[name] ? `error-${name}` : undefined}
            >
              <legend>{label} *</legend>
              <div className="choice-options">
                {options.map((option, index) => (
                  <label key={option}>
                    <Checkbox.Root className="custom-checkbox" disabled={submitting}
                      id={index === 0 ? `field-${name}` : undefined}
                      checked={
                        Array.isArray(values[name]) &&
                        (values[name] as string[]).includes(option)
                      }
                      onCheckedChange={() => toggle(name, option)}
                    ><Checkbox.Indicator><CheckIcon size={13} weight="bold" aria-hidden="true" /></Checkbox.Indicator></Checkbox.Root>
                    {option}
                  </label>
                ))}
              </div>
              {errors[name] && (
                <span id={`error-${name}`} className="field-error">
                  {errors[name]}
                </span>
              )}
            </fieldset>
          ))}
      </div>
      {(kind === "registrations" || kind === "ambassadors") && (
        <>
          <label className="consent">
            <Checkbox.Root className="custom-checkbox"
              id="field-agreed"
              checked={values.agreed === true}
              disabled={submitting}
              onCheckedChange={(checked) => update("agreed", checked === true)}
              aria-invalid={!!errors.agreed}
              aria-describedby={errors.agreed ? "error-agreed" : undefined}
            ><Checkbox.Indicator><CheckIcon size={13} weight="bold" aria-hidden="true" /></Checkbox.Indicator></Checkbox.Root>
            <span>
              {kind === "registrations" ? (
                <>
                  {t("form.consent.termsFirst")}{" "}
                  <a
                    href={site.participantTerms}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("form.consent.termsLink")}
                  </a>
                  .
                </>
              ) : (
                <>
                  {t("form.consent.ambassador")}
                </>
              )}
            </span>
          </label>
          {errors.agreed && (
            <p id="error-agreed" className="field-error">
              {errors.agreed}
            </p>
          )}
        </>
      )}
      <div className="form-trap" aria-hidden="true">
        <label>
          {t("form.trap")}
          <input
            name="website"
            value={trap}
            onChange={(e) => setTrap(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
      <p className="form-privacy">
        {t("form.privacy.first")}{" "}
        {t("form.privacy.read")} <Link href="/privacy">{t("form.privacy.link")}</Link>.
      </p>
      {formError && (
        <p className="form-feedback" role="alert">
          {formError}
        </p>
      )}
      <button type="submit" className="white-button" disabled={submitting}>
        <span className="button-label">{submitting
          ? t("form.sending")
          : kind === "messages"
            ? t("form.submit.message")
            : t("form.submit.application")}</span>
        {submitting ? (
          <LoaderCircle className="spin" size={17} aria-hidden="true" />
        ) : (
          <ArrowUpRight size={17} aria-hidden="true" />
        )}
      </button>
    </form>
  );
}
