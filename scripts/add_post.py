#!/usr/bin/env python3
"""Append a post to posts.json from a GitHub issue created with the
"Add a post to the website" issue form.

Reads ISSUE_BODY from the environment, parses the "### Label" / value blocks
that GitHub issue forms produce, validates the fields, and writes the new
entry to posts.json (newest first).

Writes `changed`, `title` and `message` to $GITHUB_OUTPUT for the workflow.

Run locally to test:
    ISSUE_BODY="$(cat sample-issue.md)" python scripts/add_post.py
"""

from __future__ import annotations

import datetime as dt
import json
import os
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
POSTS_FILE = REPO_ROOT / "posts.json"

# Issue-form field label -> key in posts.json
FIELD_MAP = {
    "url": "url",
    "title": "title",
    "source": "source",
    "date": "date",
    "summary": "summary",
    "tags": "tags",
}

ALLOWED_SOURCES = {"LinkedIn", "Medium", "Website", "Talk", "Paper", "Other"}
NO_RESPONSE = {"_no response_", "_none_", "n/a", "na", "-", ""}
MAX_TAGS = 6


def parse_issue_form(body: str) -> dict[str, str]:
    """Turn '### Label\\n\\nvalue' blocks into {normalised_label: value}."""
    fields: dict[str, str] = {}
    # Split on headings, keeping the heading text.
    chunks = re.split(r"^###\s+(.+?)\s*$", body, flags=re.MULTILINE)
    # chunks[0] is any preamble; then pairs of (heading, content).
    for i in range(1, len(chunks) - 1, 2):
        label = chunks[i].strip().lower()
        value = chunks[i + 1].strip()
        if value.strip().lower() in NO_RESPONSE:
            value = ""
        fields[label] = value
    return fields


def clean(value: str, limit: int) -> str:
    """Collapse whitespace and trim to a sane length."""
    return re.sub(r"\s+", " ", value).strip()[:limit]


def fail(message: str) -> None:
    emit(changed=False, title="", message=f":x: {message}")
    print(message, file=sys.stderr)
    sys.exit(0)  # Soft-fail: comment on the issue rather than red-X the run.


def emit(*, changed: bool, title: str, message: str) -> None:
    out_path = os.environ.get("GITHUB_OUTPUT")
    if not out_path:
        print(f"changed={changed}\ntitle={title}\nmessage={message}")
        return
    with open(out_path, "a", encoding="utf-8") as handle:
        handle.write(f"changed={'true' if changed else 'false'}\n")
        handle.write(f"title={title}\n")
        # Multi-line-safe delimiter form.
        handle.write("message<<POST_EOF\n")
        handle.write(message + "\n")
        handle.write("POST_EOF\n")


def main() -> None:
    body = os.environ.get("ISSUE_BODY", "")
    if not body.strip():
        fail("The issue body was empty, so there was nothing to add.")

    raw = parse_issue_form(body)
    fields = {key: raw.get(label, "") for label, key in FIELD_MAP.items()}

    url = clean(fields["url"], 500)
    if not re.match(r"^https?://", url, flags=re.IGNORECASE):
        fail(
            "That URL does not look right — it needs to start with `http://` "
            "or `https://`. Edit the issue and I will try again."
        )

    title = clean(fields["title"], 200)
    if not title:
        fail("A title is required. Edit the issue to add one and I will try again.")

    source = clean(fields["source"], 40) or "Other"
    if source not in ALLOWED_SOURCES:
        source = "Other"

    date = clean(fields["date"], 20)
    if date:
        try:
            date = dt.date.fromisoformat(date).isoformat()
        except ValueError:
            fail(
                f"`{date}` is not a valid date. Use `YYYY-MM-DD`, or leave the "
                "field blank to use today."
            )
    else:
        date = dt.date.today().isoformat()

    summary = clean(fields["summary"], 400)

    tags = [
        clean(tag, 40)
        for tag in fields["tags"].replace("\n", ",").split(",")
        if clean(tag, 40)
    ][:MAX_TAGS]

    posts = []
    if POSTS_FILE.exists():
        try:
            loaded = json.loads(POSTS_FILE.read_text(encoding="utf-8"))
            posts = loaded if isinstance(loaded, list) else loaded.get("posts", [])
        except json.JSONDecodeError as error:
            fail(f"posts.json is not valid JSON and I did not want to overwrite it: {error}")

    if any(str(post.get("url", "")).strip() == url for post in posts):
        emit(
            changed=False,
            title=title,
            message=(
                ":information_source: That URL is already in `posts.json`, "
                "so nothing changed. Closing is safe."
            ),
        )
        return

    entry = {
        "title": title,
        "url": url,
        "source": source,
        "date": date,
        "summary": summary,
        "tags": tags,
    }

    posts.insert(0, entry)
    posts.sort(key=lambda post: str(post.get("date") or ""), reverse=True)

    POSTS_FILE.write_text(
        json.dumps(posts, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )

    emit(
        changed=True,
        title=title,
        message=(
            f":white_check_mark: Added **{title}** ({source}, {date}) to "
            "`posts.json`. It will show up in the Writing section at "
            "https://alvaroaguado3.github.io/#writing once GitHub Pages "
            "finishes deploying — usually a minute or two."
        ),
    )


if __name__ == "__main__":
    main()
