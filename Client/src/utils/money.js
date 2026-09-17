// Client / src / utils / money.js

/* -------- Format Amount as Currency -------- */
export const formatMoney = (amount = 0, currency, locale) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount / 100);
