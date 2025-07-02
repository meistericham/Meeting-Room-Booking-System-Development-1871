# Meeting Room Booking System

A comprehensive, modern meeting room booking system built with React, Supabase, and AI-powered automation.

## Features

### 🔐 Authentication & Security
- Secure user registration and login
- Role-based access control (User, Admin, Super Admin)
- Email verification and password reset

### 📅 Booking Management
- **User Features:**
  - Easy room booking with real-time availability
  - View personal booking history
  - Email/WhatsApp notifications
  - Mobile-friendly interface

- **Admin Features:**
  - Approve/reject booking requests
  - View all bookings and manage conflicts
  - Send notifications to users
  - Add comments to bookings

- **Super Admin Features:**
  - User management and role assignment
  - System settings and configuration
  - Analytics and reporting

### 🏢 Room Management
Available rooms:
- Baruk
- Keliring
- Mulu
- Rajang
- Santubong
- Niah
- Gading

### 📱 Public Schedule
- Monthly calendar view (Google Calendar style)
- Shows approved and cancelled meetings
- No login required for viewing
- Mobile responsive design

### 🤖 AI-Powered Features
- Booking trend analysis
- Peak usage time predictions
- Optimal meeting slot suggestions
- Smart conflict resolution recommendations

### 🔗 Integrations
- **Google Calendar:** Auto-sync approved bookings
- **Email Notifications:** Booking confirmations and reminders
- **WhatsApp Integration:** Real-time notifications
- **Supabase Backend:** Secure data storage and real-time updates

## Technology Stack

- **Frontend:** React 18, Tailwind CSS, Framer Motion
- **Backend:** Supabase (PostgreSQL, Auth, Real-time)
- **State Management:** Zustand
- **Forms:** React Hook Form
- **Routing:** React Router DOM
- **Icons:** React Icons
- **Notifications:** React Hot Toast
- **Calendar:** Date-fns, React Calendar

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Supabase account
- Google Calendar API credentials (optional)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd meeting-room-booking-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   - Supabase URL and API key
   - Google Calendar credentials (optional)
   - WhatsApp API key (optional)
   - Email service credentials (optional)

