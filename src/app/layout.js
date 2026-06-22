import "./globals.css";

export const metadata = {
  title: "Boobakery | Premium Handcrafted Chocolates & Treats",
  description: "Experience the magic of boobakery. Indulge in our dry fruit chocolates, fruity choco pops, assorted stuffed dates, and premium chocolate bites. Handcrafted with love in small batches.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
