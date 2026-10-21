import { useState } from 'react';
import { X, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { LEARN_TOPICS, LearnTopic } from '../../data/learnTopics';
import { audioEngine } from '../../utils/audioEngine';

interface LearnModalProps {
  onClose: () => void;
  onExploreTopicBody: (targetId: string) => void;
}

export function LearnModal({ onClose, onExploreTopicBody }: LearnModalProps) {
  const [selectedTopic, setSelectedTopic] = useState<LearnTopic>(LEARN_TOPICS[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', 'Mechanics', 'Astrophysics', 'Planetary Science', 'Exploration'];

  const filteredTopics = categoryFilter === 'All'
    ? LEARN_TOPICS
    : LEARN_TOPICS.filter((t) => t.category === categoryFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl glass-panel border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-mono text-white">
                Educational Science Hub
              </h2>
              <p className="text-xs text-slate-400">
                Core astrophysical principles and planetary mechanics explained
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              audioEngine.playClickPing();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                audioEngine.playClickPing();
                setCategoryFilter(cat);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
                categoryFilter === cat
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Topic Selector List */}
          <div className="space-y-2 md:border-r md:border-slate-800 md:pr-4">
            {filteredTopics.map((topic) => {
              const isActive = selectedTopic.id === topic.id;
              return (
                <div
                  key={topic.id}
                  onClick={() => {
                    audioEngine.playClickPing();
                    setSelectedTopic(topic);
                  }}
                  className={`p-3 rounded-2xl cursor-pointer transition-all border text-left ${
                    isActive
                      ? 'bg-purple-950/40 border-purple-500/50 shadow-md shadow-purple-950/40'
                      : 'bg-slate-900/30 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block mb-1">
                    {topic.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-100">
                    {topic.title}
                  </h4>
                </div>
              );
            })}
          </div>

          {/* Active Topic Detail */}
          <div className="md:col-span-2 space-y-4">
            <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30">
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 block mb-1">
                {selectedTopic.category}
              </span>
              <h3 className="text-lg font-bold text-white font-mono mb-2">
                {selectedTopic.title}
              </h3>
              <p className="text-xs text-purple-200/90 italic leading-relaxed">
                "{selectedTopic.summary}"
              </p>
            </div>

            <div className="space-y-3">
              {selectedTopic.content.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-xs text-slate-300 leading-relaxed bg-slate-900/30 p-3 rounded-2xl border border-slate-800/60"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {selectedTopic.relatedPlanetOrMission && (
              <button
                onClick={() => {
                  audioEngine.playClickPing();
                  onExploreTopicBody(selectedTopic.relatedPlanetOrMission!);
                  onClose();
                }}
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:text-white hover:border-purple-400 text-xs font-mono flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fly to Related Body in 3D Solar System</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
