import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  Gamepad2,
  Star,
  CheckCircle2,
  XCircle,
  Volume2,
  ArrowLeft
} from 'lucide-react';

type Section = 'theory' | 'quiz' | 'result';

const PRONUNCIATION_RULES = [
  {
    letter: 'C',
    rules: [
      { combo: 'ca, co, cu', sound: 'Կ', example: 'casa (կասա), coco (կոկո), cuna (կունա)' },
      { combo: 'ce, ci', sound: 'Ս', example: 'cena (սենա), cine (սինե)' }
    ],
    color: 'bg-blue-500'
  },
  {
    letter: 'G',
    rules: [
      { combo: 'ga, go, gu', sound: 'Գ', example: 'gato (գատո), gota (գոտա), gusano (գուսանո)' },
      { combo: 'ge, gi', sound: 'Խ', example: 'gente (խենտե), gigante (խիգանտե)' }
    ],
    color: 'bg-emerald-500'
  },
  {
    letter: 'GU / QU',
    rules: [
      { combo: 'gue, gui', sound: 'Գե, Գի', example: 'guerra (գեռա), guitarra (գիտառա) - "u"-ն չի կարդացվում' },
      { combo: 'que, qui', sound: 'Կե, Կի', example: 'queso (կեսո), quince (կինսե) - "u"-ն չի կարդացվում' }
    ],
    color: 'bg-purple-500'
  }
];

const QUIZ_QUESTIONS = [
  { word: 'casa', options: ['Կասա', 'Սասա'], answer: 'Կասա', rule: 'ca -> Կ' },
  { word: 'cine', options: ['Կինե', 'Սինե'], answer: 'Սինե', rule: 'ci -> Ս' },
  { word: 'gato', options: ['Գատո', 'Խատո'], answer: 'Գատո', rule: 'ga -> Գ' },
  { word: 'gente', options: ['Գենտե', 'Խենտե'], answer: 'Խենտե', rule: 'ge -> Խ' },
  { word: 'guitarra', options: ['Գուիտառա', 'Գիտառա'], answer: 'Գիտառա', rule: 'gui -> Գի' },
  { word: 'queso', options: ['Կուեսո', 'Կեսո'], answer: 'Կեսո', rule: 'que -> Կե' },
  { word: 'cebra', options: ['Սեբրա', 'Կեբրա'], answer: 'Սեբրա', rule: 'ce -> Ս' },
  { word: 'gigante', options: ['Գիգանտե', 'Խիգանտե'], answer: 'Խիգանտե', rule: 'gi -> Խի' },
  { word: 'guerra', options: ['Գեռա', 'Գուեռա'], answer: 'Գեռա', rule: 'gue -> Գե' },
  { word: 'quince', options: ['Կուինսե', 'Կինսե'], answer: 'Կինսե', rule: 'qui -> Կի' },
];

