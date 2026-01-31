# Contact Form Component

## ContactForm.tsx

This component contains the contact form functionality that was previously in the main page. It's kept here for future use if you want to add the form back.

### Features
- Form validation (required fields, email format)
- Loading states during submission
- Success/error messages
- Form reset after successful submission
- Supabase integration for storing messages

### Usage

To use this component again, import it in your page:

```tsx
import ContactForm from "@/components/ContactForm";

// Then use it in your JSX:
<ContactForm />
```

### Requirements

1. Make sure the `contact_messages` table exists in your Supabase database (see `supabase_migration.sql` in the root directory)
2. Ensure Supabase environment variables are set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`




