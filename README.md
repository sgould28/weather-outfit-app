# Weather-Based Outfit Picker

A web application that recommends personalized outfits based on real-time weather data and user style preferences.

## Features

- **Weather Integration**: Fetches current weather data using the OpenWeather API
- **Style Customization**: Choose from three aesthetics: cute, edgy, or casual
- **Temperature Adaptation**: Outfit recommendations adjust based on temperature (Celsius or Fahrenheit)
- **Weather-Appropriate Clothing**: Considers rain and temperature to suggest suitable clothing
- **Visual Outfit Display**: Shows outfit images and descriptions

## Functionality

The application works by:

1. **User Input**: Enter a city name, select temperature units (°C/°F), and choose an aesthetic style
2. **Weather Fetching**: Retrieves current weather data including temperature and precipitation
3. **Outfit Selection**: Filters a database of clothing items based on:
   - **Temperature**: Uses warmth levels (1-10 scale) to match clothing to weather
     - Hot weather (>25°C/77°F): Selects light clothing (warmth level ≤4)
     - Cold weather (<10°C/50°F): Selects warm clothing (warmth level ≥7)
     - Moderate weather: All clothing options available
   - **Style**: Matches clothing to selected aesthetic (cute, edgy, casual)
   - **Weather Conditions**: Prioritizes waterproof clothing when rain is detected
4. **Outfit Generation**: Randomly selects one top, one bottom, and one pair of shoes from filtered options
5. **Display**: Shows the recommended outfit with images and weather information

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express.js
- **Database**: SQLite with clothing inventory
- **API**: OpenWeather API for weather data

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- OpenWeather API key (free tier available at https://openweathermap.org/api)

## Installation and Setup

1. **Clone or download the project**:
   ```bash
   git clone <repository-url>
   cd weather_app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory
   - Add your OpenWeather API key:
     ```
     OPENWEATHER_KEY=your_api_key_here
     ```
   - Get your free API key from [OpenWeather](https://openweathermap.org/api)

4. **Start the application**:
   ```bash
   npm start
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## Usage

1. Enter a city name in the input field
2. Select your preferred temperature units (Celsius or Fahrenheit)
3. Choose an aesthetic style (cute, edgy, or casual)
4. Click "Get Outfit" to receive a personalized recommendation
5. The app will display the current weather and a suggested outfit with images

## Project Structure

```
weather_app/
├── server/
│   ├── server.js          # Express server and API endpoints
│   ├── db.js              # SQLite database setup and clothing data
│   └── outfitLogic.js     # Outfit selection algorithm
├── public/
│   ├── index.html         # Main HTML page
│   ├── style.css          # CSS styling
│   ├── app.js             # Frontend JavaScript
│   └── images/            # Clothing item images
├── package.json           # Dependencies and scripts
├── README.md              # This file
└── .env                   # Environment variables (API key)
```

## API Endpoints

- `GET /outfit?city=<city>&aesthetic=<style>&units=<metric|imperial>` - Returns outfit recommendation
- Static files served from `/public` directory

## Customization

- **Add Clothing**: Edit the `defaultClothes` array in `server/db.js` to add new items
- **Modify Logic**: Update temperature thresholds or selection criteria in `server/outfitLogic.js`
- **Styling**: Customize appearance in `public/style.css`

## Troubleshooting

- **"Missing OpenWeather API key"**: Ensure your `.env` file contains a valid `OPENWEATHER_KEY`
- **Weather data errors**: Check your API key is active and has sufficient quota
- **No outfits displayed**: Verify the SQLite database is properly initialized with clothing data 

