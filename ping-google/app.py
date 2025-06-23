import time
import os
from googlesearch import search

# --- Configuration ---
query = "site:ohmyglass.ca"
output_file = "found_urls.txt" # We will append to the existing file
already_found_urls = set()

# Load URLs that have already been found to avoid re-scraping and duplicates
if os.path.exists(output_file):
    print(f"Loading existing URLs from '{output_file}' to resume...")
    with open(output_file, "r", encoding='utf-8') as f:
        already_found_urls = {line.strip() for line in f if line.strip()}
    print(f"Loaded {len(already_found_urls)} unique URLs from the previous session.")

print(f"\n--- Starting Google Search Scraping ---")
print(f"Query: '{query}'")
print(f"Appending new, unique results to: '{output_file}'")
print("This will take a very long time. You can stop it at any time (Ctrl+C).")
print("Progress is saved continuously.")

# We will aim for a very high number of results.
# The 'num_results' is a target, not a guarantee.
# The 'sleep_interval' is crucial to avoid getting blocked by Google. A long sleep interval is safer.
try:
    # Setting a start_num to try and get deeper results. We'll start from the number we already have.
    search_generator = search(query, num_results=50000, sleep_interval=10, start_num=len(already_found_urls))

    # Open the file in append mode to add to existing results
    with open(output_file, "a", encoding='utf-8') as f:
        url_count = len(already_found_urls)
        print(f"Starting search... will add to the {url_count} URLs already found.")
        
        for url in search_generator:
            if url not in already_found_urls:
                f.write(f"{url}\n")
                already_found_urls.add(url)
                url_count += 1
                print(f"Found ({url_count}): {url}")
                # An additional delay between requests can also help.
                time.sleep(2) # 10s from sleep_interval + 2s here = 12s total pause

except Exception as e:
    print(f"\nAn error occurred: {e}")
    print("The process was stopped, but all progress has been saved.")

print(f"\n--- Scraping Complete (or paused) ---")
print(f"Total unique URLs now in file: {len(already_found_urls)}") 