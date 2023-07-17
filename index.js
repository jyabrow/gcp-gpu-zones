import get from 'axios';
import HtmlTableToJson from 'html-table-to-json';
const gpuZonesUrl = 'https://cloud.google.com/compute/docs/gpus/gpu-regions-zones';

// Get GPU model, output format arguments from command line, or use default
//
let gpuModel = '';
if (process.argv.length >= 3) {
  gpuModel = process.argv[2];
}

let outputFormat = 'table';
if (process.argv.length >= 4) {
  outputFormat = process.argv[3];
}

// Get html text from Google's web page listing of gpu types & locations,
// Parse table from html text, convert to array, filter, and print to console.
//
console.error(`Getting GCP Zones w/${gpuModel} GPUs from ${gpuZonesUrl}`);
get(gpuZonesUrl)
    .then((res) => {
      // console.error(`DEBUG: Status=${res.status}`);
      // console.error('DEBUG: Body=', res.data);
      //
      const jsonTables = new HtmlTableToJson(res.data);
      const jsonTable = jsonTables.results[0];

      let outputTable = [];

      if ( gpuModel == '' ) {
        outputTable = jsonTable;
      } else {
        // Filter table by input GPU model
        for (let idx=0; idx <= jsonTable.length; idx++) {
          const item = jsonTable[idx];
          if ( item === undefined ) {
            continue; // Skip undefined item at end of array (?)
          }
          const gpuPlatformsStr = item['GPU platforms'];
          const gpuPlatforms = gpuPlatformsStr.split(', ');
          if (gpuPlatforms.includes(gpuModel)) {
            item['GPU platforms'] = gpuPlatforms;
            outputTable.push(item);
          }
        }
      }

      if ( outputFormat == 'table') {
        console.table(outputTable, ['Zones', 'Location', 'GPU platforms']);
      } else if (outputFormat == 'json') {
        console.log(outputTable);
      }
    }).catch((err) => {
      console.error(err);
    });
