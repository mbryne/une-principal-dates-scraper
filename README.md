# UNE Principal Dates Web Scraper

This script uses Puppeteer, a headless browser, to scrape and extract data from a web page containing UNE principal dates. It then converts the date format and saves the data to a CSV file.

## Description

Have you ever needed to gather important dates from a website? This script automates the process for you! It visits a specific web page, navigates through tables, and extracts essential information such as the day, date, and event. It's a handy tool for anyone who needs to compile data from web pages without manual effort.

## Getting Started

To use this script, you'll need Node.js and a few npm packages. Please follow the installation instructions in the script's comments.

## Usage

* Run `npm install`
* Run `npm run start -- principal_dates_url output_filename`

```bash
npm run start -- https://www.une.edu.au/about-une/principal-dates principal-dates-2023.csv
npm run start -- https://www.une.edu.au/about-une/principal-dates/principal-dates-2024 principal-dates-2024.csv
npm run start -- https://www.une.edu.au/about-une/principal-dates/principal-dates-2025 principal-dates-2025.csv
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [ChatGPT](https://chat.openai.com/share/901fdf45-424b-4543-92ce-d73051ee6ffd)
- [Puppeteer](https://pptr.dev/): The headless browser automation library used in this script.
- [csv-writer](https://www.npmjs.com/package/csv-writer): A simple CSV writer library for Node.js.

Happy web scraping!