4. **Database Setup:**
   
   Run the following SQL in your Supabase SQL editor:

   ```sql
   -- Create profiles table
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users(id) PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     full_name TEXT NOT NULL,
     division TEXT NOT NULL,
     phone TEXT,
     role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create rooms table
   CREATE TABLE rooms (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT UNIQUE NOT NULL,
     capacity INTEGER NOT NULL,
     equipment TEXT[],
     description TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create bookings table
   CREATE TABLE bookings (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) NOT NULL,
     room_id UUID REFERENCES rooms(id) NOT NULL,
     title TEXT NOT NULL,
     purpose TEXT,
     date DATE NOT NULL,
     start_time TIME NOT NULL,
     end_time TIME NOT NULL,
     duration INTEGER NOT NULL,
     number_of_pax INTEGER NOT NULL,
     officer_in_charge TEXT NOT NULL,
     division TEXT NOT NULL,
     equipment_needed TEXT,
     contact_email TEXT NOT NULL,
     contact_phone TEXT NOT NULL,
     status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'cancelled')),
     admin_comments TEXT,
     google_calendar_event_id TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create equipment table
   CREATE TABLE equipment (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT UNIQUE NOT NULL,
     description TEXT,
     available BOOLEAN DEFAULT true,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create notifications table
   CREATE TABLE notifications (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) NOT NULL,
     booking_id UUID REFERENCES bookings(id),
     type TEXT NOT NULL,
     title TEXT NOT NULL,
     message TEXT NOT NULL,
     read BOOLEAN DEFAULT false,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Insert sample rooms
   INSERT INTO rooms (name, capacity, equipment, description) VALUES
   ('Baruk', 8, ARRAY['Projector', 'Whiteboard', 'Video Conference'], 'Medium meeting room'),
   ('Keliring', 12, ARRAY['Projector', 'Whiteboard', 'Audio System'], 'Large meeting room'),
   ('Mulu', 6, ARRAY['TV Screen', 'Whiteboard'], 'Small meeting room'),
   ('Rajang', 15, ARRAY['Projector', 'Audio System', 'Video Conference'], 'Conference room'),
   ('Santubong', 10, ARRAY['Projector', 'Whiteboard'], 'Training room'),
   ('Niah', 4, ARRAY['TV Screen'], 'Small discussion room'),
   ('Gading', 20, ARRAY['Projector', 'Audio System', 'Stage'], 'Presentation hall');

   -- Insert sample equipment
   INSERT INTO equipment (name, description) VALUES
   ('Projector', 'HD projector with HDMI connection'),
   ('Whiteboard', 'Large whiteboard with markers'),
   ('Video Conference', 'Video conferencing system'),
   ('Audio System', 'Sound system with microphones'),
   ('TV Screen', 'Large TV screen for presentations'),
   ('Flipchart', 'Flipchart stand with paper'),
   ('Laptop', 'Presentation laptop');

   -- Enable Row Level Security
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
   ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

   -- Create policies
   -- Profiles policies
   CREATE POLICY "Users can view own profile" ON profiles
     FOR SELECT USING (auth.uid() = id);
   
   CREATE POLICY "Users can update own profile" ON profiles
     FOR UPDATE USING (auth.uid() = id);

   -- Bookings policies
   CREATE POLICY "Users can view own bookings" ON bookings
     FOR SELECT USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can create bookings" ON bookings
     FOR INSERT WITH CHECK (auth.uid() = user_id);
   
   CREATE POLICY "Users can update own bookings" ON bookings
     FOR UPDATE USING (auth.uid() = user_id);

   -- Admin policies (you'll need to set up admin roles)
   CREATE POLICY "Admins can view all bookings" ON bookings
     FOR SELECT USING (
       EXISTS (
         SELECT 1 FROM profiles 
         WHERE id = auth.uid() 
         AND role IN ('admin', 'super_admin')
       )
     );

   -- Public policies for rooms and equipment
   CREATE POLICY "Anyone can view rooms" ON rooms FOR SELECT USING (true);
   CREATE POLICY "Anyone can view equipment" ON equipment FOR SELECT USING (true);
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## Usage

### For Users
1. **Sign Up:** Create an account with your email and division
2. **Book a Room:** Select date, time, room, and fill in meeting details
3. **Track Status:** Monitor your booking status in the dashboard
4. **Get Notifications:** Receive email/WhatsApp updates on booking status

### For Admins
1. **Review Requests:** View all pending booking requests
2. **Approve/Reject:** Make decisions with optional comments
3. **Manage Conflicts:** Use real-time availability checking
4. **Send Notifications:** Communicate with users about their bookings

### For Super Admins
1. **User Management:** Create admin accounts and manage roles
2. **System Settings:** Configure integrations and system parameters
3. **Analytics:** View booking trends and usage statistics
4. **Data Management:** Oversee all system data and integrations

## API Integration

### Google Calendar
To enable Google Calendar integration:
1. Create a Google Cloud project
2. Enable the Calendar API
3. Create credentials (OAuth 2.0)
4. Add credentials to your `.env` file

### Email Notifications
Supported email services:
- SendGrid
- Mailgun
- AWS SES
- Custom SMTP

### WhatsApp Integration
Use WhatsApp Business API or services like:
- Twilio WhatsApp API
- WhatsApp Cloud API
- Custom WhatsApp solutions

## Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist folder to Netlify
```

### Custom Server
```bash
npm run build
# Serve the dist folder with your preferred server
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Integration with Microsoft Teams
- [ ] Automated room setup reminders
- [ ] Voice booking with AI assistant
- [ ] Advanced reporting features
- [ ] Multi-language support
- [ ] Dark mode theme