# File Convert

## Project Overview

File Convert is a versatile web application designed to facilitate the conversion of various file formats swiftly and securely. All conversions are performed locally in the browser, ensuring that your files remain private and secure.

## Key Features

- **Image Conversion**: Seamlessly convert between PNG, JPEG, SVG, and WEBP formats.
- **Document Conversion**: Effortlessly convert PDFs, Excel files, and text documents.
- **User-Friendly Interface**: Drag and drop files or use the file browser to upload, select the desired output format, and convert with a single click.
- **Secure and Private**: All file conversions happen locally in your browser, ensuring your files are never uploaded to a server.

## Live Demo

Explore the live version of the project: [File Convert](https://fileconvert.fatihsevencan.com)

## Screenshots

![File Convert Screenshot 1](https://newsplatformbucket.s3.eu-north-1.amazonaws.com/file_convert_1.png)
![File Convert Screenshot 3](https://newsplatformbucket.s3.eu-north-1.amazonaws.com/file_convert_4.png)
![File Convert Screenshot 3](https://newsplatformbucket.s3.eu-north-1.amazonaws.com/file_convert_5.png)
![File Convert Screenshot 3](https://newsplatformbucket.s3.eu-north-1.amazonaws.com/file_convert_3.png)

## Technologies & Languages Used

- **Frontend**: React, TypeScript, Vite, CSS
- **File Handling**: FileSaver.js
- **Notifications**: React-Toastify
- **Loading Spinner**: React Loader Spinner

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
     git clone https://github.com/FSevencan/FileConvertReact.git
    ```
2. Navigate to the project directory:
    ```sh
    cd FileConvertReact
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

### Running the Application

To start the development server
npm run dev
or
yarn dev

Open your browser and visit `http://localhost:5173` to see the application in action.

## Project Structure

- **src/**: Contains all the source code for the application
  - **components/**: Reusable UI components
  - **services/**: Services for file conversion logic
  - **public/**: Static assets like images and icons
  - **App.tsx**: Main application component
  - **index.tsx**: Entry point for the React application

## Usage

1. Drag and drop your files or click to browse.
2. Select the desired output format from the dropdown menu.
3. Click the "Convert" button to start the conversion.
4. Download the converted files by clicking the "Download" link.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature/your-feature-name
    ```
3. Commit your changes:
    ```sh
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```sh
    git push origin feature/your-feature-name
    ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For questions or feedback, please contact [Fatih Sevencan](https://www.fatihsevencan.com).

Thank you for using File Convert!
