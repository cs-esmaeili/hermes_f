export default function MediaGrid() {

  const galleryData = [
    { id: 1, src: '/assets/images/image1.jpg', caption: 'Nature Scene' },
    { id: 2, src: '/assets/images/image2.jpg', caption: 'Cityscape' },
    { id: 3, src: '/assets/images/image3.jpg', caption: 'Mountains' },
    { id: 4, src: '/assets/images/image4.jpg', caption: 'Beach' },
    { id: 5, src: '/assets/images/image5.jpg', caption: 'Forest' },
    { id: 6, src: '/assets/images/test.webp', caption: 'Forest' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {galleryData.map((image, index) => (
        <div key={index} className="bg-primary rounded-lg p-3 hover:shadow-md transition-shadow">
          <div className="aspect-square bg-gray-200 rounded-lg mb-2">
            <img
              src={image.src}
              alt="placeholder"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
};