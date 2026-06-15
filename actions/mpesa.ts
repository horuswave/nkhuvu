"use server";

import { randomBytes } from "crypto";
import { initiateC2BPayment } from "@/lib/mpesa";

export async function processMpesaCheckoutPayment(data: {
  phone: string;
  amount: number;
  packageName: string;
  email: string;
}) {
  const refSuffix = randomBytes(4).toString("hex").toUpperCase();
  const transactionReference = `T${refSuffix}`;
  const thirdPartyReference = `R${refSuffix}${Date.now().toString(36).toUpperCase().slice(-8)}`.slice(
    0,
    20,
  );

  const result = await initiateC2BPayment({
    customerMsisdn: data.phone,
    amount: data.amount,
    transactionReference,
    thirdPartyReference,
  });

  if (!result.success) {
    return {
      success: false as const,
      error:
        result.error ||
        result.responseDescription ||
        "M-Pesa payment was not completed",
    };
  }

  return {
    success: true as const,
    transactionId:
      result.transactionId ||
      result.conversationId ||
      thirdPartyReference,
  };
}
