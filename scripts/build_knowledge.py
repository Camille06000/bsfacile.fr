#!/usr/bin/env python3
"""
Build knowledge.json from the Apify web crawler CSV dataset.
Extracts payroll (paie) knowledge from crawled pages, creates
structured entries for FTS-based RAG chatbot.
"""
import csv
import json
import re
import sys
import unicodedata

CSV_PATH = "C:/Users/nilov/Desktop/bsfacile.fr/dataset_website-content-crawler_2026-03-26_04-00-37-512.csv"
OUTPUT_PATH = "C:/Users/nilov/Desktop/bsfacile.fr/data/knowledge.json"

# Topics mapping: URL patterns or title keywords -> topic label
TOPIC_MAP = [
    (r'smic|salaire.minimum', 'SMIC & Salaire minimum'),
    (r'cotisation|urssaf|patron|salarial', 'Cotisations sociales'),
    (r'conge.pay|conges', 'Congés payés'),
    (r'arret.maladie|maladie|ijss', 'Arrêt maladie'),
    (r'heures.suppl|heure.sup', 'Heures supplémentaires'),
    (r'convention.collect', 'Conventions collectives'),
    (r'dsn|declaration.sociale', 'DSN'),
    (r'licenciement|rupture|solde.tout.compte', 'Licenciement & Rupture'),
    (r'demission', 'Démission'),
    (r'fiche.paie|bulletin.paie|bulletin.salaire', 'Lire son bulletin de salaire'),
    (r'impot|prelevement.source|pas', 'Impôt & Prélèvement à la source'),
    (r'interim|temporaire', 'Travail temporaire'),
    (r'prime|bonus|participation|interessement', 'Primes & Avantages'),
    (r'cdd|cdi|contrat', 'Contrat de travail'),
    (r'apprentissage|alternance|apprenti', 'Apprentissage & Alternance'),
    (r'retraite|pension', 'Retraite'),
    (r'association|benevolat', 'Associations & Bénévolat'),
    (r'btp|construction', 'BTP & Construction'),
    (r'temps.partiel|partiel', 'Temps partiel'),
    (r'net.social|espace.France.connect', 'Net social'),
    (r'attestation|certificat', 'Attestations'),
    (r'pmss|plafond', 'PMSS & Plafonds'),
    (r'fillon|reduction', 'Réduction Fillon'),
    (r'paie|salaire', 'Paie & Salaire'),
]


def normalize(text):
    """Lowercase + remove accents for keyword matching."""
    return unicodedata.normalize('NFD', text.lower()).encode('ascii', 'ignore').decode()


def detect_topic(url, title, text):
    """Detect topic from URL/title."""
    combined = normalize(url + ' ' + title)
    for pattern, label in TOPIC_MAP:
        if re.search(pattern, combined):
            return label
    return 'Paie & Salaire'


def extract_keywords(text, title, topic):
    """Extract relevant keywords from text."""
    # Combine title + first 500 chars of text
    src = normalize(title + ' ' + text[:500])
    # Tokenize
    tokens = re.findall(r'[a-z]{3,}', src)
    # Frequency
    freq = {}
    for t in tokens:
        if t not in STOP_WORDS:
            freq[t] = freq.get(t, 0) + 1
    # Top keywords
    sorted_kw = sorted(freq.items(), key=lambda x: -x[1])
    keywords = [k for k, _ in sorted_kw[:15]]
    # Always include topic words
    for w in normalize(topic).split():
        if len(w) > 3 and w not in keywords:
            keywords.append(w)
    return ' '.join(keywords[:20])


def clean_text(text):
    """Clean text: remove markdown artifacts, extra whitespace."""
    # Remove markdown headers markers
    text = re.sub(r'^#+\s+', '', text, flags=re.MULTILINE)
    # Remove markdown links [text](url)
    text = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', text)
    # Remove image links
    text = re.sub(r'!\[.*?\]\(.*?\)', '', text)
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Normalize whitespace
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r'[ \t]{2,}', ' ', text)
    return text.strip()


