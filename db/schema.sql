-- Lawn Walker ecommerce tables (Neon Postgres)
-- Run with: npm run db:migrate

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  stripe_session_id TEXT NOT NULL UNIQUE,
  stripe_payment_intent_id TEXT,
  customer_email TEXT,
  customer_name TEXT,
  shipping_address JSONB,
  amount_total INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  payment_status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_slug TEXT NOT NULL,
  product_title TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_amount INTEGER NOT NULL CHECK (unit_amount >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (order_id, product_slug)
);

CREATE TABLE IF NOT EXISTS product_inventory (
  product_slug TEXT PRIMARY KEY,
  status TEXT NOT NULL CHECK (status IN ('available', 'sold')),
  sold_at TIMESTAMPTZ,
  order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_product_inventory_status ON product_inventory(status);
