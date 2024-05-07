
require('dotenv').config({ path: '.env' });
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { ComputerVisionClient } = require('@azure/cognitiveservices-computervision');
const { ApiKeyCredentials } = require('@azure/ms-rest-js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Initialize Express app
const app = express();
const port = 3000;

// Retrieve Azure API endpoint and API key from environment variables
const azureEndpoint = process.env.AZURE_API_ENDPOINT;
const apiKey = process.env.AZURE_API_KEY;

// Log Azure API Endpoint and API Key
console.log('Azure API Endpoint:', azureEndpoint);
console.log('API Key:', apiKey);

// Check if Azure API Endpoint is defined, exit process with error if not
if (!azureEndpoint) {
  console.error('Azure API Endpoint is not defined.');
  process.exit(1);
}

// Define Swagger options for API documentation
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Image Analysis using Azure AI Vision',
      version: '1.0.0',
      description: 'API for analyzing images using Azure Cognitive Services Computer Vision',
      contact: { name: 'Anjali Chepuri', email: 'anjalichepuri11@gmail.com', url: 'https://github.com/achepuri1' },
      license: { name: 'MIT', url: 'https://opensource.org/licenses/MIT' }
    },
    servers: [{ url: `http://174.138.53.190:${port}` }],
  },
  apis: [__filename],
};

// Generate Swagger documentation
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI at /api route
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Create Azure Cognitive Services client for image analysis
const credentials = new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': apiKey } });
const client = new ComputerVisionClient(credentials, azureEndpoint);

// Define route for image analysis
/**
 * @swagger
 * tags:
 *   - name: Image
 *     description: Operations related to image analysis
 *
 * /analyzeImage:
 *   get:
 *     summary: Analyze an image
 *     tags:
 *       - Image
 *     parameters:
 *       - in: query
 *         name: imageUrl
 *         schema:
 *           type: string
 *         required: true
 *         description: URL of the image to analyze
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Invalid image URL provided
 *       500:
 *         description: Internal server error
 */
app.get('/analyzeImage', async (req, res) => {
  try {
    // Get image URL from query parameter or set default value
    const imageUrl = req.query.imageUrl || 'DIRECT_IMAGE_URL';

    // Validate image URL
    if (!imageUrl || imageUrl === 'DIRECT_IMAGE_URL') {
      return res.status(400).json({ error: 'Invalid image URL provided.' });
    }

    // Define supported visual features for image analysis
    const supportedFeatures = ['ImageType', 'Categories', 'Tags', 'Description', 'Objects', 'Faces', 'Color', 'Brands'];

    // Analyze image using Azure Cognitive Services Computer Vision
    const result = await client.analyzeImage(imageUrl, { visualFeatures: supportedFeatures });

    // Return analysis result as JSON response
    res.json({ result });
  } catch (error) {
    // Handle errors during image analysis
    let errorMessage = '';

    // Check specific error codes and handle accordingly
    if (error.code === 'RequestTimeout') {
      errorMessage = 'Error analyzing image: Request timed out. Please try again later.';
      return res.status(504).json({ error: errorMessage });
    } else if (error.code === 'ResourceNotFound') {
      errorMessage = 'Error analyzing image: Resource not found. Please check the image URL.';
      return res.status(404).json({ error: errorMessage });
    } else if (error.code === 'BadRequest') {
      errorMessage = 'Error analyzing image: Bad request. Please check the request parameters.';
      return res.status(400).json({ error: errorMessage });
    }

    // If no specific error code matches, handle generic error
    errorMessage = `Error analyzing image: ${error.message}`;
    res.status(500).json({ error: errorMessage });
  }
});

// Handle invalid routes with 404 error
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Handle general errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://174.138.53.190:${port}`);
});