def split_paragraphs(text):
    """Split text into meaningful paragraphs."""
    paragraphs = re.split(r'\n\n+', text)
    result = []
    current = ''
    for p in paragraphs:
        p = p.strip()
        if not p:
            continue
        if len(p) < 50:  # Too short, merge with next
            current += ' ' + p
        else:
            if current:
                result.append((current + ' ' + p).strip())
                current = ''
            else:
                result.append(p)
    if current:
        result.append(current)
    return result


def make_answer(text, title, max_chars=600):
    """Extract the best answer paragraph from text."""
    cleaned = clean_text(text)
    paragraphs = split_paragraphs(cleaned)

    # Find first substantial paragraph (not just a title repeat)
    title_norm = normalize(title)
    for p in paragraphs:
        if len(p) > 100 and normalize(p[:50]) not in title_norm:
            return p[:max_chars]

    # Fallback: first paragraph
    if paragraphs:
        return paragraphs[0][:max_chars]

    return cleaned[:max_chars]


STOP_WORDS = {
    'les', 'des', 'une', 'pour', 'dans', 'est', 'par', 'sur', 'qui', 'que',
    'son', 'pas', 'avec', 'tout', 'mais', 'ont', 'aux', 'vous', 'nous', 'ils',
    'elle', 'lui', 'ces', 'ses', 'leur', 'plus', 'peut', 'aussi', 'cette',
    'comme', 'bien', 'tre', 'etre', 'avoir', 'etait', 'sont', 'sera', 'soit',
    'the', 'and', 'for', 'not', 'with', 'this', 'that', 'from', 'has',
    'via', 'etc', 'meme', 'ainsi', 'donc', 'entre', 'cas', 'lors', 'apres',
    'faire', 'fait', 'faut', 'voir', 'tout', 'tous', 'lors', 'afin', 'doit',
    'tant', 'sauf', 'sinon', 'alors', 'donc', 'selon', 'sans', 'dont',
    'lors', 'quand', 'quant', 'avant', 'sous', 'entre', 'vers', 'etant',
    'pouvez', 'devez', 'doivent', 'peuvent', 'fiche', 'paie', 'net',
}


