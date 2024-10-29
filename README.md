--- Run on EXPO GO ---

Get API Key:
1. Navigate to www.weatherapi.com
2. Create an account and locate API key at dashboard (https://www.weatherapi.com/my/)
3. This is YOUR_API_KEY

Run app:
1. Clone repository
2. Edit /api/weather.js
3. Comment out line 2 (import { API_KEY } from "@env";)
4. Add line at top of code:
  let API_KEY="YOUR_API_KEY"
5. In the terminal, run 'npx expo start -c'
6. Open Expo Go app and scan QR code - ensure you are on the same connection
