"""
scrape-fragrantica.py
Scrapes olfactive family (acordes principales) from Fragrantica URLs
and updates the productos/perfumes table in Supabase.

Requirements:
    pip install playwright playwright-stealth supabase python-dotenv
    playwright install chromium

Usage:
    python scripts/scrape-fragrantica.py
"""

import asyncio
import os
import time
import random
from dotenv import load_dotenv
from supabase import create_client
from playwright.async_api import async_playwright
from playwright_stealth import stealth_async

load_dotenv()

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]  # service role para bypassear RLS

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# -------------------------------------------------------------------
# Mapeás los acordes de Fragrantica a tus familias_olfativas locales
# Ajustá según los nombres que tengas en tu DB
# -------------------------------------------------------------------
ACORDE_TO_FAMILIA = {
    "floral":       "Floral",
    "flores":       "Floral",
    "oriental":     "Oriental",
    "ámbar":        "Oriental",
    "ambar":        "Oriental",
    "amaderado":    "Amaderado",
    "madera":       "Amaderado",
    "woody":        "Amaderado",
    "fresco":       "Fresco",
    "acuático":     "Fresco",
    "acuatico":     "Fresco",
    "cítrico":      "Fresco",
    "citrico":      "Fresco",
    "chipre":       "Chipre",
    "fougère":      "Fougère",
    "fougere":      "Fougère",
    "gourmand":     "Gourmand",
    "dulce":        "Gourmand",
    "oud":          "Árabe / Oud",
    "árabe":        "Árabe / Oud",
    "arabe":        "Árabe / Oud",
}


def map_acorde_to_familia(acordes: list[str]) -> str | None:
    """Returns the first matching familia for the given accords list."""
    for acorde in acordes:
        key = acorde.lower().strip()
        for pattern, familia in ACORDE_TO_FAMILIA.items():
            if pattern in key:
                return familia
    return None


async def scrape_fragrantica_page(page, url: str) -> list[str]:
    """Returns the list of main accords found on the Fragrantica page."""
    try:
        await page.goto(url, wait_until="domcontentloaded", timeout=30000)
        await asyncio.sleep(random.uniform(2, 4))  # human-like delay

        # Fragrantica shows main accords in a div with class "cell accord-box"
        # Each accord has a span with the name inside
        acordes = await page.evaluate("""
            () => {
                const boxes = document.querySelectorAll('.accord-box');
                return Array.from(boxes).map(b => b.querySelector('span')?.textContent?.trim()).filter(Boolean);
            }
        """)
        return acordes
    except Exception as e:
        print(f"  Error scraping {url}: {e}")
        return []


async def main():
    # 1. Fetch all perfumes that have a fragrantica_url and no familia yet
    #    Adjust the table/column names to match your actual schema.
    #    If you store the Fragrantica URL in a column called `fragrantica_url`, use that.
    #    Otherwise build the URLs from nombre + marca manually.
    response = (
        supabase.table("productos")
        .select("id, nombre, marca, fragrantica_url, familia_olfativa_id")
        .is_("familia_olfativa_id", "null")          # only unfilled ones
        .not_.is_("fragrantica_url", "null")          # that have a URL
        .execute()
    )
    perfumes = response.data
    if not perfumes:
        print("No hay perfumes sin familia olfativa con URL de Fragrantica.")
        return

    print(f"Procesando {len(perfumes)} perfumes...\n")

    # 2. Fetch familia IDs from DB once
    familias_res = supabase.table("familias_olfativas").select("id, nombre").execute()
    familia_map = {f["nombre"]: f["id"] for f in familias_res.data}

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/125.0.0.0 Safari/537.36"
            ),
            locale="es-ES",
            viewport={"width": 1280, "height": 800},
        )
        page = await context.new_page()
        await stealth_async(page)

        for perfume in perfumes:
            url = perfume["fragrantica_url"]
            nombre = perfume["nombre"]
            print(f"→ {nombre}  ({url})")

            acordes = await scrape_fragrantica_page(page, url)
            if not acordes:
                print("  Sin acordes encontrados, saltando.")
                continue

            print(f"  Acordes: {acordes}")
            familia_nombre = map_acorde_to_familia(acordes)
            if not familia_nombre:
                print("  No se pudo mapear a ninguna familia local.")
                continue

            familia_id = familia_map.get(familia_nombre)
            if not familia_id:
                print(f"  Familia '{familia_nombre}' no existe en DB.")
                continue

            # 3. Update the row
            supabase.table("productos").update(
                {"familia_olfativa_id": familia_id}
            ).eq("id", perfume["id"]).execute()
            print(f"  ✓ Asignado: {familia_nombre}")

            # Rate limit: wait between 3 and 7 seconds between requests
            await asyncio.sleep(random.uniform(3, 7))

        await browser.close()

    print("\nListo.")


if __name__ == "__main__":
    asyncio.run(main())
