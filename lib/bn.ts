const BN = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toBn = (n: number | string): string => {
  if (n === null || n === undefined) return "০";
  const s = String(n);
  return s.replace(/[0-9]/g, (d) => BN[+d]);
};

export const formatBnNumber = (n: number, fractionDigits = 0): string => {
  if (n === null || n === undefined || isNaN(n) || !isFinite(n)) return "০";
  const formatted = n.toLocaleString("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
  return toBn(formatted);
};

export const formatPrice = (n: number): string => {
  if (n === null || n === undefined || isNaN(n) || !isFinite(n))
    return "দাম নেই";
  return formatBnNumber(n) + " টাকা";
};

export const formatChange = (n: number | undefined): string => {
  if (n === null || n === undefined || isNaN(n) || !isFinite(n))
    return "— ০.০%";
  if (n === 0) return "— ০.০%";
  const abs = Math.abs(n);
  const sign = n > 0 ? "▲" : "▼";
  return sign + " " + formatBnNumber(abs, 1) + "%";
};

export const changeColor = (n: number | undefined): string => {
  if (n === null || n === undefined || isNaN(n) || !isFinite(n))
    return "text-gray-500";
  if (n > 0) return "text-green-600";
  if (n < 0) return "text-red-600";
  return "text-gray-500";
};