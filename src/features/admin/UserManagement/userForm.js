export const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;

export const EMPTY_USER_FORM = {
  firstName: "",
  lastName: "",
  dob: null,
  gender: "",
  country: "",
  email: "",
  password: "",
  products: [],
  festgeld: { bank: "", betrag: "", zinsen: "", laufzeit: "" },
  tagesgeld: {
    bank: "",
    betrag: "",
    zinsen: "",
    garantierteZinslaufzeit: "",
  },
  openAI: {
    anzahl: "",
    gekaufterWert: "",
    aktuellerWert: "",
    investition: "",
    aktuellerGewinn: "",
    depotWert: "",
  },
};

const isBlank = (value) => value === "" || value === null || value === undefined;

const validateNumber = (value, label, allowNegative = false) => {
  if (isBlank(value)) return `${label} ist erforderlich`;
  const number = Number(value);
  if (!Number.isFinite(number) || (!allowNegative && number < 0)) {
    return `${label} muss eine ${allowNegative ? "gültige" : "nicht-negative"} Zahl sein`;
  }
  return null;
};

export const validateUserForm = (values, { includeCredentials = false } = {}) => {
  const errors = {};
  if (!values.firstName?.trim()) errors.firstName = "Vorname ist erforderlich";
  if (!values.lastName?.trim()) errors.lastName = "Nachname ist erforderlich";
  if (!values.dob) errors.dob = "Geburtsdatum ist erforderlich";
  else if (new Date(values.dob) > new Date()) errors.dob = "Geburtsdatum darf nicht in der Zukunft liegen";
  if (!values.gender) errors.gender = "Geschlecht ist erforderlich";
  if (!values.country) errors.country = "Land ist erforderlich";
  if (!values.products?.length) errors.products = "Mindestens ein Produkt ist erforderlich";

  if (includeCredentials) {
    if (!/^\S+@\S+\.\S+$/.test(values.email || "")) errors.email = "Gültige E-Mail-Adresse ist erforderlich";
    if (!PASSWORD_PATTERN.test(values.password || "")) {
      errors.password = "Mindestens 8 Zeichen mit Großbuchstabe, Zahl und !@#$%^&*";
    }
  }

  if (values.products?.includes("festgeld")) {
    if (!values.festgeld.bank?.trim()) errors["festgeld.bank"] = "Bank ist erforderlich";
    errors["festgeld.betrag"] = validateNumber(values.festgeld.betrag, "Betrag");
    errors["festgeld.zinsen"] = validateNumber(values.festgeld.zinsen, "Zinsen");
    if (!values.festgeld.laufzeit?.trim()) errors["festgeld.laufzeit"] = "Laufzeit (Monate) ist erforderlich";
  }
  if (values.products?.includes("tagesgeld")) {
    if (!values.tagesgeld.bank?.trim()) errors["tagesgeld.bank"] = "Bank ist erforderlich";
    errors["tagesgeld.betrag"] = validateNumber(values.tagesgeld.betrag, "Betrag");
    errors["tagesgeld.zinsen"] = validateNumber(values.tagesgeld.zinsen, "Zinsen");
    if (!values.tagesgeld.garantierteZinslaufzeit?.trim()) {
      errors["tagesgeld.garantierteZinslaufzeit"] = "Garantierte Zinslaufzeit ist erforderlich";
    }
  }
  if (values.products?.includes("openAI")) {
    ["anzahl", "gekaufterWert", "aktuellerWert", "investition", "depotWert"].forEach((field) => {
      errors[`openAI.${field}`] = validateNumber(values.openAI[field], field);
    });
    errors["openAI.aktuellerGewinn"] = validateNumber(values.openAI.aktuellerGewinn, "aktueller Gewinn", true);
  }

  return Object.fromEntries(Object.entries(errors).filter(([, value]) => value));
};

const numberOrZero = (value) => isBlank(value) ? 0 : Number(value);

export const toUserPayload = (values, { includeCredentials = false } = {}) => ({
  firstName: values.firstName.trim(),
  lastName: values.lastName.trim(),
  dob: new Date(values.dob).toISOString(),
  gender: values.gender,
  country: values.country,
  products: values.products,
  ...(includeCredentials ? {
    email: values.email.trim().toLowerCase(),
    password: values.password,
  } : {}),
  festgeld: {
    bank: values.festgeld.bank.trim(),
    betrag: numberOrZero(values.festgeld.betrag),
    zinsen: numberOrZero(values.festgeld.zinsen),
    laufzeit: values.festgeld.laufzeit.trim(),
  },
  tagesgeld: {
    bank: values.tagesgeld.bank.trim(),
    betrag: numberOrZero(values.tagesgeld.betrag),
    zinsen: numberOrZero(values.tagesgeld.zinsen),
    garantierteZinslaufzeit: values.tagesgeld.garantierteZinslaufzeit.trim(),
  },
  openAI: {
    anzahl: numberOrZero(values.openAI.anzahl),
    gekaufterWert: numberOrZero(values.openAI.gekaufterWert),
    aktuellerWert: numberOrZero(values.openAI.aktuellerWert),
    investition: numberOrZero(values.openAI.investition),
    aktuellerGewinn: numberOrZero(values.openAI.aktuellerGewinn),
    depotWert: numberOrZero(values.openAI.depotWert),
  },
});

export const userToFormValues = (user) => ({
  ...structuredClone(EMPTY_USER_FORM),
  firstName: user.firstName || "",
  lastName: user.lastName || "",
  dob: user.dob ? new Date(user.dob) : null,
  gender: user.gender || "",
  country: user.country || "",
  email: user.email || "",
  products: user.products || [],
  festgeld: { ...EMPTY_USER_FORM.festgeld, ...user.festgeld },
  tagesgeld: { ...EMPTY_USER_FORM.tagesgeld, ...user.tagesgeld },
  openAI: { ...EMPTY_USER_FORM.openAI, ...user.openAI },
});
