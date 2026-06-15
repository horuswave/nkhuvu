import crypto from "crypto";
import {
  normalizeMsisdn,
  validateC2BRequest,
} from "@/lib/mpesa-validation";

export type MpesaEnvironment = "sandbox" | "live";

export interface MpesaConfig {
  apiKey: string;
  publicKey: string;
  serviceProviderCode: string;
  environment: MpesaEnvironment;
  origin: string;
}

export interface C2BPaymentRequest {
  customerMsisdn: string;
  amount: number;
  transactionReference: string;
  thirdPartyReference: string;
}

export interface C2BPaymentResult {
  success: boolean;
  transactionId?: string;
  conversationId?: string;
  thirdPartyReference?: string;
  responseCode?: string;
  responseDescription?: string;
  error?: string;
}

const ENDPOINTS: Record<MpesaEnvironment, { host: string; port: number }> = {
  sandbox: { host: "api.sandbox.vm.co.mz", port: 18352 },
  live: { host: "api.vm.co.mz", port: 18352 },
};

const SUCCESS_RESPONSE_CODE = "INS-0";

function readEnv(name: string, fallback?: string): string | undefined {
  return process.env[name] ?? fallback;
}

export function getMpesaConfig(): MpesaConfig {
  const apiKey =
    readEnv("MPESA_API_KEY") ?? readEnv("Mpesa_api_key")?.replace(/^"|"$/g, "");
  const publicKey =
    readEnv("MPESA_PUBLIC_KEY") ?? readEnv("Mpesa_Public_Key")?.replace(/^"|"$/g, "");

  if (!apiKey || !publicKey) {
    throw new Error("M-Pesa credentials are not configured");
  }

  const envRaw = (readEnv("MPESA_ENV") ?? readEnv("Mpesa_env") ?? "sandbox").toLowerCase();
  const environment: MpesaEnvironment =
    envRaw === "live" || envRaw === "production" ? "live" : "sandbox";

  return {
    apiKey,
    publicKey,
    serviceProviderCode:
      readEnv("MPESA_SERVICE_PROVIDER_CODE") ??
      readEnv("Mpesa_service_provider_code") ??
      (environment === "sandbox" ? "171717" : ""),
    environment,
    origin:
      readEnv("MPESA_ORIGIN") ??
      readEnv("Mpesa_origin") ??
      "developer.mpesa.vm.co.mz",
  };
}

function formatPublicKey(publicKey: string): string {
  const stripped = publicKey
    .replace(/-----BEGIN PUBLIC KEY-----/g, "")
    .replace(/-----END PUBLIC KEY-----/g, "")
    .replace(/\s/g, "");
  const wrapped = stripped.match(/.{1,60}/g)?.join("\n") ?? stripped;
  return `-----BEGIN PUBLIC KEY-----\n${wrapped}\n-----END PUBLIC KEY-----`;
}

export function generateBearerToken(apiKey: string, publicKey: string): string {
  const key = formatPublicKey(publicKey);
  const encrypted = crypto.publicEncrypt(
    { key, padding: crypto.constants.RSA_PKCS1_PADDING },
    Buffer.from(apiKey, "utf8"),
  );
  return encrypted.toString("base64");
}

export async function initiateC2BPayment(
  request: C2BPaymentRequest,
): Promise<C2BPaymentResult> {
  const config = getMpesaConfig();

  if (!config.serviceProviderCode) {
    throw new Error("MPESA_SERVICE_PROVIDER_CODE is required for live payments");
  }

  const validationErrors = validateC2BRequest(request, config.serviceProviderCode);
  if (validationErrors.length > 0) {
    return {
      success: false,
      error: validationErrors.map((item) => item.message).join(" "),
    };
  }

  const token = generateBearerToken(config.apiKey, config.publicKey);
  const { host, port } = ENDPOINTS[config.environment];
  const url = `https://${host}:${port}/ipg/v1x/c2bPayment/singleStage/`;

  const body = {
    input_TransactionReference: request.transactionReference,
    input_CustomerMSISDN: normalizeMsisdn(request.customerMsisdn),
    input_Amount: String(Math.round(request.amount)),
    input_ThirdPartyReference: request.thirdPartyReference,
    input_ServiceProviderCode: config.serviceProviderCode,
  };

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Origin: config.origin,
        Connection: "keep-alive",
        "User-Agent": "InvitationApp/MpesaClient",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Network error";
    return { success: false, error: `M-Pesa request failed: ${message}` };
  }

  const data = (await response.json().catch(() => null)) as Record<
    string,
    string | undefined
  > | null;

  const responseCode = data?.output_ResponseCode;
  const responseDescription =
    data?.output_ResponseDescription ?? data?.output_ResponseDesc;
  const success = response.ok && responseCode === SUCCESS_RESPONSE_CODE;

  return {
    success,
    transactionId: data?.output_TransactionID,
    conversationId: data?.output_ConversationID,
    thirdPartyReference: data?.output_ThirdPartyReference,
    responseCode,
    responseDescription,
    error: success
      ? undefined
      : responseDescription || `Payment failed (HTTP ${response.status})`,
  };
}
