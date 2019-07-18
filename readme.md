# Node.js email addresses extractor

Extracts all email addresses from a given file and saves them in a new text file, each on a new line.

**Example:**
```sh
$ email-extract ~/Desktop/file_that_contains_emails.eml
```
**File `~/Desktop/emails-found.txt`** :
```
email1@email.it
email2@email.it
...
```

## Install

```sh
npm install -g email-extract
```

## Usage

```
Usage: email-extract [options] <src>

Options:
  -V, --version      output the version number
  -d, --dest <path>  Destination file path, if not set the file will be saved in ./emails-found.txt
  -h, --help         output usage information
```

## Dev

```sh
git clone git@github.com:micc83/email-extract.git
cd email-extract
npm install
npm link
```
