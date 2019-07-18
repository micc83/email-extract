# Node.js email extractor

Retrieve all emails from a given file and saves them in a txt file.

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
