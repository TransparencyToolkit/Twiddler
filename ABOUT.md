Twiddler
========

Twiddler is a dead simple text processing tool that runs as a native desktop app and/or a hosted web application. Twiddler provides an intuitive user interface that makes traditionally complicated text and natural language processing actions like analysis, parsing, keyword extraction, and special entities (URLs, emails, etc) from corpuses of text easy for journalists, activists, and other non-programming skilled researchers. Feed Twiddler a text file, directory folder, or URL and then choose various text processing tools to run individually or chained together in a batch.

## Use Cases

**1. Document Analysis**

A journalist or researcher has a folder of numerous PDF documents and would like to better understand what information is contained within these documents without spending days or weeks reading through the documents and taking notes which are then entered into a spreadsheet to keep track of what document contains what information where. Twiddler will make this operation easy by sending individual (or batches) of PDF documents to open source tool [Give Me Text](http://givemetext.okfnlabs.org/) which performs OCR text extraction of the documents. Once completed, Twiddler then analyzes the text content to make sense of what keywords most commonly occur and in the documents.

**2. File System Analysis**

Large data dumps and archives often have lots of files that offer clues as to what content is contained therein. However, the more number of folders and files in a dump, the more time is required to make sense of what exists and how it interrelates. Additionally, when one user browses the files of a data dump, that knowledge stays with them (and only them) unless they painstaking categorize the contents somehow. Twiddler performs this sort of analysis and output a nicely categorized spreadsheet

**3. Webpage Analysis**

Performing text analysis and mining of web content (blog posts, articles, and other documents) involves many steps- most of which are varying degrees of highly technical and/or time consuming- this puts bulk analysis of web content out of reach for non-technical users. Twiddler aims to make this simple- feed it a URL (or a list of URLs) and Twiddler will scrape the text content

**4. Outputting & Integration**

The final step then becomes using the insights Twiddler extracts from a datasource to aid in further research. For example: once a datasets has been analyzed, the user can then output the insights into a simple overview Markdown file, a JSON data object, or as a CSV datapackage. These outputs can then be imported into tools like [LookingGlass](https://github.com/TransparencyToolkit/LookingGlass) or [ArchivePile](https://github.com/TransparencyToolkit/ArchivePile) or viewed in spreadsheet application.

## Features

*Twiddler is under heavy development and things are being implemented in an ad-hoc / as needed basis.*

#### Current Features

- Runs as a command line tool that accepts arguments but requires manually creating project file and specifying text parsing operations
- Implements [text-miner](https://github.com/Planeshifter/text-miner) library to perform many basic natural language processing tasks like stemming, stopword removal, special character & whitespace removal, and term extraction
- Implements [text-scrub](https://github.com/bnvk/text-scrub) library to perform chained text manipulations (trimming start & end, find & replace, regex extraction of emails, urls, and splitting of text) on one or more strings or arrays of text
- Exports categorized lists into JSON, datapackages, and Markdown files

#### Being Developed

- Better support for file system as a datasource
- Intuitive GUI interface that makes configuring custom text processing tools easy and simple.
- Packaged as a desktop app for MacOS, Windows, and Linux
- Will run as a web app served over the internet

#### Planned Features

- Extraction & cleaning of HTML data to plain text
- URL input & screen scraping as a datasource
- Exporters for LookingGlass config files or ArchivePile
- Automated importing / outputting of data with other parts of the TransparencyToolkit data processing pipeline
