A.Furniture Furniture Factory Website

GitHub Pages ready structure:
- index.html
- product.html
- about.html
- contact.html
- assets/css/style.css
- assets/js/script.js
- assets/images/*

Notes:
- Keep all root HTML files in the repository root.
- Keep CSS, JavaScript and images inside assets.
- Hero slider uses assets/images/hero-sofa.jpg, bed.jpg and factory.jpg.
- Replace temporary phone, email, address and social links with real business information later.


ECOMMERCE ORDER FLOW
- Buy Now opens checkout.html.
- Place Order validates and saves the order in the customer browser localStorage under A.FurnitureOrders and shows an Order ID.
- This static GitHub Pages version does not send orders to a server. A real shared admin/order WhatsApp requires a backend or hosted form/WhatsApp service.
- WhatsApp contact buttons use 0317 2351280.

ONLINE E-COMMERCE ORDER SYSTEM
- Checkout now saves real orders to WhatsApp order flow after one-time setup.
- Admin dashboard: admin.html
- WhatsApp order flow SQL schema: supabase-schema.sql
- Configuration file: assets/js/supabase-config.js
- Do not put a service_role/secret key in the website.


Order flow:
Buy Now -> Checkout -> Place Order -> WhatsApp opens with a pre-filled order message.
Customer presses Send to deliver the order to A.Furniture WhatsApp (+92 317 2351280).

Note: A static GitHub Pages site cannot send WhatsApp messages silently in the background. The customer must press Send in WhatsApp.
