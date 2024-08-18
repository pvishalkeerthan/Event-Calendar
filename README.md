# Event Calendar Application

Welcome to the Event Calendar Application! This React-based app allows users to view, add, edit, and delete events on a calendar. The application includes a calendar view, event details, and management functionalities, all integrated with local storage for data persistence.

## Features

- **Interactive Calendar:** Navigate through months and years to view and select specific dates.
- **Event Management:** Add, edit, and delete events with details such as title, description, category, and importance.
- **Event Filtering:** Filter events by category and priority.
- **Event Details:** View detailed information about each event.
- **Local Storage Integration:** Events are stored in local storage, ensuring data persists across sessions.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **date-fns**: Library for date manipulation.
- **React Bootstrap**: UI components library.
- **Styled Components**: CSS-in-JS for styling components.
## Run Locally

Clone the project

```bash
  git clone "https://github.com/pvishalkeerthan/Event-Calendar.git" ./
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

##### Open your browser and visit http://localhost:3000 to view the application.

## Usage

### Home Page

- **Calendar View:** Navigate through the calendar using the month and year dropdowns. Click on any date to view or manage events for that day.
- **Add Event:** Click on the "Add Event" button to open a modal for adding new events.
- **Delete Events:** Click on "Delete All Events for This Day" to remove all events for the selected date.

### Event Management

- **Edit Event:** Click "Edit" on an event in the details modal to modify existing events.
- **Delete Event:** Click "Delete" to remove a specific event.

### Event Details

- **View Details:** Click on an event title to see detailed information about the event, including date, importance, and description.

## Components

- **Kalendar:** Displays the calendar and handles event interactions.
- **EventForm:** Modal form for adding and editing events.
- **EventList:** List of events with delete functionality.
- **EventModal:** Modal for viewing and managing individual events.
- **EventContext:** Context provider for event data and management functions.
- **EventDetails:** Page for viewing detailed event information.
- **Home:** Main page that integrates the calendar and provides overall layout.
- **App:** Main application container with routing and footer integration.

## Styling

The application uses a combination of `global.css` and styled components to provide a cohesive and modern look. Custom styles for specific components are located in their respective CSS or styled-component files.
