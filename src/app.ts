import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.type("html").send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PortfolioAI API</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 32px;
        background: #f5f7fb;
        color: #111;
      }
      header {
        margin-bottom: 24px;
      }
      h1 {
        margin: 0 0 8px;
      }
      .card {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
        padding: 24px;
        max-width: 720px;
      }
      dt {
        font-weight: 700;
        margin-top: 16px;
      }
      dd {
        margin: 4px 0 0 0;
      }
      .note {
        margin-top: 20px;
        padding: 14px 16px;
        background: #eef4ff;
        border-left: 4px solid #3b82f6;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <header>
        <h1>PortfolioAI API</h1>
        <p>Welcome to the PortfolioAI API documentation page.</p>
      </header>

      <dl>
        <dt>GET /</dt>
        <dd>Returns this HTML API overview document.</dd>
      </dl>

      <section class="note">
        <strong>Note:</strong> If additional routes are registered in the API, add them to this page for easy discovery.
      </section>
    </div>
  </body>
</html>`);
});

export default app;