
const profile = {
  id: "demo-user-001",
  name: "OneTouch User",
  currency: "EUR",
  mode: "demo"
};

const accounts = [
  {
    id: "account-001",
    name: "Основной счёт",
    balance: "1250.00",
    currency: "EUR"
  }
];

const transactions = [
  {
    id: "tx-001",
    description: "Покупка в магазине",
    amount: "-24.90",
    currency: "EUR",
    date: "2026-10-28",
    status: "completed"
  },
  {
    id: "tx-002",
    description: "Пополнение счёта",
    amount: "100.00",
    currency: "EUR",
    date: "2026-10-27",
    status: "completed"
  },
  {
    id: "tx-003",
    description: "Кофейня",
    amount: "-4.50",
    currency: "EUR",
    date: "2026-10-26",
    status: "completed"
  }
];

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "no-store"
    }
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    if (request.method !== "GET") {
      return json({ error: "Method not allowed" }, 405);
    }

    switch (url.pathname) {
      case "/":
      case "/health":
        return json({
          app: "OneTouch API",
          status: "ok",
          mode: "demo",
          endpoints: [
            "/health",
            "/api/v1/me",
            "/api/v1/accounts",
            "/api/v1/transactions"
          ]
        });

      case "/api/v1/me":
        return json(profile);

      case "/api/v1/accounts":
        return json({ items: accounts, mode: "demo" });

      case "/api/v1/transactions":
        return json({ items: transactions, mode: "demo" });

      default:
        return json({ error: "Not found" }, 404);
    }
  }
};
