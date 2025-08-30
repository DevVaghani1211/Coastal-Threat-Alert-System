
import json
from pathlib import Path

RULES_PATH = Path(__file__).parent / "qa_rules.json"

def answer(question: str, lang: str = "en") -> str:
    q = question.lower()
    rules = json.loads(RULES_PATH.read_text(encoding="utf-8"))
    if "cyclone" in q or "storm" in q:
        key = "cyclone_high"
    elif "algal" in q or "bloom" in q:
        key = "algal_bloom"
    else:
        key = "cyclone_high"
    return rules.get(key, {}).get(lang, rules.get(key, {}).get("en", "Stay safe."))
