const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const SHEET_ID = '1XzYod_cV1ZL2A_EG57J8KCJqjyP8kjiU1Biu6n47MVc';
  const SHEETS = ['home', 'mass_times', 'parish_groups'];

  const getSheetData = async (sheetName) => {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
    const res = await fetch(url);
    const text = await res.text();
    const json = JSON.parse(text.substr(47).slice(0, -2));

    const cols = json.table.cols.map(col => col.label.toLowerCase());
    const rows = json.table.rows.map(row => {
      let obj = {};
      row.c.forEach((cell, i) => {
        obj[cols[i]] = cell ? cell.v : null;
      });
      return obj;
    });
    return rows;
  };

  try {
    const data = {};
    for (const sheet of SHEETS) {
      data[sheet] = await getSheetData(sheet);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
