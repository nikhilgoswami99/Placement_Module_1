# Weather App

A React-based weather app that fetches and displays weather details (temperature, pressure, description, and data age) for a predefined list of cities. Users can fetch weather data, edit descriptions, search for cities, and delete entries. The app is fully responsive and works well on desktop and mobile devices.

---

## Features

- Fetch weather data for a list of cities: London, New York, Los Angeles, Las Vegas.
- Display city weather details: description, temperature (°C), pressure (hPa), and data age (in hours).
- Edit weather descriptions inline.
- Search cities by name with highlight on the results.
- Delete city weather details from the list.
- Responsive design for desktop, tablet, and mobile screens.

---

## Demo

https://placement-module-1-m66r-nikhil-goswamis-projects.vercel.app/

---

### Sidebar & Fetch Button
![Sidebar and Fetch Button](./src/assets/Screenshot%20(272).png)

### Weather Details Table & Search
![Weather Details Table and Search](./src/assets/Screenshot%20(273).png)


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app


## Usage

Click Get Weather to fetch weather info for the next city in the list.

Click on any city in the sidebar to select it (highlighted with green border).

Use the search input to find a city in the fetched details list; found city rows highlight in yellow.

Edit the weather description directly in the table input fields.

Use the Delete button to remove a city from the weather details list.


## Folder Structure

weather-app/
├── public/
├── src/
│   ├── App.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md

