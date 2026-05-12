import type { Bill } from "@/src/types/shop";
import { formatCurrency } from "@/src/utils/formatters";

export function formatBillQuantity(quantity: number, unit = "pcs") {
  const cleanQuantity = Number.isInteger(quantity) ? `${quantity}` : `${Number(quantity.toFixed(2))}`;
  return unit === "custom" ? cleanQuantity : `${cleanQuantity} ${unit}`;
}

export function buildBillMessage(bill: Bill) {
  const lines = bill.items
    .map((item) => `${item.name} x ${formatBillQuantity(item.quantity, item.unit)} = ${formatCurrency(item.price * item.quantity)}`)
    .join("\n");

  return `Lucky Electrical\n${bill.id}\nCustomer: ${bill.customerName}\nDate: ${bill.createdAt}\n\n${lines}\n\nTotal: ${formatCurrency(bill.total)}\nThank you for shopping with Lucky Electrical.`;
}
