# GCP GPU Query tool

## Introduction

This repo contains a query tool to get information about GCP GPU's, specifically
which availability zones contain which GPU models.  This info is not available
from any known programmatic source, query, api, or command-line tool (as of when
this was written, circa Fall 2022). The GPU zone information is available from
a public Google http document, as a formatted text table. This tool converts the
document table into a data structure, filters it if requested, and prints it out
as a text table, or json.

The tool is implemented as a Node.js module, using the npm html-table-to-json
library module to extract the table data and convert it to json:

https://www.npmjs.com/package/html-table-to-json

This has been tested on macOS & Windows (using GitForWindows gitbash).

## Prerequisites

* npm - https://nodejs.org/en/download

## Scripts, Files

* `gpuzones.sh - ` Wrapper script to launch
* `index.js    - ` Main Node.js script module

## Setup

Run the following to install Node.js libraries

`npm install`

## Run

Simply open a terminal in this directory, and execute the bash script:

`./gpuzones.sh --help`
`./gpuzones.sh T4`
`./gpuzones.sh K80 -o json`