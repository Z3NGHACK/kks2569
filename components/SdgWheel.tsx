'use client';

import { useState, useMemo } from 'react';
import { X } from 'lucide-react';

const sdgData = [
  { id: 1, title: 'No Poverty', color: '#E5243B', description: 'End poverty in all its forms everywhere. We contribute by providing fair-wage jobs in recycling and logistics.' },
  { id: 2, title: 'Zero Hunger', color: '#DDA63A', description: 'End hunger, achieve food security and improved nutrition. Our premium fertilizers (KA2-tt, NIB-pt) directly boost crop yields in SE Asia.' },
  { id: 3, title: 'Good Health', color: '#4C9F38', description: 'Ensure healthy lives and promote well-being for all at all ages. Proper recycling reduces toxic pollution.' },
  { id: 4, title: 'Quality Education', color: '#C5192D', description: 'Ensure inclusive and equitable quality education. We provide technical training on machinery and recycling.' },
  { id: 5, title: 'Gender Equality', color: '#FF3A21', description: 'Achieve gender equality and empower all women and girls. We enforce equal pay and opportunities in our operations.' },
  { id: 6, title: 'Clean Water', color: '#26BDE2', description: 'Ensure availability and sustainable management of water. Proper industrial recycling prevents water contamination.' },
  { id: 7, title: 'Clean Energy', color: '#FCC30B', description: 'Ensure access to affordable, reliable, sustainable energy. We optimize logistics and recycle materials to reduce energy footprints.' },
  { id: 8, title: 'Decent Work', color: '#A21942', description: 'Promote sustained, inclusive and sustainable economic growth. We create safe, formal jobs in developing regions.' },
  { id: 9, title: 'Industry & Innovation', color: '#FD6925', description: 'Build resilient infrastructure, promote inclusive industrialization. We supply machinery to build infrastructure in CAM & VN.' },
  { id: 10, title: 'Reduced Inequalities', color: '#DD1367', description: 'Reduce inequality within and among countries. Bridging the resource gap between Japan and SE Asia.' },
  { id: 11, title: 'Sustainable Cities', color: '#FD9D26', description: 'Make cities and human settlements inclusive, safe, resilient. Proper waste management is key to clean cities.' },
  { id: 12, title: 'Responsible Consumption', color: '#BF8B2E', description: 'Ensure sustainable consumption and production patterns. Our core business: turning plastic waste into premium pellets.' },
  { id: 13, title: 'Climate Action', color: '#3F7E44', description: 'Take urgent action to combat climate change. Recycling plastics and metals significantly reduces industrial emissions.' },
  { id: 14, title: 'Life Below Water', color: '#0A97D9', description: 'Conserve and sustainably use the oceans. Reducing plastic waste prevents marine pollution.' },
  { id: 15, title: 'Life on Land', color: '#56C02B', description: 'Protect, restore and promote sustainable use of terrestrial ecosystems. Our organic fertilizers improve soil health naturally.' },
  { id: 16, title: 'Peace & Justice', color: '#00689D', description: 'Promote peaceful and inclusive societies. We operate with transparent, fair-trade business practices.' },
  { id: 17, title: 'Partnerships', color: '#19486A', description: 'Strengthen the means of implementation. Our Japan-SE Asia supply chain is a model for global partnership.' }
];

export default function SdgWheel() {
  const [activeSdg, setActiveSdg] = useState<number | null>(null);

  // Generate random X/Y coordinates and durations ONCE per render
  const bubbleStyles = useMemo(() => {
    return sdgData.map(() => ({
      x: `${Math.random() * 30 - 15}px`,  // Random range: -15px to +15px
      y: `${Math.random() * 30 - 15}px`,  // Random range: -15px to +15px
      duration: `${8 + Math.random() * 6}s` // Random duration: 8s to 14s
    }));
  }, []);

  const handleSdgClick = (id: number) => {
    setActiveSdg(prevId => (prevId === id ? null : id));
  };

  const selectedSdg = activeSdg ? sdgData[activeSdg - 1] : null;

  return (
    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start min-h-[200px]">
      
      {/* BUBBLES AREA */}
      <div className="lg:col-span-3 flex flex-wrap justify-center gap-8 md:gap-8 content-start p-20">
        {sdgData.map((sdg, index) => (
          <button
            key={sdg.id}
            onClick={() => handleSdgClick(sdg.id)}
            className={`
              relative w-16 h-16 md:w-20 md:h-20 
              rounded-full flex items-center justify-center 
              text-white font-bold text-lg md:text-xl 
              shadow-lg cursor-pointer
              transition-all duration-300 ease-out
              animate-drift
              hover:scale-110 hover:shadow-xl hover:z-20
              ${activeSdg === sdg.id ? 'scale-110 ring-4 ring-white shadow-xl z-20' : ''}
            `}
            style={{
              backgroundColor: sdg.color,
              '--x': bubbleStyles[index].x, // Inject random X
              '--y': bubbleStyles[index].y, // Inject random Y
              '--duration': bubbleStyles[index].duration, // Inject random speed
              animationDelay: `${index * 0.3}s`, // Stagger start times
              boxShadow: activeSdg === sdg.id ? `0 0 20px ${sdg.color}` : undefined
            } as React.CSSProperties} // Type assertion for custom properties
            title={sdg.title}
          >
            {sdg.id}
          </button>
        ))}
      </div>

      {/* SLIDE-IN SIDE PANEL */}
      <div className="lg:col-span-2 relative">
        
        {/* Placeholder */}
        <div className={`absolute inset-0 top-32 flex items-center justify-center transition-opacity duration-500 ${activeSdg ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="text-center py-20 px-10 border-2 border-dashed border-gray-300 rounded-2xl bg-white/50 w-full">
            <div className="text-5xl mb-4">🌱</div>
            <p className="text-gray-500 font-medium">Select a goal to see how we contribute</p>
          </div>
        </div>

        {/* Info Card */}
        <div className={`transition-all duration-500 ease-out ${activeSdg ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 absolute inset-0'}`}>
          {selectedSdg && (
            <div 
              className="bg-white rounded-2xl shadow-xl p-8 border-l-8 relative"
              style={{ borderColor: selectedSdg.color }}
            >
              <button 
                onClick={() => setActiveSdg(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center mb-6">
                <span 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 shadow-md"
                  style={{ backgroundColor: selectedSdg.color }}
                >
                  {selectedSdg.id}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                  {selectedSdg.title}
                </h3>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {selectedSdg.description}
              </p>

              <div className="inline-block px-4 py-2 rounded-lg text-sm font-bold text-white" style={{ backgroundColor: selectedSdg.color }}>
                Khmer Kansai Contribution
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}