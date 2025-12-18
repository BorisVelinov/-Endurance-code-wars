import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

interface LogEntry {
  id: string;
  date: string;
  author: string;
  content: string;
  timestamp: number;
}

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  date: string;
}

// Initial gallery data from existing images
const initialGallery: GalleryImage[] = [
  { id: '1', url: '/images/download.jpg', caption: 'Endurance в орбита около Гаргантюа', date: '2025-12-14' },
  { id: '2', url: '/images/Cooper1.png', caption: 'Командир Купър преди навлизане в червеевата дупка', date: '2025-11-20' },
  { id: '3', url: '/images/Amelia.png', caption: 'Д-р Бранд анализира данните от Милър', date: '2025-12-05' },
  { id: '4', url: '/images/CASE.png', caption: 'CASE в режим на готовност', date: '2025-10-15' },
];

export const MissionLog: React.FC = () => {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [author, setAuthor] = useState('Купър');
  const [activeTab, setActiveTab] = useState<'diary' | 'gallery'>('diary');

  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('mission_logs');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    } else {
      // Default initial entry
      const initialEntry: LogEntry = {
        id: 'init-1',
        date: new Date().toLocaleDateString('bg-BG'),
        author: 'Купър',
        content: 'Системите са стабилни. Навлизаме в орбита около червеевата дупка. Екипажът е в бойна готовност.',
        timestamp: Date.now()
      };
      setEntries([initialEntry]);
    }
  }, []);

  const handleAddEntry = () => {
    if (!newEntry.trim()) return;

    const entry: LogEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('bg-BG'),
      author: author,
      content: newEntry,
      timestamp: Date.now()
    };

    const updatedEntries = [entry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('mission_logs', JSON.stringify(updatedEntries));
    setNewEntry('');
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1 border border-orange-500/30 rounded-full mb-4 bg-orange-500/5">
            <span className="text-orange-500 font-orbitron text-[10px] tracking-[0.4em] uppercase">MISSION.ARCHIVE_v0.8</span>
          </div>
          <h1 className="text-5xl font-orbitron font-bold mb-4 text-white">
            Дневник на Мисията
          </h1>
          <div className="subtitle-readout">
            Chronological Log & Visual Data Archive :: Endurance Log
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <Button 
            variant={activeTab === 'diary' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('diary')}
            className="w-48"
          >
            📋 Бордови Дневник
          </Button>
          <Button 
            variant={activeTab === 'gallery' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('gallery')}
            className="w-48"
          >
            📸 Фото Архив
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'diary' ? (
            <motion.div
              key="diary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* New Entry Form */}
              <Card className="mb-8 border-hologram-green/30">
                <h3 className="text-xl font-orbitron font-bold mb-4 text-hologram-green">Добави Запис</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <select 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)}
                    className="bg-black/50 border border-hologram-green/30 rounded p-2 text-white font-rajdhani md:col-span-1 focus:border-hologram-green outline-none"
                  >
                    <option value="Купър">Купър</option>
                    <option value="Бранд">Бранд</option>
                    <option value="Ромили">Ромили</option>
                    <option value="Доил">Доил</option>
                    <option value="TARS">TARS</option>
                    <option value="CASE">CASE</option>
                  </select>
                  <input 
                    type="text" 
                    value={new Date().toLocaleDateString('bg-BG')} 
                    disabled 
                    className="bg-black/30 border border-gray-700/30 rounded p-2 text-gray-400 font-rajdhani md:col-span-1"
                  />
                </div>
                <textarea
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                  placeholder="Въведете запис за деня..."
                  className="w-full h-32 bg-black/50 border border-hologram-green/30 rounded p-4 text-white font-rajdhani focus:border-hologram-green outline-none mb-4 resize-none"
                />
                <div className="flex justify-end">
                  <Button onClick={handleAddEntry} variant="secondary">Запиши в Лога</Button>
                </div>
              </Card>

              {/* Entries List */}
              <div className="space-y-6">
                {entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    layout
                  >
                    <div className="glass-card p-6 border-l-4 border-l-hologram-green relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-6xl">📝</span>
                      </div>
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-hologram-green/20 flex items-center justify-center border border-hologram-green">
                            <span className="font-bold text-hologram-green">{entry.author[0]}</span>
                          </div>
                          <div>
                            <h4 className="font-orbitron font-bold text-white">{entry.author}</h4>
                            <p className="text-xs text-hologram-green/70 font-mono">ОФИЦЕР</p>
                          </div>
                        </div>
                        <span className="font-mono text-gray-400 text-sm">{entry.date}</span>
                      </div>
                      <p className="text-gray-200 font-rajdhani text-lg leading-relaxed relative z-10 whitespace-pre-wrap">
                        {entry.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {initialGallery.map((img) => (
                <motion.div
                  key={img.id}
                  layoutId={img.id}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                >
                  <Card className="h-full p-0 overflow-hidden group border-purple-accent/30 hover:border-purple-accent/80 transition-colors">
                    <div className="aspect-video relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-space-dark to-transparent opacity-60 z-10" />
                      <img 
                        src={img.url} 
                        alt={img.caption} 
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2 z-20 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-mono text-purple-accent border border-purple-accent/30">
                        IMG_{img.id.padStart(4, '0')}
                      </div>
                    </div>
                    <div className="p-4">
                       <p className="text-xs text-purple-accent mb-1 font-mono">{img.date}</p>
                       <p className="text-white font-rajdhani font-semibold">{img.caption}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
              
              {/* Add Photo Placeholder Card */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Card className="h-full border-dashed border-gray-700 flex flex-col items-center justify-center min-h-[250px] group cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4 group-hover:bg-hologram-green/20 group-hover:text-hologram-green transition-all">
                    <span className="text-3xl">+</span>
                  </div>
                  <p className="text-gray-400 font-orbitron group-hover:text-white transition-colors">Добави Снимка</p>
                  <p className="text-xs text-gray-600 mt-2 text-center max-w-[200px]">(Симулация на качване)</p>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
};
