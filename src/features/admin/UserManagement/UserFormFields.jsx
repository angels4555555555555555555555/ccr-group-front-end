import { Checkbox, NumberInput, PasswordInput, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import COUNTRIES from "./CountryList";

const Section = ({ title, children }) => (
  <fieldset className="col-span-full grid gap-4 border border-[#E2E8F0] p-4 md:grid-cols-2">
    <legend className="px-2 font-semibold">{title}</legend>
    {children}
  </fieldset>
);

export default function UserFormFields({ form, includeCredentials = false }) {
  const products = form.values.products || [];

  return (
    <>
      <TextInput label="Vorname" withAsterisk {...form.getInputProps("firstName")} />
      <TextInput label="Nachname" withAsterisk {...form.getInputProps("lastName")} />
      <DateInput label="Geburtsdatum" withAsterisk valueFormat="DD.MM.YYYY" maxDate={new Date()} {...form.getInputProps("dob")} />
      <Select label="Geschlecht" withAsterisk data={["Männlich", "Weiblich", "Divers"]} {...form.getInputProps("gender")} />
      <Select label="Land" withAsterisk searchable data={COUNTRIES} {...form.getInputProps("country")} />
      <TextInput label="E-Mail" withAsterisk disabled={!includeCredentials} {...form.getInputProps("email")} />
      {includeCredentials && (
        <PasswordInput label="Passwort" description="Mindestens 8 Zeichen, Großbuchstabe, Zahl und !@#$%^&*" withAsterisk {...form.getInputProps("password")} />
      )}

      <Checkbox.Group className="col-span-full" label="Produkte" withAsterisk {...form.getInputProps("products")}>
        <div className="mt-2 flex flex-wrap gap-5">
          <Checkbox value="festgeld" label="Festgeld" />
          <Checkbox value="tagesgeld" label="Tagesgeld" />
          <Checkbox value="openAI" label="OpenAI" />
        </div>
      </Checkbox.Group>

      {products.includes("festgeld") && (
        <Section title="Festgeld">
          <TextInput label="Bank" withAsterisk {...form.getInputProps("festgeld.bank")} />
          <NumberInput label="Betrag (€)" min={0} hideControls withAsterisk {...form.getInputProps("festgeld.betrag")} />
          <NumberInput label="Zinsen (%)" min={0} hideControls withAsterisk {...form.getInputProps("festgeld.zinsen")} />
          <TextInput label="Laufzeit (Monate)" withAsterisk {...form.getInputProps("festgeld.laufzeit")} />
        </Section>
      )}
      {products.includes("tagesgeld") && (
        <Section title="Tagesgeld">
          <TextInput label="Bank" withAsterisk {...form.getInputProps("tagesgeld.bank")} />
          <NumberInput label="Betrag (€)" min={0} hideControls withAsterisk {...form.getInputProps("tagesgeld.betrag")} />
          <NumberInput label="Zinsen (%)" min={0} hideControls withAsterisk {...form.getInputProps("tagesgeld.zinsen")} />
          <TextInput label="Garantierte Zinslaufzeit" withAsterisk {...form.getInputProps("tagesgeld.garantierteZinslaufzeit")} />
        </Section>
      )}
      {products.includes("openAI") && (
        <Section title="OpenAI-Investment">
          <NumberInput label="Anzahl" min={0} hideControls withAsterisk {...form.getInputProps("openAI.anzahl")} />
          <NumberInput label="Gekaufter Wert (€)" min={0} hideControls withAsterisk {...form.getInputProps("openAI.gekaufterWert")} />
          <NumberInput label="Aktueller Wert (€)" min={0} hideControls withAsterisk {...form.getInputProps("openAI.aktuellerWert")} />
          <NumberInput label="Investition (€)" min={0} hideControls withAsterisk {...form.getInputProps("openAI.investition")} />
          <NumberInput label="Aktueller Gewinn (€)" hideControls withAsterisk {...form.getInputProps("openAI.aktuellerGewinn")} />
          <NumberInput label="Depotwert (€)" min={0} hideControls withAsterisk {...form.getInputProps("openAI.depotWert")} />
        </Section>
      )}
    </>
  );
}
