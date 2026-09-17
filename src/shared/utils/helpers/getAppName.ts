import { AppConnect } from "../../../domain/enums/enum";

export const getAppDisplayName = (app: AppConnect): string => {
  switch (app) {
    case AppConnect.GOOGLE:
      return "Google";
    case AppConnect.STRIPE:
      return "Stripe";
    case AppConnect.NOTION:
      return "Notion";
    case AppConnect.WHATSAPP:
      return "WhatsApp";
    case AppConnect.RAZORPAY:
      return "Razorpay";
    case AppConnect.PAYPAL:
      return "PayPal";
    default:
      return app;
  }
};