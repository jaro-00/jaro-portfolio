# Contact Form Setup Guide

The contact form is now fully functional! Follow these steps to complete the setup:

## Step 1: Create the Database Table

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase_migration.sql`
4. Click **Run** to create the `contact_messages` table

## Step 2: Verify Environment Variables

Make sure your `.env.local` file (or environment variables) contains:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 3: Test the Form

1. Start your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your Supabase dashboard → Table Editor → `contact_messages` to see the submission

## Features

✅ Form validation (required fields, email format)
✅ Loading states during submission
✅ Success/error messages
✅ Form reset after successful submission
✅ Disabled state during submission to prevent double-submission
✅ Responsive design with dark mode support

## Optional: Row Level Security (RLS)

If you want to add security policies, uncomment the RLS sections in `supabase_migration.sql`. This will:
- Allow anonymous users to insert messages (for the contact form)
- Restrict reading messages to authenticated users only

## Troubleshooting

**Form not submitting?**
- Check browser console for errors
- Verify Supabase credentials are correct
- Ensure the `contact_messages` table exists in your database

**Getting permission errors?**
- You may need to enable RLS policies (see Optional section above)
- Or disable RLS temporarily for testing: `ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;`

