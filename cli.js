#! /usr/bin/env node
const options = require('commander');
options.version('0.0.1');

options
    .arguments('<src>')
    .description('Retrieve all emails from a given file and saved them in a txt file.')
    // .option('-s, --src <path>', 'Source file path')
    .option('-d, --dest <path>', 'Destination file path')
    .action(function (src) {
        options.src = src
    });

options.parse(process.argv);

const path = require('path');
const fs = require('fs');
const untildify = require('untildify');
const chalk = require('chalk');
const log = console.log;
const logError = t => log(chalk.red(t) + "\n");
const logSuccess = t => log(chalk.green.bold(t) + "\n");
const logInfo = t => log('• ' + chalk.blueBright(t) + "\n");

if (!options.src) {
    return options.outputHelp();
}

options.src = untildify(options.src);
options.dest = options.dest || path.dirname(options.src) + '/emails-found.txt';

log();
logInfo(`Reading ${options.src} ...`);

fs.readFile(untildify(options.src), 'utf8', function (err, contents) {
    if (err) {
        if (err.code === 'ENOENT'){
            return logError(`File not found: "${options.src}"`);
        }
        return logError(err.message);
    }

    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/img;
    let emails = contents.match(regex);

    emails = Array.from(new Set(
        emails.map(e => e.toLowerCase()).filter(e => e).sort()
    ));

    let emailsCount = emails.length;

    if (!emailsCount) {
        logError(`No emails found in ${options.src}!`);
    }

    if (emailsCount) {
        logInfo(`Writing emails to ${options.dest} ...`);

        fs.writeFile(options.dest, emails.join('\n'), function (err) {
            if (err) {
                return console.log(err);
            }

            logSuccess(`Saved ${emailsCount} emails in ${options.dest}`);
        });
    }
});