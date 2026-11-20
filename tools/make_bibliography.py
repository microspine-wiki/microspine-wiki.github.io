#!/usr/bin/env python3
"""Regenerate wiki/reference/bibliography.md from data/references.json.

    python3 tools/make_bibliography.py

data/references.json is the source of truth for the bibliography. Each entry's
"key" becomes the anchor that wiki pages link to, so do not rename keys that
are already cited. Besides the usual bibliographic fields, an entry may carry
"key_numbers": claims with the verbatim quote that supports them, kept so that
facts quoted in the wiki can be traced.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "data" / "references.json"
TARGET = ROOT / "wiki" / "reference" / "bibliography.md"

SECTIONS = [
    ("stanford-spines", "Microspine arrays: the Stanford line",
     "The papers in which the compliant microspine array was introduced, analysed and scaled up."),
    ("modeling", "Models of spine–surface contact", ""),
    ("fabrication", "Fabrication", ""),
    ("limbed-climbers", "Legged and limbed climbers", ""),
    ("grippers", "Spine grippers", ""),
    ("space", "Space and extreme terrain", ""),
    ("wheeled-other", "Wheels, tracks and soft robots", ""),
    ("perching", "Perching", ""),
    ("human-climbing", "Human climbing",
     "Biomechanics of climbers on instrumented holds, and human-scale climbing devices."),
    ("adhesives", "Directional adhesion",
     "Closely related work on gecko-like adhesives, cited where spine arrays borrow its ideas."),
    ("contact-mechanics", "Friction and limit surfaces", ""),
    ("biology", "Claws and spines in animals", ""),
    ("review", "Reviews", ""),
    ("web", "Web pages, patents and data sheets", ""),
    ("archive", "Unpublished laboratory documents",
     "Working documents and videos from the Stanford laboratory's project wikis, written or recorded at Stanford. They were not peer reviewed: treat their numbers as single observations. See [The BDML Z-Man wiki](../about/bdml-archive.md)."),
]

HEADER = """---
description: Every work cited in the wiki, and a few more worth reading, with a DOI or stable link and a short note on what each contributes. Each entry was checked against the publisher's record.
status: reviewed
---

# Bibliography

Entries are grouped by topic and sorted by year. The bold label at the start of each entry is the form used for citations in the text: the first author and the year, or both authors of a two-author work. Bibliographic details were checked against Crossref or the publisher's page in November 2026. The notes summarise each abstract and claim nothing beyond it.

To cite a work from a wiki page, link to its anchor here, for example `[Asbeck 2010](../reference/bibliography.md#asbeck2010)`. This page is generated from `data/references.json`; to add a work, see [Contributing](../about/contributing.md#adding-a-reference).
"""

REPOSITORIES = {
    "purl.stanford.edu": "Stanford Digital Repository",
    "ntrs.nasa.gov": "NASA Technical Reports Server",
}


def person(name):
    family, _, given = name.partition(", ")
    return f"{given} {family}".strip() if given else family


def authors(names):
    people = [person(name) for name in names]
    return people[0] if len(people) == 1 else ", ".join(people[:-1]) + " and " + people[-1]


def label(entry):
    if "label" in entry:
        return entry["label"]
    # The form used in the text: "Kim 2005", "Asbeck & Cutkosky 2012"; works by three or
    # more authors go by the first author alone. Clashes need an explicit "label".
    names = [name.split(",")[0] for name in entry["authors"]]
    who = f"{names[0]} & {names[1]}" if len(names) == 2 else names[0]
    return f"{who} {entry['year']}"


def citation(entry):
    if "citation" in entry:
        if not entry.get("url"):
            return entry["citation"]
        shown = entry["url"].split("//", 1)[1].rstrip("/")
        return f"{entry['citation']} [{shown}]({entry['url']})"
    venue = f"*{entry['venue']}*"
    if entry.get("volume"):
        venue += f" {entry['volume']}" + (f"({entry['issue']})" if entry.get("issue") else "")
    if entry.get("pages"):
        pages = entry["pages"]
        venue += f", pp. {pages.replace('-', '–')}" if "-" in pages else f", article {pages}"
    text = f"{authors(entry['authors'])} ({entry['year']}). {entry['title'].rstrip('.')}. {venue}."
    links = []
    doi_url = f"https://doi.org/{entry['doi']}" if entry.get("doi") else None
    if doi_url:
        links.append(f"[doi:{entry['doi']}]({doi_url})")
    elif entry.get("url"):
        host = next((name for site, name in REPOSITORIES.items() if site in entry["url"]), "PDF from the authors")
        links.append(f"[{host}]({entry['url']})")
    open_copy = entry.get("oa_url")
    if open_copy and open_copy == doi_url:
        links.append("open access")
    elif open_copy and open_copy != entry.get("url"):
        links.append(f"[open copy]({open_copy})")
    return f"{text} {' · '.join(links)}"


def main():
    entries = json.loads(SOURCE.read_text(encoding="utf-8"))
    keys = [entry["key"] for entry in entries]
    assert len(keys) == len(set(keys)), "duplicate keys in references.json"
    shown = [label(entry) for entry in entries]
    clashes = sorted({name for name in shown if shown.count(name) > 1})
    assert not clashes, f"two works share a label, give them explicit labels such as 2011a/2011b: {clashes}"
    known = {category for category, _, _ in SECTIONS}
    stray = [entry["key"] for entry in entries if entry["category"] not in known]
    assert not stray, f"entries with an unknown category: {stray}"

    out = [HEADER]
    for category, heading, blurb in SECTIONS:
        group = sorted((e for e in entries if e["category"] == category), key=lambda e: (e.get("year", 0), e["key"]))
        if not group:
            continue
        out.append(f"## {heading}\n")
        if blurb:
            out.append(blurb + "\n")
        for entry in group:
            out.append(f'- <a id="{entry["key"]}"></a>**{label(entry)}.** {citation(entry)}  \n  {entry["summary"].strip()}\n')
    TARGET.write_text("\n".join(out), encoding="utf-8")
    print(f"{len(entries)} entries → {TARGET.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
