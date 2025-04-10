const configs = {
  PORT: process.env.PORT || 3000,
  MONGOOSE: {
    PORT: process.env.DB_PORT || 27017, // Thường MongoDB chạy trên cổng 27017
    HOST: process.env.DB_HOST || "localhost",
    NAME: process.env.DB_NAME || "my_database",
  },
  ZALO_PAY: {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create",
    callback_url: "https://e9ef-222-252-105-117.ngrok-free.app/callback",
    redirecturl:
      "http://localhost:5173/client",
  },
};

module.exports = { configs };
