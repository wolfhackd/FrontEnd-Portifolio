import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

interface FileUploaderProps {
  width: number;
  height: number;
  image: string;
}

const FileUploader = ({ width = 500, height = 500, image = 'cld-sample' }: FileUploaderProps) => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dgewppn7j' } });

  // Use this sample image or upload your own via the Media Library
  const img = cld
    .image(image)
    .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(width).height(height)); // Transform the image: auto-crop to square aspect_ratio

  return <AdvancedImage cldImg={img} />;
};

export default FileUploader;
