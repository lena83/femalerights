# Her Story Through Time

An interactive, educational web page for young readers. It shows how women's lives changed from 1850 to today in five countries: the **United Kingdom, the United States, Russia (Russian Empire → USSR → Russia), Turkey (Ottoman Empire → Republic) and China (Qing → Republic → PRC)**.

For each country and each of 8 moments in time (1850, 1880, 1900, 1925, 1945, 1965, 1990, 2025) it shows:

- an illustrated **paper-doll figure** wearing that era's typical clothes, with a short description
- whether a woman could **vote, own property and keep her money, choose her job, run a business, go to university** (Yes / Partly / No)
- the usual **age at first marriage**
- a short story of the era, plus a **"Woman to know"** role model

There are also overview visuals: a rights scoreboard (heatmap), a marriage-age line chart, and a timeline of when women won the vote.

## How to open it

No build step and no install. Open `index.html` in any web browser.

To put it online for free, turn on **GitHub Pages** (Settings → Pages → deploy from this branch, root folder).

## Files

| File | What it holds |
|---|---|
| `index.html` | Page layout |
| `css/style.css` | Styles (light and dark mode) |
| `js/data.js` | **All the content**: rights, ages, clothes, stories. Edit this to correct or add facts. |
| `js/figure.js` | Draws the paper-doll figures in SVG |
| `js/app.js` | Interactivity: the year ruler, views, charts |

## A note on accuracy

The content is simplified for children. Rights scores describe what the law allowed most women at that time. Marriage ages are rounded; figures before about 1900 are historians' estimates and differed a lot between towns and villages and between rich and poor families.
