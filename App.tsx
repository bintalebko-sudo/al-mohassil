import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, ClipboardList, Calendar, Settings, BarChart3, 
  School, Plus, Trash2, Edit2, CheckCircle, XCircle, RefreshCw, Save, Database
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  classId: string;
  className: string;
  nationalId?: string;
}

interface ClassItem {
  id: string;
  name: string;
}

interface Subject {
  id: string;
  name: string;
}

interface Exam {
  id: string;
  title: string;
  subjectId: string;
  classId: string;
  maxScore: number;
}

interface Grade {
  studentId: string;
  examId: string;
  score: number;
}

interface Attendance {
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'classes' | 'students' | 'subjects' | 'exams' | 'grades' | 'attendance' | 'reports' | 'settings'>('home');
  
  const [classes, setClasses] = useState<ClassItem[]>(() => {
    const saved = localStorage.getItem('mohassil_classes');
    return saved ? JSON.parse(saved) : [{ id: 'c_4th', name: 'الرابع' }];
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('mohassil_students');
    return saved ? JSON.parse(saved) : [];
  });

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('mohassil_subjects');
    return saved ? JSON.parse(saved) : [
      { id: 's_quran', name: 'القرآن الكريم وعلومه' },
      { id: 's_arabic', name: 'اللغة العربية' },
      { id: 's_islamic', name: 'التربية الإسلامية' }
    ];
  });

  const [exams, setExams] = useState<Exam[]>(() => {
    const saved = localStorage.getItem('mohassil_exams');
    return saved ? JSON.parse(saved) : [];
  });

  const [grades, setGrades] = useState<Grade[]>(() => {
    const saved = localStorage.getItem('mohassil_grades');
    return saved ? JSON.parse(saved) : [];
  });

  const [attendance, setAttendance] = useState<Attendance[]>(() => {
    const saved = localStorage.getItem('mohassil_attendance');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('mohassil_classes', JSON.stringify(classes));
    localStorage.setItem('mohassil_students', JSON.stringify(students));
    localStorage.setItem('mohassil_subjects', JSON.stringify(subjects));
    localStorage.setItem('mohassil_exams', JSON.stringify(exams));
    localStorage.setItem('mohassil_grades', JSON.stringify(grades));
    localStorage.setItem('mohassil_attendance', JSON.stringify(attendance));
  }, [classes, students, subjects, exams, grades, attendance]);

  const [newClassName, setNewClassName] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [selectedClassForStudent, setSelectedClassForStudent] = useState('c_4th');
  const [newStudentNationalId, setNewStudentNationalId] = useState('');

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    const newClass: ClassItem = { id: 'c_' + Date.now(), name: newClassName.trim() };
    setClasses([...classes, newClass]);
    setNewClassName('');
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    const targetClass = classes.find(c => c.id === selectedClassForStudent);
    const newStudent: Student = {
      id: 's_' + Date.now(),
      name: newStudentName.trim(),
      classId: selectedClassForStudent,
      className: targetClass ? targetClass.name : 'الرابع',
      nationalId: newStudentNationalId.trim()
    };
    setStudents([...students, newStudent]);
    setNewStudentName('');
    setNewStudentNationalId('');
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans pb-20">
      <header className="bg-blue-700 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Database className="w-6 h-6" />
          <h1 className="text-xl font-bold">المحصلة (وضع العمل دون إنترنت)</h1>
        </div>
        <span className="text-xs bg-emerald-500 px-2 py-1 rounded-full text-white font-medium">
          متصل محلياً (Offline Ready)
        </span>
      </header>

      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-2">مرحباً بك يا أستاذ خالد</h2>
              <p className="opacity-90">إدارة صفوفك، طلابك، ورصد درجاتك بسلاسة تامة دون الحاجة للاتترنت.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div onClick={() => setActiveTab('students')} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center cursor-pointer hover:shadow-md transition">
                <Users className="w-8 h-8 text-blue-600 mb-2" />
                <span className="font-bold text-lg">{students.length}</span>
                <span className="text-slate-500 text-sm">إجمالي الطلاب</span>
              </div>
              <div onClick={() => setActiveTab('classes')} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center cursor-pointer hover:shadow-md transition">
                <School className="w-8 h-8 text-indigo-600 mb-2" />
                <span className="font-bold text-lg">{classes.length}</span>
                <span className="text-slate-500 text-sm">الصفوف الدراسية</span>
              </div>
              <div onClick={() => setActiveTab('grades')} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center cursor-pointer hover:shadow-md transition">
                <ClipboardList className="w-8 h-8 text-emerald-600 mb-2" />
                <span className="font-bold text-lg">{grades.length}</span>
                <span className="text-slate-500 text-sm">العلامات المرصودة</span>
              </div>
              <div onClick={() => setActiveTab('attendance')} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center cursor-pointer hover:shadow-md transition">
                <Calendar className="w-8 h-8 text-amber-600 mb-2" />
                <span className="font-bold text-lg">سجل</span>
                <span className="text-slate-500 text-sm">الحضور والغياب</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-700">إدارة الصفوف الدراسية</h2>
            <form onSubmit={handleAddClass} className="flex gap-2">
              <input 
                type="text" 
                placeholder="اسم الصف الجديد (مثال: الرابع)" 
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <button type="submit" className="bg-blue-600 text-white px-5 rounded-xl font-medium hover:bg-blue-700 flex items-center gap-1">
                <Plus className="w-5 h-5" /> إضافة
              </button>
            </form>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              {classes.map((cls) => (
                <div key={cls.id} className="p-4 border-b last:border-none flex justify-between items-center">
                  <span className="font-semibold">{cls.name}</span>
                  <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">نشط محلياً</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-700">إدارة الطلاب ({students.length} طالب)</h2>
            <form onSubmit={handleAddStudent} className="bg-white p-4 rounded-xl shadow-sm border space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input 
                  type="text" 
                  placeholder="اسم الطالب الرباعي" 
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                  type="text" 
                  placeholder="الرقم الوطني (اختياري)" 
                  value={newStudentNationalId}
                  onChange={(e) => setNewStudentNationalId(e.target.value)}
                  className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select 
                  value={selectedClassForStudent}
                  onChange={(e) => setSelectedClassForStudent(e.target.value)}
                  className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-medium hover:bg-blue-700 flex justify-center items-center gap-1">
                <Plus className="w-5 h-5" /> إضافة الطالب للقائمة
              </button>
            </form>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden max-h-96 overflow-y-auto">
              {students.length === 0 ? (
                <p className="p-6 text-center text-slate-400">لا توجد أسماء مسجلة حالياً.</p>
              ) : (
                students.map((st, idx) => (
                  <div key={st.id} className="p-3 border-b last:border-none flex justify-between items-center hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-slate-100 text-slate-600 font-bold w-6 h-6 rounded-full flex items-center justify-center">{idx + 1}</span>
                      <div>
                        <p className="font-semibold text-slate-800">{st.name}</p>
                        <p className="text-xs text-slate-400">الرقم: {st.nationalId || 'بدون'} | الصف: {st.className}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteStudent(st.id)} className="text-red-500 hover:text-red-700 p-2">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-700">الإعدادات والتخزين المحلي</h2>
            <div className="bg-white p-5 rounded-xl shadow-sm border space-y-4">
              <p className="text-slate-600 text-sm">جميع بياناتك محفوظة الآن بشكل آمن داخل ذاكرة المتصفح/الهاتف ولن تضيع نهائياً حتى بدون إنترنت.</p>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg flex justify-around p-2 z-50">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center p-1 ${activeTab === 'home' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
          <BarChart3 className="w-6 h-6" />
          <span className="text-xs mt-1">الرئيسية</span>
        </button>
        <button onClick={() => setActiveTab('classes')} className={`flex flex-col items-center p-1 ${activeTab === 'classes' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
          <School className="w-6 h-6" />
          <span className="text-xs mt-1">الصفوف</span>
        </button>
        <button onClick={() => setActiveTab('students')} className={`flex flex-col items-center p-1 ${activeTab === 'students' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
          <Users className="w-6 h-6" />
          <span className="text-xs mt-1">الطلاب</span>
        </button>
        <button onClick={() => setActiveTab('grades')} className={`flex flex-col items-center p-1 ${activeTab === 'grades' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
          <ClipboardList className="w-6 h-6" />
          <span className="text-xs mt-1">العلامات</span>
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center p-1 ${activeTab === 'settings' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
          <Settings className="w-6 h-6" />
          <span className="text-xs mt-1">الإعدادات</span>
        </button>
      </nav>
    </div>
  );
}
