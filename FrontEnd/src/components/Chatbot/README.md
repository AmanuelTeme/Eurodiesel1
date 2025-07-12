# AbeGarage Customer Support Chatbot

A modern, responsive customer support chatbot integrated into the AbeGarage website to provide instant assistance to customers.

## Features

### 🎯 **Core Functionality**
- **Real-time Chat Interface**: Modern chat UI with smooth animations
- **Multilingual Support**: Full support for English and Italian languages
- **Quick Reply Buttons**: Pre-defined response options for common inquiries
- **Typing Indicators**: Visual feedback when the bot is processing responses
- **Message Timestamps**: Each message shows the time it was sent
- **Auto-scroll**: Automatically scrolls to the latest message

### 🚗 **Automotive-Specific Responses**
The chatbot is specifically trained to handle automotive-related inquiries:

- **Service Information**: Engine repair, brake service, oil changes, tire replacement, maintenance
- **Appointment Scheduling**: Booking information and contact details
- **Pricing & Quotes**: Cost information and quote requests
- **Business Hours**: Operating hours and availability
- **Location & Contact**: Address and contact information
- **Warranty Information**: Service and parts warranty details
- **Emergency Services**: Roadside assistance and urgent repairs

### 🎨 **UI/UX Features**
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern Styling**: Matches the website's color scheme and design language
- **Smooth Animations**: Slide-in effects and hover animations
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Toggle Functionality**: Can be opened/closed with a floating button

### 🌐 **Internationalization**
- **English & Italian**: Complete translation support
- **Dynamic Language Switching**: Responds in the user's selected language
- **Contextual Responses**: All responses are properly translated

## Usage

The chatbot is automatically included on all pages of the website. Users can:

1. **Click the chat button** in the bottom-right corner
2. **Type custom messages** or use quick reply buttons
3. **Get instant responses** to common automotive inquiries
4. **Switch languages** using the language toggle in the header

## Technical Implementation

### Components
- `Chatbot.jsx`: Main chatbot component with all logic
- `Chatbot.css`: Styling and animations
- `index.js`: Export file for easy imports

### Key Features
- **React Hooks**: Uses useState, useEffect, and useRef for state management
- **i18n Integration**: Seamless integration with react-i18next
- **Message Processing**: Intelligent response system based on keywords
- **Responsive Design**: CSS Grid and Flexbox for layout
- **Performance Optimized**: Efficient rendering and minimal re-renders

### Message Processing Logic
The chatbot uses keyword matching to provide relevant responses:
- Service-related keywords → Service information
- Appointment/schedule keywords → Booking information
- Price/cost keywords → Pricing information
- Hours/time keywords → Business hours
- Location/address keywords → Contact information
- Emergency/urgent keywords → Emergency services

## Customization

### Adding New Responses
To add new response patterns, modify the `processUserMessage` function in `Chatbot.jsx`:

```javascript
if (lowerMessage.includes('your-keyword')) {
  response = t('Your custom response message');
}
```

### Styling Changes
Modify `Chatbot.css` to customize:
- Colors and gradients
- Animations and transitions
- Layout and spacing
- Mobile responsiveness

### Language Support
Add new translations to `i18n.js` in both English and Italian sections.

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance
- Lightweight implementation
- Minimal bundle size impact
- Efficient state management
- Optimized animations
- Lazy loading ready 