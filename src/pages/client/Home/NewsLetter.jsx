import { useState } from 'react';

const ExploreDestinations = () => {
  const [downloadCount, setDownloadCount] = useState(0);
  const guidebookUrl = 'https://drive.google.com/uc?export=download&id=1ExNgZx7GpYjtKbcQQrtyA7Pxb2GslILs';

  const destinations = [
    { 
      name: "Vịnh Hạ Long", 
      mapUrl: "https://www.google.com/maps/place/V%E1%BB%8Bnh+H%E1%BA%A1+Long",
      description: "Di sản thiên nhiên thế giới UNESCO",
      icon: "🏞️"
    },
    { 
      name: "Bãi biển Nha Trang", 
      mapUrl: "https://www.google.com/maps/place/B%C3%A3i+bi%E1%BB%83n+Nha+Trang",
      description: "Bãi biển đẹp với cát trắng trải dài",
      icon: "🏖️"
    },
    { 
      name: "Phố cổ Hội An", 
      mapUrl: "https://www.google.com/maps/place/H%E1%BB%99i+An",
      description: "Phố cổ lãng mạn bên dòng sông Hoài",
      icon: "🏮"
    }
  ];

  const handleDownload = () => {
    window.open(guidebookUrl, '_blank');
    setDownloadCount(prev => prev + 1);
    
    // Gửi event analytics nếu cần
    if (window.gtag) {
      window.gtag('event', 'download', {
        'event_category': 'guidebook',
        'event_label': 'travel_guide'
      });
    }
  };

  return (
    <section className="py-12 bg-blue-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            🏝️ Khám phá điểm đến ấn tượng mỗi mùa
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {destinations.map((item) => (
              <div 
                key={item.name}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 hover:bg-white/20 transition"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-lg text-white mb-2">{item.name}</h3>
                <p className="text-blue-100 text-sm mb-3">{item.description}</p>
                <a
                  href={item.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 font-medium text-sm"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 mr-2" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Xem trên bản đồ
                </a>
              </div>
            ))}
          </div>

          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-white font-medium mb-4">Tải Guidebook Du Lịch Miễn Phí</h3>
            
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-blue-800 font-medium rounded-lg transition flex items-center justify-center mx-auto mb-3"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Tải Xuống Ngay (PDF 5MB)
            </button>
            
            <p className="text-xs text-blue-100 opacity-80">
              Đã được tải xuống {downloadCount}+ lần • Không cần đăng ký
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreDestinations;