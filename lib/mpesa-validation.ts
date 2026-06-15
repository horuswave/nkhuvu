export const MSISDN_PATTERN = /^258[89]\d{8}$/;
export const REFERENCE_PATTERN = /^[A-Za-z0-9]{1,20}$/;

export function normalizeMsisdn(phone: string): string {
  let msisdn = phone.replace(/\D/g, "");
  if (msisdn.startsWith("0")) {
    msisdn = `258${msisdn.slice(1)}`;
  } else if (!msisdn.startsWith("258")) {
    msisdn = `258${msisdn}`;
  }
  return msisdn;
}

export function isValidMsisdn(phone: string): boolean {
  return MSISDN_PATTERN.test(normalizeMsisdn(phone));
}

export function isValidReference(reference: string): boolean {
  return REFERENCE_PATTERN.test(reference);
}

export function getMsisdnValidationMessage(phone: string): string | null {
  if (!phone.trim()) {
    return "Phone number is required.";
  }
  if (!isValidMsisdn(phone)) {
    return "Enter a valid M-Pesa number, e.g. 258841234567 or 841234567.";
  }
  return null;
}

export interface C2BValidationError {
  field: string;
  message: string;
}

export function validateC2BRequest(
  request: {
    customerMsisdn: string;
    amount: number;
    transactionReference: string;
    thirdPartyReference: string;
  },
  serviceProviderCode: string,
): C2BValidationError[] {
  const errors: C2BValidationError[] = [];
  const msisdn = normalizeMsisdn(request.customerMsisdn);

  if (!isValidReference(request.transactionReference)) {
    errors.push({
      field: "transactionReference",
      message:
        "Transaction reference must be 1-20 alphanumeric characters (no spaces or symbols).",
    });
  }

  if (!isValidReference(request.thirdPartyReference)) {
    errors.push({
      field: "thirdPartyReference",
      message:
        "Third party reference must be 1-20 alphanumeric characters (no spaces or symbols).",
    });
  }

  if (!isValidMsisdn(msisdn)) {
    errors.push({
      field: "customerMsisdn",
      message:
        "Phone number must be a valid M-Pesa number in format 25884XXXXXXX or 25887XXXXXXX.",
    });
  }

  if (!Number.isFinite(request.amount) || request.amount <= 0) {
    errors.push({
      field: "amount",
      message: "Amount must be a positive number.",
    });
  }

  if (!/^\d{6}$/.test(serviceProviderCode)) {
    errors.push({
      field: "serviceProviderCode",
      message: "Service provider code must be 6 digits.",
    });
  }

  return errors;
}
