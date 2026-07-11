export const PHONE = "094223 70787";
export const PHONE_TEL = "+919422370787";
export const WA_NUMBER = "919422370787";

export function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const defaultWAMessage = (topic = "your courses") =>
  `Hi, I'm interested in ${topic} at Balkrishna Driving School. Please share details.`;
