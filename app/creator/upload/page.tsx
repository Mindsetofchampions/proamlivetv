"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  Upload, 
  X, 
  Image as ImageIcon,
  File,
  Info,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const categories = [
  "Gaming",
  "Music",
  "Education",
  "Sports",
  "Entertainment",
  "News",
  "Technology",
  "Other"
];

export default function UploadPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file size (max 1GB)
      if (file.size > 1024 * 1024 * 1024) {
        setError('File size exceeds 1GB limit');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('video/')) {
        setError('Please select a video file');
        return;
      }
      
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file for thumbnail');
        return;
      }
      
      setThumbnailFile(file);
      
      // Generate preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a video file');
      return;
    }

    if (!title) {
      setError('Please enter a title');
      return;
    }

    if (!category) {
      setError('Please select a category');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // Upload video file
      const videoFileName = `${Date.now()}-${selectedFile.name}`;
      const { data: videoData, error: videoError } = await supabase.storage
        .from('videos')
        .upload(videoFileName, selectedFile, {
          onUploadProgress: (progress) => {
            setUploadProgress((progress.loaded / progress.total) * 100);
          }
        });

      if (videoError) throw videoError;

      // Upload thumbnail if provided
      let thumbnailUrl = null;
      if (thumbnailFile) {
        const thumbnailFileName = `${Date.now()}-${thumbnailFile.name}`;
        const { data: thumbnailData, error: thumbnailError } = await supabase.storage
          .from('thumbnails')
          .upload(thumbnailFileName, thumbnailFile);

        if (thumbnailError) throw thumbnailError;
        thumbnailUrl = supabase.storage.from('thumbnails').getPublicUrl(thumbnailData.path).data.publicUrl;
      }

      // Create video record in database
      const { data: videoRecord, error: dbError } = await supabase
        .from('videos')
        .insert([
          {
            title,
            description,
            category,
            url: supabase.storage.from('videos').getPublicUrl(videoData.path).data.publicUrl,
            thumbnail_url: thumbnailUrl,
            status: 'PENDING_REVIEW',
            visibility: 'PRIVATE'
          }
        ])
        .select()
        .single();

      if (dbError) throw dbError;

      // Redirect to dashboard
      router.push('/creator/dashboard');
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload video. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Upload New Video</h1>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Video Details</CardTitle>
                <CardDescription>
                  Provide information about your video
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter video title"
                    disabled={uploading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your video"
                    disabled={uploading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={category} 
                    onValueChange={setCategory}
                    disabled={uploading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upload Video</CardTitle>
                <CardDescription>
                  Select your video file
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedFile ? (
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <File className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      {!uploading && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedFile(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">Click to upload video</p>
                    <p className="text-xs text-muted-foreground">
                      MP4 or WebM, max 1GB
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleFileSelect}
                      disabled={uploading}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thumbnail</CardTitle>
                <CardDescription>
                  Upload a custom thumbnail
                </CardDescription>
              </CardHeader>
              <CardContent>
                {thumbnailPreview ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="object-cover w-full h-full"
                    />
                    {!uploading && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setThumbnailFile(null);
                          setThumbnailPreview(null);
                          if (thumbnailInputRef.current) {
                            thumbnailInputRef.current.value = '';
                          }
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed rounded-lg aspect-video flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => thumbnailInputRef.current?.click()}
                  >
                    <ImageIcon className="h-8 w-8 mb-4 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">Click to upload thumbnail</p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or GIF
                    </p>
                    <input
                      ref={thumbnailInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleThumbnailSelect}
                      disabled={uploading}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {error && (
              <div className="bg-destructive/10 text-destructive rounded-lg p-4 text-sm">
                {error}
              </div>
            )}

            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Uploading...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            <div className="flex gap-4">
              <Button
                className="flex-1"
                onClick={handleUpload}
                disabled={!selectedFile || !title || !category || uploading}
              >
                {uploading ? 'Uploading...' : 'Upload Video'}
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/creator/dashboard')}
                disabled={uploading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}