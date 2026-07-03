# domain-master
Automated domain name scanning and dropped domain discovery tool

This tool scans 3-character .com domains using the Verisign RDAP API to identify domains that are available or expiring soon. It utilizes various wordlists and character combinations to automate the discovery of high-value dropped domains.

## Features
- **RDAP Integration**: Queries Verisign RDAP to check domain status and registration data.
- **Permutation Generation**: Supports scanning based on letters, digits, or alphanumeric combinations.
- **Concurrent Processing**: Uses `concurrent.futures` for high-speed domain lookups.
- **Custom Wordlists**: Integrates multiple dictionary and pattern files (CVCVC, short letters) for targeted scanning.

## Run
```bash
python3 scan3.py
```

## Stack
Python 3
