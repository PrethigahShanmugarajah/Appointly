// Client / src / utils / dashboard.js

/* -------- Format Local Date Key -------- */
export const formatLocalDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/* -------- Parse Booking Date Value -------- */
export const parseBookingDateValue = (value) => {
  if (!value) return null;
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  const parsedDate = new Date(value);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

/* -------- Get Booking Date -------- */
export const getBookingDate = (booking, fallbackDate) =>
  parseBookingDateValue(booking.date || booking.createdAt) || fallbackDate;

/* -------- Build Gmail Share URL -------- */
export const buildGmailShareUrl = (publicLink) => {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    su: "Book a session with me",
    body: `Here is my booking link: ${publicLink}`,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
};

/* -------- Build Chart Path -------- */
export const buildPath = (points) =>
  points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

/* -------- Monthly Earnings Trend -------- */
export const getMonthlyEarningsTrend = (paidBookings) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const currentEarnings = paidBookings
    .filter((b) => {
      const d = getBookingDate(b, today);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, b) => sum + (b.providerPayoutAmount || b.amount || 0), 0);

  const prevEarnings = paidBookings
    .filter((b) => {
      const d = getBookingDate(b, today);
      return d.getMonth() === prevMonth && d.getFullYear() === prevYear;
    })
    .reduce((sum, b) => sum + (b.providerPayoutAmount || b.amount || 0), 0);

  if (prevEarnings === 0) return currentEarnings > 0 ? 100 : 0;

  return ((currentEarnings - prevEarnings) / prevEarnings) * 100;
};

/* -------- Earning Trend -------- */
export const getEarningTrend = (paidBookings, graphFilter) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getEarnings = (filteredBookings) => {
    return (
      filteredBookings.reduce(
        (sum, b) => sum + (b.providerPayoutAmount || b.amount || 0),
        0,
      ) / 100
    );
  };

  if (graphFilter === "daily") {
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const d = new Date(year, month, i + 1);
      const dateStr = formatLocalDateKey(d);

      return {
        label: dateStr,
        short: `${i + 1}`,
        value: getEarnings(
          paidBookings.filter((b) => {
            const bd = getBookingDate(b, today);

            return (
              bd.getFullYear() === year &&
              bd.getMonth() === month &&
              bd.getDate() === i + 1
            );
          }),
        ),
      };
    });
  } else if (graphFilter === "weekly") {
    const year = today.getFullYear();
    const month = today.getMonth();
    const weeks = [];
    let currentWeekStart = new Date(year, month, 1);
    let weekNum = 1;

    while (currentWeekStart.getMonth() === month) {
      const currentWeekEnd = new Date(currentWeekStart);
      currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);

      weeks.push({
        start: new Date(currentWeekStart),
        end: new Date(currentWeekEnd),
        weekNum: weekNum++,
      });

      currentWeekStart = new Date(currentWeekEnd);
    }

    return weeks.map((w) => {
      return {
        label: `Week ${w.weekNum}`,
        short: `W${w.weekNum}`,
        value: getEarnings(
          paidBookings.filter((b) => {
            const bd = getBookingDate(b, today);
            return bd >= w.start && bd < w.end;
          }),
        ),
      };
    });
  } else if (graphFilter === "monthly") {
    const year = today.getFullYear();

    return Array.from({ length: 12 }, (_, i) => {
      const d = new Date(year, i, 1);

      return {
        label: d.toLocaleDateString("en-US", { month: "long" }),
        short: d.toLocaleDateString("en-US", { month: "short" }),
        value: getEarnings(
          paidBookings.filter((b) => {
            const bd = getBookingDate(b, today);
            return bd.getMonth() === i && bd.getFullYear() === year;
          }),
        ),
      };
    });
  } else if (graphFilter === "yearly") {
    return Array.from({ length: 5 }, (_, i) => {
      const y = today.getFullYear() - (4 - i);

      return {
        label: `${y}`,
        short: `${y}`,
        value: getEarnings(
          paidBookings.filter(
            (b) => getBookingDate(b, today).getFullYear() === y,
          ),
        ),
      };
    });
  }

  return [];
};

/* -------- Top Services -------- */
export const getTopServices = (services, bookings) => {
  return services
    .map((service) => ({
      ...service,
      bookingCount: bookings.filter(
        (booking) =>
          booking.serviceId?._id === service._id ||
          booking.service?._id === service._id,
      ).length,
    }))
    .sort((a, b) => b.bookingCount - a.bookingCount)
    .slice(0, 4);
};

/* -------- Upcoming Bookings -------- */
export const getUpcomingBookings = (bookings) => {
  const now = new Date();

  return bookings
    .map((booking) => ({
      ...booking,
      displayDate: getBookingDate(booking, now),
    }))
    .filter((b) => {
      return (
        b.displayDate >= now &&
        b.status !== "cancelled" &&
        b.status !== "payment_failed"
      );
    })
    .sort((a, b) => a.displayDate - b.displayDate)
    .slice(0, 3);
};

/* -------- Booking Trend -------- */
export const getBookingTrend = (bookings, graphFilter) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (graphFilter === "daily") {
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const d = new Date(year, month, i + 1);
      const dateStr = formatLocalDateKey(d);

      return {
        label: dateStr,
        short: `${i + 1}`,
        value: bookings.filter((b) => {
          const bd = getBookingDate(b, today);

          return (
            bd.getFullYear() === year &&
            bd.getMonth() === month &&
            bd.getDate() === i + 1
          );
        }).length,
      };
    });
  } else if (graphFilter === "weekly") {
    const year = today.getFullYear();
    const month = today.getMonth();
    const weeks = [];
    let currentWeekStart = new Date(year, month, 1);
    let weekNum = 1;

    while (currentWeekStart.getMonth() === month) {
      const currentWeekEnd = new Date(currentWeekStart);
      currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);

      weeks.push({
        start: new Date(currentWeekStart),
        end: new Date(currentWeekEnd),
        weekNum: weekNum++,
      });

      currentWeekStart = new Date(currentWeekEnd);
    }

    return weeks.map((w) => {
      return {
        label: `Week ${w.weekNum}`,
        short: `W${w.weekNum}`,
        value: bookings.filter((b) => {
          const bd = getBookingDate(b, today);
          return bd >= w.start && bd < w.end;
        }).length,
      };
    });
  } else if (graphFilter === "monthly") {
    const year = today.getFullYear();

    return Array.from({ length: 12 }, (_, i) => {
      const d = new Date(year, i, 1);

      return {
        label: d.toLocaleDateString("en-US", { month: "long" }),
        short: d.toLocaleDateString("en-US", { month: "short" }),
        value: bookings.filter((b) => {
          const bd = getBookingDate(b, today);
          return bd.getMonth() === i && bd.getFullYear() === year;
        }).length,
      };
    });
  } else if (graphFilter === "yearly") {
    return Array.from({ length: 5 }, (_, i) => {
      const y = today.getFullYear() - (4 - i);

      return {
        label: `${y}`,
        short: `${y}`,
        value: bookings.filter(
          (b) => getBookingDate(b, today).getFullYear() === y,
        ).length,
      };
    });
  }

  return [];
};

export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "Good morning 👋";
  if (hour >= 12 && hour < 17) return "Good afternoon 👋";
  if (hour >= 17 && hour < 21) return "Good evening 👋";

  return "Good night 👋";
};
