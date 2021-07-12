var express = require('express');
var router = express.Router();
const automl = require('@google-cloud/automl');

const projectId = "?";
const computeRegion = "us-central1";
const modelId = "?";
input = '[{"numberValue": 1}, {"stringValue": "value"}]'
inputs = JSON.parse(input);

// Create client for prediction service.
const automlClient = new automl.v1beta1.PredictionServiceClient();

// Get the full path of the model.`
const modelFullId = automlClient.modelPath(projectId, computeRegion, modelId);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res) {
  console.log(req.body.name);

  // call AI model
  try {
    predict()
  } catch (error) {
    console.log(error.message)
  }

  // additional business rules

  res.render('result', { name: req.body.name });
});

async function predict() {
  // Set the payload by giving the row values.
  const payload = {
    row: {
      values: inputs,
    },
  };

  // Params is additional domain-specific parameters.
  // Currently there is no additional parameters supported.
  const [response] = await automlClient.predict({
    name: modelFullId,
    payload: payload,
    params: {feature_importance: true},
  });
  console.log('Prediction results:');

  for (const result of response.payload) {
    console.log(`Predicted class name: ${result.displayName}`);
    console.log(`Predicted class score: ${result.tables.score}`);

    // Get features of top importance
    const featureList = result.tables.tablesModelColumnInfo.map(
      columnInfo => {
        return {
          importance: columnInfo.featureImportance,
          displayName: columnInfo.columnDisplayName,
        };
      }
    );
    // Sort features by their importance, highest importance first
    featureList.sort((a, b) => {
      return b.importance - a.importance;
    });

    // Print top 10 important features
    console.log('Features of top importance');
    console.log(featureList.slice(0, 10));
  }
}





module.exports = router;
