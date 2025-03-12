
-- Create storage bucket for avatars if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Set up a policy to allow authenticated users to upload files to their own folder
CREATE POLICY "Users can upload avatars to their own folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND 
  (storage.foldername(name))[1] = 'advertiser-avatars' AND
  (storage.foldername(name))[2] = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- Set up policy to allow authenticated users to update files in their folder
CREATE POLICY "Users can update avatars in their own folder"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND 
  (storage.foldername(name))[1] = 'advertiser-avatars' AND
  (storage.foldername(name))[2] = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- Set up policy to allow public read access to the avatars bucket
CREATE POLICY "Public read access for avatars"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'avatars');
