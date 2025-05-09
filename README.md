
# Supabase Authentication

A basic login page made with react which supports Authentication postgre & Google account.


## Features

- Login with postgree
- Dhasboard




## Run Locally

Clone the project

```bash
  git clone https://github.com/NinadVyas/AuthFirebase.git
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Setup Backend Express

Buat Proyek Baru

```bash
mkdir server
cd server
npm init -y
```

Install dependencies

```bash
npm install express cors dotenv @supabase/supabase-js
npm install nodemon --save-dev
```
Update package.json 

```bash
 "scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```
Start the server

```bash
  npm run dev
```
## Setup Database di Supabase

Buka SQL Editor di dashboard Supabase dan jalankan

```bash
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  nama TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Trigger untuk mengupdate kolom updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

Setup RLS (Row Level Security)

Aktifkan RLS untuk tabel profiles
Tambahkan policy berikut:

```bash
sql-- Policy untuk membaca profil sendiri
CREATE POLICY "Users can view their own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

-- Policy untuk mengupdate profil sendiri
CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);
```

## Tech Stack

**Client:** React, JavaScript, Chakra UI, Exoress, 0Auth2

**Authentication** Supabase
