# -*- coding: utf-8 -*-
import re
from pathlib import Path

p = Path(__file__).resolve().parents[1] / "app" / "[locale]" / "cart" / "page.tsx"
text = p.read_text(encoding="utf-8")

text2 = re.sub(
    r"alert\(locale === 'en' \? 'Geolocation is not supported by your browser' : '[^']+'\);",
    "alert(t('geoNotSupported'));",
    text,
)
text2 = re.sub(
    r"alert\(locale === 'en'\s*\n\s*\? 'Unable to retrieve your location\. Please enter address manually\.'\s*\n\s*: '[^']+'\);",
    "alert(t('geoError'));",
    text2,
)
text2 = re.sub(
    r"\{locale === 'en' \? 'Getting Location\.\.\.' : '[^']+'\}",
    "{t('gettingLocation')}",
    text2,
)
text2 = re.sub(
    r"\{locale === 'en' \? 'Use Current Location' : '[^']+'\}",
    "{t('useCurrentLocation')}",
    text2,
)
text2 = re.sub(
    r"\{locale === 'en' \? 'Your delivery location' : '[^']+'\}",
    "{t('yourDeliveryLocation')}",
    text2,
)

p.write_text(text2, encoding="utf-8")
print("changed", text != text2)
print("remaining locale ternaries", text2.count("locale === 'en' ?"))
