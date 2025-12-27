```markdown
# Facebook Profile & Page Fetcher

A simple, standalone web application that demonstrates direct use of the **Facebook Graph API** to fetch and display:

- Your own personal Facebook profile (name, ID, email, profile picture)
- Basic information about Facebook Pages you have access to (name, ID, category, picture)

Built purely with HTML, CSS, and vanilla JavaScript — no frameworks, no build tools.

**Important**: This project is intended for **personal/educational use only**. It uses a hardcoded long-lived access token with limited permissions.

## Features

- Fetch your own Facebook profile with one click
- Select and fetch information from predefined Pages you manage or have access to
- Responsive card-based display with profile picture
- Dark/Light mode toggle (persisted via `localStorage` and respects system preference)
- Loading indicator and error handling
- Clean, modern UI inspired by Facebook's design language
- Fully client-side — runs entirely in the browser

## Preview

![Screenshot of the app in light mode](https://via.placeholder.com/800x450?text=Light+Mode+Preview)  
![Screenshot of the app in dark mode](https://via.placeholder.com/800x450?text=Dark+Mode+Preview)

*(Add actual screenshots later if desired)*

## How It Works

The app uses the **Facebook Graph API v24.0**:

- `/me` endpoint → retrieves the authenticated user's profile
- `/{page-id}` endpoint → retrieves public/basic info about a Page (requires appropriate token permissions)

The access token is embedded directly in `script.js` (intentionally visible for educational purposes).

### Required Token Permissions
The token must have at least:
- `public_profile`
- `email` (optional, for showing email)
- `pages_read_engagement` or `pages_manage_metadata` (to access Page data)

## Setup & Usage

### 1. Get a Long-Lived Access Token

1. Go to: https://developers.facebook.com/tools/explorer/
2. Select your app (or create a test app)
3. Add the required permissions (`public_profile`, `email`, optionally Page-related permissions)
4. Generate a **User Access Token**
5. Extend it to a long-lived token using the Graph API Explorer or via backend exchange (valid up to 60 days)

### 2. Insert Your Token

Open `script.js` and replace the placeholder token:

```js
const ACCESS_TOKEN = 'YOUR_LONG_LIVED_TOKEN_HERE';
```

### 3. Add Your Pages (Optional)

In `index.html`, update the `<select>` options with Page IDs you want to query:

```html
<option value="YOUR_PAGE_ID_1">My Awesome Page</option>
<option value="YOUR_PAGE_ID_2">Another Page</option>
```

### 4. Open the App

Simply open `index.html` in any modern browser. No server required (CORS is not an issue because Graph API allows token-based requests from client-side when permissions are correct).

## Security Notes

- **Never use this in production** or share the token publicly.
- The token is visible in source code — treat it like a password.
- For real applications, always proxy Graph API requests through a backend server.
- Revoke the token via Facebook settings when no longer needed.

## Files

- `index.html` – Main structure and layout
- `style.css` – Responsive styling with dark mode support
- `script.js` – All logic: API calls, UI updates, theme handling

## License

MIT License

Feel free to fork, modify, and learn from this example.


Made for learning purposes • Uses Meta Graph API
