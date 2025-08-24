const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

async function convertH5ToJSON(inputH5FilePath: any, outputJsonFilePath: any) {
  const model = await tf.loadLayersModel(`file://${inputH5FilePath}`);
  const jsonModel = model.toJSON();
  const jsonStr = JSON.stringify(jsonModel, null, 2);

  fs.writeFileSync(outputJsonFilePath, jsonStr);

  
  return outputJsonFilePath;
}
