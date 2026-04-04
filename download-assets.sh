#!/bin/bash
# ─────────────────────────────────────────────────────────────
#  CPP Asset Downloader — run once to self-host all media
#  Usage: chmod +x download-assets.sh && ./download-assets.sh
# ─────────────────────────────────────────────────────────────

BASE="https://www.canberrapropertypartners.com.au"
PUB="./public"

mkdir -p $PUB/images $PUB/videos $PUB/icons $PUB/awards

ok=0; fail=0
dl() {
  echo -n "  → $2 ... "
  curl -sL --max-time 60 "$1" -o "$PUB/$2"
  if [ $? -eq 0 ] && [ -s "$PUB/$2" ]; then echo "✓"; ((ok++))
  else echo "✗ FAILED"; ((fail++)); fi
}

echo ""
echo "━━━ LOGOS ━━━"
dl "$BASE/hubfs/raw_assets/public/2022-Site/assets/images/CPP.svg"        "images/logo-dark.svg"
dl "$BASE/hubfs/raw_assets/public/2022-Site/assets/images/CPP5.svg"       "images/logo-light.svg"
dl "$BASE/hubfs/raw_assets/public/2022-Site/assets/images/logo-menu.png"  "images/logo-footer.png"

echo ""
echo "━━━ VIDEOS ━━━"
dl "$BASE/hubfs/CPP_office_C_v2%20wipes.mp4"          "videos/hero-home.mp4"
dl "$BASE/hubfs/2022File/Video/test%20trim_loop.mp4"  "videos/hero-awards.mp4"

echo ""
echo "━━━ TEAM ━━━"
dl "$BASE/hs-fs/hubfs/2022File/images/image-png.png?width=356&height=357&name=image-png.png" "images/brett.png"

echo ""
echo "━━━ AWARD PHOTOS ━━━"
dl "$BASE/hubfs/2022File/REIACTAwards2021.jpeg"                               "awards/reiact-2021.jpeg"
dl "$BASE/hubfs/2022File/images/28aed114d9e8a4fb261c492fdde93407.jpeg"        "awards/reia-2022.jpeg"
dl "$BASE/hs-fs/hubfs/REIA.png?width=300&name=REIA.png"                      "awards/reia-badge.png"
dl "$BASE/hubfs/Excellence2021.svg"   "awards/excellence-2021.svg"
dl "$BASE/hubfs/2021.svg"             "awards/laf-2021.svg"
dl "$BASE/hubfs/2020.svg"             "awards/laf-2020.svg"
dl "$BASE/hubfs/2019.svg"             "awards/laf-2019.svg"

echo ""
echo "━━━ SERVICE ICONS ━━━"
for icon in photography inspection vetting maintenance insurance portal report utilities collection statement appraise issues; do
  dl "$BASE/hubfs/2022File/Box/$icon.svg" "icons/$icon.svg"
done

echo ""
echo "━━━ SALES ICONS ━━━"
dl "$BASE/hubfs/advise.svg"       "icons/advise.svg"
dl "$BASE/hubfs/communicate.svg"  "icons/communicate.svg"
dl "$BASE/hubfs/market.svg"       "icons/market.svg"

echo ""
echo "━━━ INFOGRAPHIC ━━━"
dl "$BASE/hubfs/raw_assets/public/2022-Site/assets/images/Infographic1.svg" "images/infographic.svg"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Done! ✓ $ok downloaded  ✗ $fail failed"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Restart 'npm run dev' to serve assets locally."
