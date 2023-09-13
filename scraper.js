const puppeteer = require('puppeteer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Get URL and filename from command line arguments or use default values
const args = process.argv.slice(2);
const url = args[0] || 'https://www.une.edu.au/about-une/principal-dates';
const filename = args[1] || 'principal-dates.csv';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(() => {
    const tables = Array.from(document.querySelectorAll('table.dataTable'));
    const extractedData = [];

    // Function to convert date format inline
    function convertDateFormat(inputDate) {
      const parts = inputDate.split(' ');
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];

      const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
      ];
      const monthIndex = months.indexOf(month) + 1;
      return `${year}/${monthIndex.toString().padStart(2, '0')}/${day.padStart(2, '0')}`;
    }

    tables.forEach((table) => {
      const rows = Array.from(table.querySelectorAll('tbody tr'));

      rows.forEach((row, rowIndex) => {
        const columns = Array.from(row.querySelectorAll('td'));

        if (columns.length >= 3) {
          const day = columns[0].querySelector('span > p, span').textContent.trim();
          const date = convertDateFormat(columns[1].querySelector('span > p, span').textContent.trim());
          const event = columns[2].querySelector('span > p, span').textContent.trim();

          extractedData.push({ day, date, event });
        } else {
          console.error(`Error in row ${rowIndex}: Insufficient columns`);
        }
      });
    });

    return extractedData;
  });

  await browser.close();

  // CSV file creation
  const csvWriter = createCsvWriter({
    path: filename,
    header: [
      { id: 'day', title: 'day' },
      { id: 'date', title: 'date' },
      { id: 'event', title: 'event' },
    ],
  });

  csvWriter.writeRecords(data).then(() => {
    console.log(`Data has been scraped and saved to ${filename}`);
  });
})();