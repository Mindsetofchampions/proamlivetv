"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Upload, 
  X, 
  Image as ImageIcon,
  File,
  Clock,
  Info
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const categories = [
  "Dance",
  "Sports",
  "DIY",
  "Music",
  "Art",
  "Food",
  "Film",
  "Education",
  "Gaming",
  "Comedy",
  "Science",
  "Technology",
  "Fashion",
  "Travel",
  "Other"
];

export default function UploadPage() {
  const router = useRouter();
  // Dummy user data
  const isSignedIn = true;
  const user = {
    firstName: 'Demo',
    lastName: 'User',
    imageUrl: 'https://avatars.githubusercontent.com/u/1',
  };
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'processing' | 'complete' | 'error'>('idle');
  const [openDialog, setOpenDialog] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  
  // Ensure user is signed in
  if (!isSignedIn) {
    router.push('/sign-in');
    return null;
  }
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Check file size (limit to 1GB for demo purposes)
      if (file.size > 1024 * 1024 * 1024) {
        alert('File is too large. Maximum size is 1GB.');
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('video/')) {
        alert('Please select a video file.');
        return;
      }
      
      setSelectedFile(file);
    }
  };
  
  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file for the thumbnail.');
        return;
      }
      
      setThumbnailFile(file);
      
      // Generate preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = '';
    }
  };
  
  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Simulate upload process
  const handleUpload = () => {
    // Validate form
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    
    if (!selectedFile) {
      alert('Please select a video file');
      return;
    }
    
    if (!category) {
      alert('Please select a category');
      return;
    }
    
    // Start upload simulation
    setUploadState('uploading');
    setUploadProgress(0);
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState('processing');
          
          // Simulate processing time
          setTimeout(() => {
            setUploadState('complete');
            setOpenDialog(true);
          }, 3000);
          
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };
  
  const goToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload New Video</h1>
          <p className="text-muted-foreground">
            Share your content with the PRO AM LIVE TV community
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Video Details</CardTitle>
                <CardDescription>
                  Provide information about your video
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                    <Input
                      id="title"
                      placeholder="Enter an engaging title for your video"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      disabled={uploadState !== 'idle'}
                      maxLength={100}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {title.length}/100
                    </p>
                  </div>
                  
                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your video content, tell viewers what to expect"
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={uploadState !== 'idle'}
                      maxLength={5000}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {description.length}/5000
                    </p>
                  </div>
                  
                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                    <Select 
                      value={category} 
                      onValueChange={setCategory}
                      disabled={uploadState !== 'idle'}
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
                  
                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      placeholder="e.g., dance, tutorial, youth"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      disabled={uploadState !== 'idle'}
                    />
                    <p className="text-xs text-muted-foreground">
                      Add relevant tags to help viewers find your content
                    </p>
                  </div>
                  
                  {/* Thumbnail */}
                  <div className="space-y-2">
                    <Label>Thumbnail Image</Label>
                    <div className="border rounded-md p-4">
                      {thumbnailPreview ? (
                        <div className="relative aspect-video">
                          <img 
                            src={thumbnailPreview} 
                            alt="Thumbnail Preview" 
                            className="w-full h-full object-cover rounded-md"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={removeThumbnail}
                            disabled={uploadState !== 'idle'}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div 
                          className="border-2 border-dashed rounded-md aspect-video flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                          onClick={() => thumbnailInputRef.current?.click()}
                        >
                          <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">Click to upload thumbnail</p>
                          <p className="text-xs text-muted-foreground">
                            16:9 aspect ratio recommended (JPG, PNG)
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        ref={thumbnailInputRef}
                        onChange={handleThumbnailSelect}
                        disabled={uploadState !== 'idle'}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Upload Video</CardTitle>
                <CardDescription>
                  Select and upload your video file
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedFile ? (
                  <div className="border rounded-md p-4">
                    <div className="flex items-start gap-3">
                      <File className="h-8 w-8 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{selectedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      {uploadState === 'idle' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={removeSelectedFile}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium mb-1">Click to upload video</p>
                    <p className="text-xs text-muted-foreground text-center">
                      MP4, MOV, or WebM<br />
                      Up to 1GB (larger for PRO users)
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      accept="video/*"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      disabled={uploadState !== 'idle'}
                    />
                  </div>
                )}
                
                {uploadState !== 'idle' && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>
                        {uploadState === 'uploading' && 'Uploading...'}
                        {uploadState === 'processing' && 'Processing...'}
                        {uploadState === 'complete' && 'Upload Complete!'}
                        {uploadState === 'error' && 'Upload Failed'}
                      </span>
                      {uploadState === 'uploading' && (
                        <span>{uploadProgress}%</span>
                      )}
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
                
                {uploadState === 'idle' && (
                  <Button 
                    className="w-full mt-4" 
                    onClick={handleUpload}
                    disabled={!selectedFile || !title || !category}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Start Upload
                  </Button>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Upload Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex gap-2">
                    <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    <p>Only upload content you created or have permission to use.</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Clock className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    <p>Processing time depends on file size and format. Larger files may take longer.</p>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <p className="font-medium mb-2">Recommended Formats:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Container: MP4</li>
                      <li>Audio Codec: AAC-LC</li>
                      <li>Video Codec: H.264</li>
                      <li>Resolution: 1080p or 720p</li>
                      <li>Frame Rate: 30fps</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Upload Success Dialog */}
        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Upload Successful!</AlertDialogTitle>
              <AlertDialogDescription>
                Your video has been uploaded and is now being processed. It will be available on your dashboard once processing is complete.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Upload Another</AlertDialogCancel>
              <AlertDialogAction onClick={goToDashboard}>Go to Dashboard</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}