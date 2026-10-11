import {
  availabilityOptions,
  mentorSkills,
  volunteerSkills,
  provinces,
  focusAreas,
} from "../content/site";
import { isEmail, isPhone, type Errors } from "./validation";
import type { FormKind } from "./submissions";
export type FormValues = Record<string, string | boolean | string[]>;
export type Field = {
  name: string;
  label: string;
  type?: "email" | "tel" | "textarea" | "select";
  required?: boolean;
  max?: number;
  options?: string[];
  wide?: boolean;
  autoComplete?: string;
};
const person: Field[] = [
  {
    name: "fullName",
    label: "Full name",
    required: true,
    max: 120,
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email address",
    required: true,
    type: "email",
    max: 200,
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Phone number",
    type: "tel",
    max: 30,
    autoComplete: "tel",
  },
];
export const initialValues: Record<FormKind, FormValues> = {
  registrations: {
    track: "team",
    memberCount: "2",
    challengePref: "Not sure yet",
    agreed: false,
  },
  volunteers: { role: "volunteer", skills: [], availability: [] },
  ambassadors: { province: "", agreed: false },
  messages: { subject: "General inquiry" },
};
export function fieldsFor(kind: FormKind, values: FormValues): Field[] {
  if (kind === "registrations")
    return [
      ...(values.track === "team"
        ? [
            { name: "teamName", label: "Team name", required: true, max: 120 },
            {
              name: "memberCount",
              label: "Team size",
              type: "select" as const,
              options: ["2", "3", "4", "5", "6"],
            },
          ]
        : []),
      {
        name: "leadName",
        label: values.track === "team" ? "Team lead name" : "Full name",
        required: true,
        max: 120,
        autoComplete: "name",
      },
      {
        name: "leadEmail",
        label: "Email address",
        required: true,
        type: "email",
        max: 200,
        autoComplete: "email",
      },
      {
        name: "leadPhone",
        label: "Phone number",
        type: "tel",
        max: 30,
        autoComplete: "tel",
      },
      {
        name: "institution",
        label: "School, university, or organisation",
        max: 200,
      },
      {
        name: "challengePref",
        label: "Area of interest",
        type: "select",
        options: ["Not sure yet", ...focusAreas.map((a) => a.title)],
        wide: true,
      },
    ];
  if (kind === "volunteers")
    return [
      ...person,
      { name: "affiliation", label: "Organisation or university", max: 200 },
    ];
  if (kind === "ambassadors")
    return [
      ...person,
      {
        name: "institution",
        label: "School or university",
        required: true,
        max: 200,
      },
      {
        name: "province",
        label: "Province",
        type: "select",
        options: ["", ...provinces],
      },
      { name: "academicYear", label: "Academic year", max: 80 },
      {
        name: "motivation",
        label: "Why would you like to be an ambassador?",
        type: "textarea",
        required: true,
        max: 1000,
        wide: true,
      },
    ];
  return [
    {
      name: "name",
      label: "Your name",
      required: true,
      max: 120,
      autoComplete: "name",
    },
    {
      name: "email",
      label: "Email address",
      required: true,
      type: "email",
      max: 200,
      autoComplete: "email",
    },
    {
      name: "subject",
      label: "Subject",
      type: "select",
      options: [
        "General inquiry",
        "Sponsorship & partners",
        "Media & press",
        "Team question",
      ],
      wide: true,
    },
    {
      name: "message",
      label: "Your message",
      type: "textarea",
      required: true,
      max: 2000,
      wide: true,
    },
  ];
}
export const textValue = (values: FormValues, name: string) =>
  typeof values[name] === "string" ? (values[name] as string).trim() : "";
export function validateForm(
  kind: FormKind,
  values: FormValues,
): Errors<string> {
  const errors: Errors<string> = {};
  for (const field of fieldsFor(kind, values)) {
    const value = textValue(values, field.name);
    if (field.required && !value)
      errors[field.name] = `${field.label} is required.`;
    else if (field.max && value.length > field.max)
      errors[field.name] = `Use ${field.max} characters or fewer.`;
    else if (field.type === "email" && value && !isEmail(value))
      errors[field.name] = "Enter a valid email address.";
    else if (field.type === "tel" && value && !isPhone(value))
      errors[field.name] = "Use a Sri Lankan number, e.g. 071 234 5678.";
    else if (field.options && !field.options.includes(value))
      errors[field.name] = "Choose an option from the list.";
  }
  if (
    kind === "registrations" &&
    !["team", "solo"].includes(textValue(values, "track"))
  )
    errors.track = "Choose team or solo.";
  if (kind === "registrations" || kind === "ambassadors") {
    if (values.agreed !== true)
      errors.agreed = "Please read and accept the agreement.";
  }
  if (kind === "volunteers") {
    if (!["volunteer", "mentor"].includes(textValue(values, "role")))
      errors.role = "Choose a role.";
    const allowed = values.role === "mentor" ? mentorSkills : volunteerSkills;
    for (const [key, options] of [
      ["skills", allowed],
      ["availability", availabilityOptions],
    ] as const) {
      const selected = values[key];
      if (
        !Array.isArray(selected) ||
        selected.length === 0 ||
        selected.some((v) => !options.includes(v))
      )
        errors[key] =
          `Choose at least one ${key === "skills" ? "skill" : "availability option"}.`;
    }
  }
  return errors;
}
export function buildPayload(
  kind: FormKind,
  values: FormValues,
): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const field of fieldsFor(kind, values)) {
    const value = textValue(values, field.name);
    payload[field.name] =
      field.type === "email" ? value.toLowerCase() : value || null;
  }
  if (kind === "registrations")
    Object.assign(payload, {
      track: values.track,
      memberCount: values.track === "team" ? Number(values.memberCount) : 1,
      teamName: values.track === "team" ? textValue(values, "teamName") : null,
      agreedToCodeOfConduct: values.agreed === true,
    });
  if (kind === "volunteers")
    Object.assign(payload, {
      role: values.role,
      skills: values.skills,
      availability: values.availability,
    });
  if (kind === "ambassadors")
    payload.agreedToCommitment = values.agreed === true;
  return payload;
}