def process_csv():
    entries = []
    seen_urls = set()

    with open(CSV_PATH, encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    print(f"Processing {len(rows)} rows...")

    for i, row in enumerate(rows):
        url = row.get('url', '').strip()
        title = row.get('metadata/title', '').strip()
        description = row.get('metadata/description', '').strip()
        text = row.get('text', '').strip()
        markdown = row.get('markdown', '').strip()

        # Skip if no meaningful content
        if not text and not markdown:
            continue

        # Skip duplicates
        if url in seen_urls:
            continue
        seen_urls.add(url)

        # Skip privacy policy, stats, etc.
        skip_patterns = [
            'politique-de-confidentialite', 'statistiques', 'tarifs',
            'cgu', 'mentions-legales', 'contact', 'connexion', 'inscription'
        ]
        if any(p in url for p in skip_patterns):
            continue

        # Use text (plain) preferring markdown for richer content
        content = text if text else markdown

        # Clean title
        if title:
            # Remove site name suffix
            title = re.sub(r'\s*[-|–]\s*(Fiche-paie\.net|fiches?-?paie\.net|bulletinfacile\.fr).*$', '', title, flags=re.IGNORECASE)
            title = title.strip()

        if not title:
            # Try to extract from text
            lines = content.split('\n')
            for line in lines:
                line = line.strip().lstrip('#').strip()
                if len(line) > 10 and len(line) < 100:
                    title = line
                    break

        if not title:
            continue

        topic = detect_topic(url, title, content)
        answer = make_answer(content, title)

        if not answer or len(answer) < 50:
            if description and len(description) > 50:
                answer = description
            else:
                continue

        keywords = extract_keywords(content, title, topic)

        entry = {
            'id': f'page_{i:03d}',
            'topic': topic,
            'q': title,
            'a': answer,
            'keywords': keywords,
            'url': url,
        }
        entries.append(entry)

        # Also create additional entries for long pages (chunk them)
        if len(content) > 2000:
            cleaned = clean_text(content)
            paragraphs = split_paragraphs(cleaned)

            # Group paragraphs into chunks of ~500 chars
            chunk = ''
            chunk_num = 0
            for p in paragraphs[1:]:  # Skip first (already used as main answer)
                if len(chunk) + len(p) < 600:
                    chunk += ' ' + p
                else:
                    if len(chunk) > 150:
                        chunk_num += 1
                        # Extract a sub-title from the chunk
                        sub_title = chunk.strip()[:60].rstrip(',. ')
                        chunk_entry = {
                            'id': f'page_{i:03d}_chunk_{chunk_num}',
                            'topic': topic,
                            'q': sub_title,
                            'a': chunk.strip()[:700],
                            'keywords': keywords,
                            'url': url,
                        }
                        entries.append(chunk_entry)
                        if chunk_num >= 4:  # Max 4 extra chunks per page
                            break
                    chunk = p

    print(f"Generated {len(entries)} knowledge entries from {len(seen_urls)} unique URLs")
    return entries


def main():
    entries = process_csv()

    # Add Bulletin Facile specific entries at the start
    bf_entries = [
        {
            'id': 'bf_001',
            'topic': 'Bulletin Facile',
            'q': 'Comment créer un bulletin de salaire en ligne ?',
            'a': 'Avec Bulletin Facile, créez votre bulletin de salaire en moins de 2 minutes. Notre outil calcule automatiquement toutes les cotisations sociales selon les règles URSSAF 2026. Saisissez simplement le salaire brut, les informations du salarié et de l\'entreprise, et obtenez un bulletin conforme prêt à imprimer.',
            'keywords': 'bulletin salaire creer ligne generateur simple rapide',
            'url': 'https://bulletinfacile.fr/generateur',
        },
        {
            'id': 'bf_002',
            'topic': 'Bulletin Facile',
            'q': 'Qu\'est-ce que Bulletin Facile ?',
            'a': 'Bulletin Facile est un générateur de bulletins de salaire en ligne conforme URSSAF 2026. Sans installation, sans comptable, créez des fiches de paie professionnelles en quelques clics. Idéal pour les TPE, auto-entrepreneurs, associations et particuliers employeurs.',
            'keywords': 'bulletin facile generateur fiche paie tpe auto entrepreneur association',
            'url': 'https://bulletinfacile.fr',
        },
        {
            'id': 'bf_003',
            'topic': 'Bulletin Facile',
            'q': 'Quel est le tarif de Bulletin Facile ?',
            'a': 'Bulletin Facile propose plusieurs formules : bulletin à l\'unité à 8,90€, pack 5 bulletins à 29€, abonnement mensuel à 28,85€/mois (bulletins illimités), ou abonnement annuel à 288€/an. Tous les bulletins incluent le calcul automatique des cotisations.',
            'keywords': 'tarif prix abonnement bulletin unite pack mensuel annuel',
            'url': 'https://bulletinfacile.fr/tarifs',
        },
    ]

    all_entries = bf_entries + entries

    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(all_entries, f, ensure_ascii=False, indent=2)

    print(f"\nSaved {len(all_entries)} entries to {OUTPUT_PATH}")
    print("\nSample topics distribution:")
    topic_counts = {}
    for e in all_entries:
        topic_counts[e['topic']] = topic_counts.get(e['topic'], 0) + 1
    for topic, count in sorted(topic_counts.items(), key=lambda x: -x[1])[:15]:
        print(f"  {count:4d}  {topic}")


if __name__ == '__main__':
    main()
