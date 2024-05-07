# Image Analysis API

The Azure AI Vision - Image Analysis API leverages Azure's Image Analysis service to perform various operations on images, including extracting information, detecting objects, and analyzing visual content.

## Features

- **Image Analysis:** Extract valuable information, detect objects, and gain insights into visual content.

## API Endpoints

### 1. Image Analysis

Analyze an image to retrieve valuable information about its content.

- **Endpoint:** [http://localhost:3000/api/analyzeImage](http://localhost:3000/api/analyzeImage)
- **Method:** GET
- **Headers:**
  - Key: Content-Type, Value: application/json
- **Body Parameters:**
  - Name: imageUrl
  - Description: URL of the image to be analyzed
  - Example: `{ "imageUrl": "https://www.media.io/imagesV3/img-shiyitu1.png" }`

#### Example Request

[Screenshot 1](https://drive.google.com/file/d/1Khs83PFBw5LdgZRz_Bc3xLgWedLo6p4U/view?usp=drive_link)

[Screenshot 2](https://drive.google.com/file/d/1QPDZOfMulsVT8Ep5E7g9L76DLSueq6CZ/view?usp=sharing)

[Screenshot 3](https://drive.google.com/file/d/1BCmE-ow3wPjMTue9SBauPLf7NbamFZUT/view?usp=drive_link)

[POSTMAN Screenshot](https://images.unsplash.com/photo-1681259628150-0127dc5620b8?q=80%26w=2667%26auto=format%26fit=crop%26ixlib=rb-4.0.3%26ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

#### Responses

- **200:** Successful response
- **400:** Invalid image URL provided
- **500:** Internal server error

## Getting Started

### Obtain API Key

Before using the API, obtain an API key from the Azure portal.

### Authentication

Include the API key in the request headers for authentication.

### Usage

Follow these steps to use the Image Analysis API:

1. **Authentication:** Include your API key in the request headers.
2. **Make a Request:** Use the provided endpoint to submit an image for analysis.
3. **Receive Results:** Obtain detailed insights and information about the content of the submitted image.

## License

This project is licensed under the Anjali Chepuri - see the LICENSE.md file for details.
