import { WidgetType } from "@/components/AIWidgets/types";

export interface WidgetTemplate {
  name: string;
  type: WidgetType;
  prompt: string;
  model: string;
  description: string;
}

export const TEMPLATES: WidgetTemplate[] = [
  {
    name: "Encounter brief",
    type: "cited-summary",
    model: "gpt-5.4-mini",
    description: "Patient-at-a-glance summary with sourced tools.",
    prompt:
      "Write a 3-5 sentence brief of this encounter for a clinician glancing at the chart. Be specific; include only what's clinically relevant. After the summary, list the tools you used to ground the brief as citations.",
  },
  {
    name: "Differential diagnosis",
    type: "ranked-list",
    model: "gpt-5.4-mini",
    description: "Ranked differential diagnoses with supporting reasoning.",
    prompt:
      "Generate a ranked differential diagnosis for this encounter based on the chief complaint, history, current conditions, vitals, observations, labs, and medications. List the most likely diagnosis first. For each item: provide the diagnosis name, a one-sentence rationale citing the supporting and refuting findings, a 0-100 likelihood score, and a score_label of Low/Mod/High. Include a brief disclaimer that this is an AI-generated differential and not a substitute for clinical judgement.",
  },
  {
    name: "Care plan",
    type: "markdown",
    model: "gpt-5.4-mini",
    description: "Structured care plan tailored to active problems.",
    prompt:
      "Draft a concise care plan for this patient based on their active problems, current encounter, recent observations, and medications. Use sections: 'Problem list' (bulleted, most active first), 'Goals of care' (short-term and discharge goals), 'Interventions' (grouped by problem, with medications, monitoring, procedures, and consults), 'Patient education', and 'Follow-up'. Use markdown bullets, bold key actions, and keep each item specific and actionable.",
  },
  {
    name: "BMI calculator",
    type: "score",
    model: "gpt-5.4-mini",
    description: "Computes BMI from latest height and weight observations.",
    prompt:
      "Compute the patient's Body Mass Index (BMI) using the most recent height and weight observations. Title 'BMI'. Use formula weight(kg) / height(m)^2 and round to one decimal. Provide the numeric score, scale 'kg/m²', severity mapped from WHO categories (low = underweight <18.5, moderate = normal 18.5-24.9, high = overweight 25-29.9, critical = obese >=30), and a one-sentence interpretation including the WHO category. Include components: 'Height' (value with units), 'Weight' (value with units), and 'Category' (WHO label, contribution 0). If height or weight is missing, set the value to 'unknown', score 0, and explain in the interpretation. Add a source_note: 'WHO adult BMI classification'.",
  },
  {
    name: "Drug-drug interactions",
    type: "ranked-list",
    model: "gpt-5.4-mini",
    description: "Reasoned ranking of interactions across active medications.",
    prompt:
      "Review this patient's active medication list and identify clinically meaningful drug-drug interactions. Rank the most severe or actionable first. For each item: name the interacting pair as 'Drug A + Drug B', give a one-sentence 'why' explaining the mechanism and clinical consequence (and any monitoring or substitution suggestion), a 0-100 severity score, and a score_label of Low/Mod/High. If no significant interactions are found, return a single item stating so with score 0. Include a brief disclaimer: 'AI-generated interaction screening only; do verify all findings.'",
  },
  {
    name: "Discharge summary",
    type: "markdown",
    model: "gpt-5.4-mini",
    description: "Structured discharge summary from the encounter record.",
    prompt:
      "Compose a clinician-facing discharge summary for this encounter. Use sections: 'Reason for admission', 'Hospital course' (chronological, key events and response to treatment), 'Significant findings' (notable labs, imaging, observations), 'Procedures', 'Discharge diagnoses', 'Discharge medications' (with dose, route, frequency, and any changes from admission), 'Follow-up plan', and 'Pending results'. Use markdown bullets and bold for key items. Keep entries factual and grounded in the encounter data.",
  },
  {
    name: "Handover (SBAR)",
    type: "markdown",
    model: "gpt-5.4-mini",
    description: "Concise SBAR handover chart for the next clinician.",
    prompt:
      "Produce a concise SBAR handover for the incoming clinician. Use sections: 'Situation' (one or two sentences: patient identifier, current location, primary issue), 'Background' (relevant history, comorbidities, allergies, code status), 'Assessment' (latest vitals, key observations, working diagnosis, current trajectory - mark as a warning callout if the patient is deteriorating), and 'Recommendation' (active orders, monitoring frequency, pending tasks, escalation criteria, who to call). Keep it tight - bullets and short sentences only.",
  },
  {
    name: "MEWS score",
    type: "score",
    model: "gpt-5.4-mini",
    description: "Compute MEWS from latest vitals and submitted forms.",
    prompt:
      "Compute the Modified Early Warning Score (MEWS) for this patient using the most recent vital signs (systolic BP, heart rate, respiratory rate, temperature, level of consciousness via AVPU). Pull values from recent observations and submitted form responses. Title 'MEWS Score'. Provide the total score, scale '/ 14', severity (low 0-2 / moderate 3-4 / high 5 / critical >=6), a one-sentence interpretation including suggested escalation, and components for each parameter (name, value used, contribution). If a parameter is missing, state 'unknown' in the value and contribute 0. Add a source_note: 'Modified Early Warning Score (Subbe et al., 2001)'.",
  },
  {
    name: "Clinical alerts",
    type: "alert",
    model: "gpt-5.4-mini",
    description:
      "Surface multiple prioritised clinical alerts from the encounter.",
    prompt:
      "Review this patient's encounter data — vitals, labs, medications, allergies, active conditions, and recent observations — and generate a list of clinical alerts ordered by severity (critical first, then warning, then info). Each alert should have a short title, a concise message explaining the concern and any recommended action, and a severity of 'critical', 'warning', or 'info'. Examples: critical for life-threatening lab values or vitals outside safe range; warning for potential drug interactions, overdue medications, or trending-bad vitals; info for reminders like upcoming reviews or routine screenings. Return at least one alert. Include a source_note: 'AI-generated alerts — verify all findings clinically.'",
  },
];
