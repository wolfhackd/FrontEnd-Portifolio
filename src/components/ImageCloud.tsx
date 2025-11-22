import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

interface FileUploaderProps {
  image: string;
}

// Link: https://console.cloudinary.com/app/c-a41d302f087ebad5a84ca598304bbf/assets/media_library/folders/cd4df9897709208e5ec4ab1eb71071fa13?view_mode=mosaic

export const ImageCloud = ({ image = 'cld-sample' }: FileUploaderProps) => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dgewppn7j' } });

  // Use this sample image or upload your own via the Media Library
  const img = cld
    .image(image)
    .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality('auto');
  // .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

  return <AdvancedImage cldImg={img} className="w-full h-full object-cover object-center" />;
};