export default function PronunciationGuide() {
  const [section, setSection] = useState<Section>('theory');
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const handleAnswer = (option: string) => {
    if (feedback) return;
    const current = QUIZ_QUESTIONS[quizIndex];
    if (option === current.answer) {
      setScore(s => s + 1);
      setFeedback({ isCorrect: true, message: 'Ճիշտ է!' });
    } else {
      setFeedback({ isCorrect: false, message: `Սխալ է: Ճիշտը՝ ${current.answer} (${current.rule})` });
    }
  };

  const nextQuestion = () => {
    setFeedback(null);
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex(i => i + 1);
    } else {
      setSection('result');
    }
  };

  const reset = () => {
    setSection('theory');
    setQuizIndex(0);
    setScore(0);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 p-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Volume2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">Արտասանություն</h1>
            </div>
          </div>
          <div className="px-4 py-2 bg-indigo-50 rounded-full text-xs font-black text-indigo-600 uppercase tracking-widest">
            C, G, GUI, QUI
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 md:p-12">
        <AnimatePresence mode="wait">
          {section === 'theory' && (
            <motion.div 
              key="theory"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Իսպաներենի Արտասանության Կանոնները</h2>
                <p className="text-slate-500 text-xl font-medium">Սովորիր, թե ինչպես ճիշտ կարդալ այս տառերը:</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PRONUNCIATION_RULES.map((rule, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-[40px] p-8 border-2 border-slate-100 shadow-xl space-y-6"
                  >
                    <div className={`w-16 h-16 ${rule.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl font-black text-white">{rule.letter}</span>
                    </div>
                    <div className="space-y-6">
                      {rule.rules.map((r, ri) => (
                        <div key={ri} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-slate-100 rounded-lg font-black text-indigo-600">{r.combo}</span>
                            <ChevronRight className="w-4 h-4 text-slate-300" />
                            <span className="text-2xl font-black text-slate-900">[{r.sound}]</span>
                          </div>
                          <p className="text-sm text-slate-500 font-medium italic">{r.example}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center pt-8">
                <button 
                  onClick={() => setSection('quiz')}
                  className="px-12 py-6 bg-indigo-600 text-white rounded-[32px] font-black text-2xl shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-4"
                >
                  ՍՏՈՒԳԵԼ ԳԻՏԵԼԻՔՆԵՐԸ
                  <Gamepad2 className="w-8 h-8" />
                </button>
              </div>
            </motion.div>
          )}

          {section === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="bg-white rounded-[40px] p-12 border-4 border-indigo-100 shadow-2xl text-center space-y-8">
                <div className="flex justify-center">
                  <div className="px-6 py-2 bg-indigo-50 text-indigo-600 rounded-full font-black text-sm uppercase tracking-widest">
                    Հարց {quizIndex + 1} / {QUIZ_QUESTIONS.length}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Ինչպե՞ս է կարդացվում</p>
                  <h3 className="text-6xl font-black text-slate-900 tracking-tight">
                    {QUIZ_QUESTIONS[quizIndex].word}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {QUIZ_QUESTIONS[quizIndex].options.map((option, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option)}
                    disabled={!!feedback}
                    className={`p-8 rounded-[32px] font-black text-2xl transition-all border-4 ${
                      feedback 
                        ? option === QUIZ_QUESTIONS[quizIndex].answer
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                          : option === feedback.message.split(': ')[0] // Simple check for selected wrong
                            ? 'bg-rose-50 border-rose-400 text-rose-700'
                            : 'bg-white border-slate-100 text-slate-300'
                        : 'bg-white border-slate-100 text-slate-700 hover:border-indigo-400 hover:shadow-lg'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {feedback && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className={`p-8 rounded-[32px] flex flex-col items-center gap-4 ${feedback.isCorrect ? 'bg-emerald-50 border-4 border-emerald-200' : 'bg-rose-50 border-4 border-rose-200'}`}
                  >
                    <div className="flex items-center gap-3">
                      {feedback.isCorrect ? (
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                      ) : (
                        <XCircle className="w-10 h-10 text-rose-500" />
                      )}
                      <span className={`text-3xl font-black ${feedback.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {feedback.message}
                      </span>
                    </div>
                    <button
                      onClick={nextQuestion}
                      className="mt-4 px-12 py-4 bg-slate-900 text-white rounded-full font-black text-xl hover:bg-slate-800 transition-all flex items-center gap-3"
                    >
                      {quizIndex === QUIZ_QUESTIONS.length - 1 ? 'ՏԵՍՆԵԼ ԱՐԴՅՈՒՆՔԸ' : 'ՀԱՋՈՐԴԸ'}
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {section === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center space-y-12"
            >
              <div className="bg-white rounded-[50px] p-16 border-8 border-indigo-600 shadow-2xl space-y-8">
                <div className="relative inline-block">
                  <Star className="w-32 h-32 text-indigo-600 fill-indigo-600 animate-bounce" />
                  <Sparkles className="absolute -top-4 -right-4 w-12 h-12 text-yellow-500" />
                </div>
                <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">ԳԵՐԱԶԱՆՑ Է:</h2>
                <p className="text-3xl font-bold text-slate-500">
                  Դու հավաքեցիր <span className="text-indigo-600 text-5xl font-black">{score}</span> միավոր {QUIZ_QUESTIONS.length}-ից:
                </p>
                <div className="flex flex-col gap-4 pt-8">
                  <button 
                    onClick={reset}
                    className="w-full py-6 bg-indigo-600 text-white rounded-[32px] font-black text-2xl shadow-xl hover:bg-indigo-700 transition-all active:scale-95"
                  >
                    ԿՐԿՆԵԼ ԽԱՂԸ
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
