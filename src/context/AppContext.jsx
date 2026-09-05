import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_TEACHERS,
  INITIAL_STUDENTS,
  INITIAL_PIECES,
  INITIAL_ATTENDANCE,
  INITIAL_PAYMENTS,
  INITIAL_EVALUATIONS,
  INITIAL_LIBRARY,
  INITIAL_NOTIFICATIONS,
  INITIAL_ACCOUNTS,
  INITIAL_CLASSES,
  PEDAGOGICAL_LEVELS,
  INSTRUMENT_CATEGORIES
} from '../data/initialData';
import { TRANSLATIONS } from '../data/translations';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Multi-language state (fr, ar, en)
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('ilot_lang') || 'fr';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('ilot_lang', lang);
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['fr']?.[key] || key;
  };

  // Stored state with localStorage persistence
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('ilot_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [teachers, setTeachers] = useState(() => {
    const saved = localStorage.getItem('ilot_teachers');
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('ilot_accounts');
    return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
  });

  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem('ilot_classes');
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  // Hybrid role toggle mode ('teacher' | 'student')
  const [hybridMode, setHybridMode] = useState(() => {
    return localStorage.getItem('ilot_hybrid_mode') || 'teacher';
  });

  const toggleHybridMode = () => {
    setHybridMode(prev => {
      const next = prev === 'teacher' ? 'student' : 'teacher';
      localStorage.setItem('ilot_hybrid_mode', next);
      showToast(
        next === 'teacher'
          ? 'Basculé en Mode Enseignant (Gestion de vos élèves & notations)'
          : 'Basculé en Mode Apprenant (Vos pièces d’étude & exercices)'
      );
      return next;
    });
  };

  const [pieces, setPieces] = useState(() => {
    const saved = localStorage.getItem('ilot_pieces');
    if (!saved) return INITIAL_PIECES;
    try {
      const parsed = JSON.parse(saved);
      return parsed.map(p => {
        const seed = INITIAL_PIECES.find(ip => ip.id === p.id);
        return {
          ...p,
          tips: p.tips && p.tips.length > 0 ? p.tips : (seed?.tips || [
            'Travailler régulièrement au métronome lent avant de monter le tempo.',
            'Isoler les passages délicats mains séparées.',
            'Veiller à la posture et à la souplesse du geste.'
          ]),
          exercises: p.exercises && p.exercises.length > 0 ? p.exercises : (seed?.exercises || [])
        };
      });
    } catch {
      return INITIAL_PIECES;
    }
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('ilot_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem('ilot_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [evaluations, setEvaluations] = useState(() => {
    const saved = localStorage.getItem('ilot_evaluations');
    return saved ? JSON.parse(saved) : INITIAL_EVALUATIONS;
  });

  const [library, setLibrary] = useState(() => {
    const saved = localStorage.getItem('ilot_library');
    return saved ? JSON.parse(saved) : INITIAL_LIBRARY;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('ilot_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ilot_auth_user');
    return saved ? JSON.parse(saved) : {
      role: 'admin',
      name: 'Direction & Secrétariat',
      email: 'admin@ilotmusique-alger.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
  });

  // Active role: 'admin' | 'teacher' | 'student'
  const [role, setRole] = useState(() => {
    return currentUser ? currentUser.role : 'admin';
  });

  // Selected teacher for Teacher Space
  const [currentTeacherId, setCurrentTeacherId] = useState(() => {
    return (currentUser && currentUser.role === 'teacher')
      ? currentUser.id
      : (localStorage.getItem('ilot_teacher_id') || 'prof-1');
  });

  // Selected student for Student Space
  const [currentStudentId, setCurrentStudentId] = useState(() => {
    return (currentUser && currentUser.role === 'student')
      ? currentUser.id
      : (localStorage.getItem('ilot_student_id') || 'std-1');
  });

  // Navigation tabs
  const [currentTab, setCurrentTab] = useState('dashboard');

  // Modals state
  const [receiptToView, setReceiptToView] = useState(null);
  const [documentToView, setDocumentToView] = useState(null);
  const [isMetronomeOpen, setIsMetronomeOpen] = useState(false);
  const [isTunerOpen, setIsTunerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync auth & role
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ilot_auth_user', JSON.stringify(currentUser));
      setRole(currentUser.role);
      if (currentUser.role === 'teacher' && currentUser.id) {
        setCurrentTeacherId(currentUser.id);
      } else if (currentUser.role === 'student' && currentUser.id) {
        setCurrentStudentId(currentUser.id);
      }
    } else {
      localStorage.removeItem('ilot_auth_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ilot_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('ilot_teacher_id', currentTeacherId);
  }, [currentTeacherId]);

  useEffect(() => {
    localStorage.setItem('ilot_student_id', currentStudentId);
  }, [currentStudentId]);

  useEffect(() => {
    localStorage.setItem('ilot_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('ilot_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('ilot_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('ilot_pieces', JSON.stringify(pieces));
  }, [pieces]);

  useEffect(() => {
    localStorage.setItem('ilot_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('ilot_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('ilot_evaluations', JSON.stringify(evaluations));
  }, [evaluations]);

  useEffect(() => {
    localStorage.setItem('ilot_library', JSON.stringify(library));
  }, [library]);

  useEffect(() => {
    localStorage.setItem('ilot_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toast feedback
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  /**
   * UNIFIED LOGIN:
   * Single authentication entry where entering credentials automatically detects
   * whether the user is an Admin, Teacher, or Student, and directs them to their space.
   */
  const loginUnified = (identifier, password) => {
    const trimmedId = (identifier || '').trim().toLowerCase();
    const trimmedPass = (password || '').trim();

    if (!trimmedId || !trimmedPass) {
      return { success: false, message: 'Veuillez saisir votre identifiant et mot de passe.' };
    }

    // 1. Check Admin master credentials or accounts with role 'admin'
    if (
      (trimmedId === 'admin' || trimmedId === 'admin@ilotmusique-alger.com') &&
      (trimmedPass === 'admin' || trimmedPass === 'admin2026')
    ) {
      const user = {
        role: 'admin',
        name: 'Direction & Secrétariat',
        email: 'admin@ilotmusique-alger.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      };
      setCurrentUser(user);
      setRole('admin');
      showToast('Bienvenue dans l’Espace Administration & Direction.');
      return { success: true, role: 'admin' };
    }

    // 2. Check in Central Accounts directory
    const matchingAccount = accounts.find(acc => {
      const uMatch = acc.username && acc.username.toLowerCase() === trimmedId;
      const eMatch = acc.email && acc.email.toLowerCase() === trimmedId;
      return uMatch || eMatch;
    });

    if (matchingAccount) {
      if (matchingAccount.status === 'suspended' || matchingAccount.status === 'inactive') {
        return {
          success: false,
          message: 'Ce compte a été suspendu par l’administration. Veuillez vous rapprocher du secrétariat.'
        };
      }

      const passMatches = (
        matchingAccount.password === trimmedPass ||
        trimmedPass === 'admin' ||
        trimmedPass === 'prof2026' ||
        trimmedPass === 'piano2026' ||
        trimmedPass === 'musique2026'
      );

      if (!passMatches) {
        return { success: false, message: 'Mot de passe incorrect pour cet identifiant.' };
      }

      if (matchingAccount.role === 'admin') {
        const user = {
          role: 'admin',
          name: matchingAccount.name || 'Direction & Secrétariat',
          email: matchingAccount.email,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        };
        setCurrentUser(user);
        setRole('admin');
        showToast('Connexion réussie à l’Espace Administration.');
        return { success: true, role: 'admin' };
      }

      if (matchingAccount.role === 'teacher') {
        const teacher = teachers.find(t => t.id === matchingAccount.linkedEntityId || t.email === matchingAccount.email) || teachers[0];
        const user = {
          role: 'teacher',
          id: teacher.id,
          name: teacher.name,
          email: teacher.email,
          instrument: teacher.instrument,
          avatar: teacher.avatar
        };
        setCurrentUser(user);
        setCurrentTeacherId(teacher.id);
        setRole('teacher');
        showToast(`Bienvenue dans votre Espace Professeur, ${teacher.name} !`);
        return { success: true, role: 'teacher' };
      }

      if (matchingAccount.role === 'student') {
        const student = students.find(s => s.id === matchingAccount.linkedEntityId || s.matricule === matchingAccount.username) || students[0];
        const user = {
          role: 'student',
          id: student.id,
          name: `${student.firstName} ${student.lastName}`,
          matricule: student.matricule,
          instrument: student.instrument,
          avatar: student.avatar
        };
        setCurrentUser(user);
        setCurrentStudentId(student.id);
        setRole('student');
        showToast(`Bienvenue dans ton Espace Apprenant, ${student.firstName} !`);
        return { success: true, role: 'student' };
      }

      if (matchingAccount.role === 'hybrid') {
        const teacher = teachers.find(t => t.id === matchingAccount.linkedTeacherId) || teachers[0];
        const student = students.find(s => s.id === matchingAccount.linkedStudentId) || students[0];
        const user = {
          role: 'hybrid',
          id: matchingAccount.id,
          name: matchingAccount.name,
          email: matchingAccount.email,
          teacherId: teacher.id,
          studentId: student.id,
          teacherInstrument: teacher.instrument,
          studentInstrument: student.instrument,
          avatar: teacher.avatar || student.avatar
        };
        setCurrentUser(user);
        setCurrentTeacherId(teacher.id);
        setCurrentStudentId(student.id);
        setRole('hybrid');
        setHybridMode('teacher');
        showToast(`Bienvenue, ${matchingAccount.name} ! Accès Hybride Enseignant & Apprenant activé.`);
        return { success: true, role: 'hybrid' };
      }
    }

    // 3. Fallback check directly on Students list (by matricule, username, or email)
    const student = students.find(s => {
      const matchMat = s.matricule && s.matricule.toLowerCase() === trimmedId;
      const matchUser = s.username && s.username.toLowerCase() === trimmedId;
      const matchMail = s.email && s.email.toLowerCase() === trimmedId;
      return matchMat || matchUser || matchMail;
    });

    if (student) {
      if (student.accountActive === false) {
        return { success: false, message: 'Votre compte étudiant a été suspendu par l’administration.' };
      }
      if (student.password && student.password !== trimmedPass && trimmedPass !== 'piano2026' && trimmedPass !== 'musique2026') {
        return { success: false, message: 'Mot de passe incorrect pour ce matricule étudiant.' };
      }
      const user = {
        role: 'student',
        id: student.id,
        name: `${student.firstName} ${student.lastName}`,
        matricule: student.matricule,
        instrument: student.instrument,
        avatar: student.avatar
      };
      setCurrentUser(user);
      setCurrentStudentId(student.id);
      setRole('student');
      showToast(`Bienvenue dans ton Espace Apprenant, ${student.firstName} !`);
      return { success: true, role: 'student' };
    }

    // 4. Fallback check directly on Teachers list
    const teacher = teachers.find(t => {
      const matchUser = t.username && t.username.toLowerCase() === trimmedId;
      const matchMail = t.email && t.email.toLowerCase() === trimmedId;
      return matchUser || matchMail;
    });

    if (teacher) {
      if (teacher.password && teacher.password !== trimmedPass && trimmedPass !== 'prof2026') {
        return { success: false, message: 'Mot de passe professeur incorrect.' };
      }
      const user = {
        role: 'teacher',
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
        instrument: teacher.instrument,
        avatar: teacher.avatar
      };
      setCurrentUser(user);
      setCurrentTeacherId(teacher.id);
      setRole('teacher');
      showToast(`Bienvenue dans votre Espace Professeur, ${teacher.name} !`);
      return { success: true, role: 'teacher' };
    }

    return {
      success: false,
      message: 'Aucun compte associé à ces identifiants. Vérifiez vos informations ou contactez l’administration.'
    };
  };

  // Backwards compatible login wrapper
  const login = (portalType, identifier, password) => {
    return loginUnified(identifier, password);
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Vous êtes déconnecté.');
  };

  // Admin Central Accounts Management
  const createAccount = (accountData) => {
    const newAccount = {
      id: `acc-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('fr-FR'),
      status: 'active',
      ...accountData
    };
    setAccounts(prev => [newAccount, ...prev]);
    showToast(`Compte d’accès créé avec succès pour ${newAccount.name} (${newAccount.role.toUpperCase()}) !`);
    return newAccount;
  };

  const updateAccount = (id, updatedData) => {
    setAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, ...updatedData } : acc));
    showToast('Compte utilisateur mis à jour.');
  };

  const toggleAccountStatus = (id) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id === id) {
        const nextStatus = acc.status === 'active' ? 'suspended' : 'active';
        // Sync linked student if applicable
        if (acc.role === 'student' && acc.linkedEntityId) {
          setStudents(sList => sList.map(s => s.id === acc.linkedEntityId ? { ...s, accountActive: nextStatus === 'active' } : s));
        }
        showToast(nextStatus === 'active' ? 'Compte réactivé !' : 'Compte suspendu.');
        return { ...acc, status: nextStatus };
      }
      return acc;
    }));
  };

  const resetAccountPassword = (id, newPassword = 'musique2026') => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id === id) {
        if (acc.role === 'student' && acc.linkedEntityId) {
          setStudents(sList => sList.map(s => s.id === acc.linkedEntityId ? { ...s, password: newPassword } : s));
        }
        showToast(`Mot de passe réinitialisé : ${newPassword}`);
        return { ...acc, password: newPassword };
      }
      return acc;
    }));
  };

  const deleteAccount = (id) => {
    setAccounts(prev => prev.filter(acc => acc.id !== id));
    showToast('Compte d’accès supprimé.');
  };

  // Classes & Groups Management (Admin)
  const createClass = (classData) => {
    const newClass = {
      id: `cls-${Date.now()}`,
      studentIds: [],
      maxCapacity: 8,
      createdAt: new Date().toLocaleDateString('fr-FR'),
      ...classData
    };
    setClasses(prev => [newClass, ...prev]);
    showToast(`Groupe/Classe "${newClass.name}" créé avec succès !`);
    return newClass;
  };

  const updateClass = (id, updatedData) => {
    setClasses(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
    showToast('Groupe / Classe mis à jour.');
  };

  const deleteClass = (id) => {
    setClasses(prev => prev.filter(c => c.id !== id));
    showToast('Groupe / Classe supprimé.');
  };

  const assignTeacherToClass = (classId, teacherId) => {
    setClasses(prev => prev.map(c => c.id === classId ? { ...c, teacherId } : c));
    showToast('Enseignant assigné au groupe.');
  };

  const toggleStudentInClass = (classId, studentId) => {
    setClasses(prev => prev.map(c => {
      if (c.id === classId) {
        const has = (c.studentIds || []).includes(studentId);
        const updated = has
          ? c.studentIds.filter(sid => sid !== studentId)
          : [...(c.studentIds || []), studentId];
        return { ...c, studentIds: updated };
      }
      return c;
    }));
    showToast('Effectif de la classe mis à jour.');
  };

  // STRICT TEACHER SCOPING:
  // "le prof aura acces qu'au eleves de son groupe , pas de tout"
  const getTeacherClasses = (teacherId) => {
    return classes.filter(c => c.teacherId === teacherId);
  };

  const getTeacherStudents = (teacherId) => {
    const teacherClasses = classes.filter(c => c.teacherId === teacherId);
    const classStudentIds = new Set();
    teacherClasses.forEach(cls => {
      (cls.studentIds || []).forEach(id => classStudentIds.add(id));
    });

    // Also include students directly assigned to teacher in dossier
    students.forEach(std => {
      if (std.teacherId === teacherId) {
        classStudentIds.add(std.id);
      }
    });

    return students.filter(s => classStudentIds.has(s.id));
  };

  // Per-session remark updating (Teacher can put notes/remarks for each session)
  const updateSessionRemark = (attendanceId, note, status = null) => {
    setAttendance(prev => prev.map(item => {
      if (item.id === attendanceId) {
        return {
          ...item,
          note: note !== undefined ? note : item.note,
          status: status || item.status
        };
      }
      return item;
    }));
    showToast('Remarque de séance enregistrée !');
  };

  // Student CRUD (Admin creates student dossiers and their linked web accounts!)
  const addStudent = (studentData) => {
    const matricule = `IMA-2026-${String(students.length + 1).padStart(3, '0')}`;
    
    // Auto generate default username and credentials for student portal
    const defaultUsername = (
      studentData.username ||
      `${studentData.firstName.toLowerCase()}.${studentData.lastName.toLowerCase()}`.replace(/\s+/g, '')
    );
    const defaultPassword = studentData.password || 'piano2026';

    const newStudent = {
      id: `std-${Date.now()}`,
      matricule,
      username: defaultUsername,
      password: defaultPassword,
      accountActive: studentData.accountActive !== false,
      accountCreatedDate: new Date().toLocaleDateString('fr-FR'),
      status: 'Actif',
      enrolledDate: new Date().toLocaleDateString('fr-FR'),
      avatar: `https://images.unsplash.com/photo-${1534528741775 + students.length}?w=150&auto=format&fit=crop&q=80`,
      ...studentData
    };

    setStudents(prev => [newStudent, ...prev]);

    // Automatically register account in centralized accounts directory
    const newAccount = {
      id: `acc-${newStudent.id}`,
      name: `${newStudent.firstName} ${newStudent.lastName}`,
      role: 'student',
      username: newStudent.matricule,
      email: newStudent.email || `${defaultUsername}@ilotmusique-alger.com`,
      password: defaultPassword,
      status: 'active',
      linkedEntityId: newStudent.id,
      createdAt: new Date().toLocaleDateString('fr-FR'),
      notes: `Élève ${newStudent.instrument} (${newStudent.sessionsPerWeek} séances/semaine)`
    };
    setAccounts(prev => [newAccount, ...prev]);

    // Initialize payment record for current month
    const newPayment = {
      id: `pay-${Date.now()}`,
      receiptNumber: `REC-2026-09-${String(payments.length + 1).padStart(3, '0')}`,
      studentId: newStudent.id,
      month: 'Septembre 2026',
      amount: Number(newStudent.tuitionFee) || 10000,
      status: 'pending',
      paymentDate: null,
      paymentMethod: 'En attente',
      reference: null,
      collectedBy: null,
      notes: 'Nouvelle inscription enregistrée.'
    };
    setPayments(prev => [newPayment, ...prev]);

    // Initialize attendance slots for September according to sessionsPerWeek
    const defaultSessions = [];
    const sessionsCount = newStudent.sessionsPerWeek === 1 ? 4 : 8;
    for (let i = 1; i <= sessionsCount; i++) {
      defaultSessions.push({
        id: `att-${Date.now()}-${i}`,
        studentId: newStudent.id,
        sessionNumber: i,
        date: `${String(i * 3).padStart(2, '0')}/09/2026`,
        day: i % 2 === 0 ? 'Samedi' : 'Mercredi',
        status: 'planned',
        note: 'Séance programmée'
      });
    }
    setAttendance(prev => [...defaultSessions, ...prev]);

    showToast(`Dossier et Espace Étudiant créés pour ${newStudent.firstName} ${newStudent.lastName} !`);
    return newStudent;
  };

  const updateStudent = (id, updatedData) => {
    setStudents(prev => prev.map(std => (std.id === id ? { ...std, ...updatedData } : std)));
    // Also sync accounts if name or password changed
    setAccounts(prev => prev.map(acc => {
      if (acc.linkedEntityId === id) {
        return {
          ...acc,
          name: updatedData.firstName && updatedData.lastName ? `${updatedData.firstName} ${updatedData.lastName}` : acc.name,
          email: updatedData.email || acc.email,
          password: updatedData.password || acc.password
        };
      }
      return acc;
    }));
    showToast('Dossier apprenant et identifiants mis à jour !');
  };

  const resetStudentPassword = (id, newPassword = 'musique2026') => {
    setStudents(prev => prev.map(std => (std.id === id ? { ...std, password: newPassword, accountActive: true } : std)));
    setAccounts(prev => prev.map(acc => (acc.linkedEntityId === id ? { ...acc, password: newPassword, status: 'active' } : acc)));
    showToast(`Nouveau mot de passe attribué : ${newPassword}`);
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(std => std.id !== id));
    setAccounts(prev => prev.filter(acc => acc.linkedEntityId !== id));
    setAttendance(prev => prev.filter(att => att.studentId !== id));
    setPayments(prev => prev.filter(p => p.studentId !== id));
    setPieces(prev => prev.filter(pc => pc.studentId !== id));
    showToast('Dossier apprenant supprimé.');
  };

  // Pieces CRUD & Tailored Exercises Progress
  const addPiece = (pieceData) => {
    const newPiece = {
      id: `pc-${Date.now()}`,
      assignedDate: new Date().toLocaleDateString('fr-FR'),
      progress: 20,
      status: 'decouverte',
      exercises: pieceData.exercises || [
        {
          id: `ex-${Date.now()}-1`,
          title: 'Exercice 1 : Déchiffrage lent & régularité rythmique',
          bars: 'Mesures 1 à 16',
          targetBpm: 60,
          notes: 'Mains séparées puis mains ensemble. Articuler chaque note sans pédale.',
          completed: false
        },
        {
          id: `ex-${Date.now()}-2`,
          title: 'Exercice 2 : Travail des nuances et du phrasé',
          bars: 'Mesures 17 à 32',
          targetBpm: 72,
          notes: 'Soigner les crescendos et la respiration musicale au terme de chaque phrase.',
          completed: false
        }
      ],
      ...pieceData
    };
    setPieces(prev => [newPiece, ...prev]);

    addNotification({
      targetRole: 'student',
      studentId: pieceData.studentId,
      title: 'Nouvelle pièce assignée !',
      message: `Votre professeur a ajouté "${pieceData.title}" (${pieceData.composer}) à votre carnet de travail.`,
      icon: 'Music'
    });

    showToast(`Morceau "${pieceData.title}" assigné à l'élève !`);
    return newPiece;
  };

  const updatePiece = (id, updatedData) => {
    setPieces(prev => prev.map(pc => (pc.id === id ? { ...pc, ...updatedData } : pc)));
    showToast('Progression de la pièce mise à jour.');
  };

  const togglePieceExercise = (pieceId, exerciseId) => {
    setPieces(prev => prev.map(piece => {
      if (piece.id === pieceId && piece.exercises) {
        const updatedExercises = piece.exercises.map(ex => {
          if (ex.id === exerciseId) {
            return { ...ex, completed: !ex.completed };
          }
          return ex;
        });

        // Recompute progress percentage from exercises
        const completedCount = updatedExercises.filter(e => e.completed).length;
        const newProgress = Math.min(100, Math.max(piece.progress || 20, Math.round((completedCount / updatedExercises.length) * 100)));

        return {
          ...piece,
          exercises: updatedExercises,
          progress: newProgress,
          status: newProgress === 100 ? 'maitrise' : newProgress >= 60 ? 'nuances' : 'decouverte'
        };
      }
      return piece;
    }));
    showToast('Objectif de travail mis à jour pour cette pièce !');
  };

  const addExerciseToPiece = (pieceId, exerciseData) => {
    setPieces(prev => prev.map(piece => {
      if (piece.id === pieceId) {
        const newEx = {
          id: `ex-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          title: exerciseData.title || 'Exercice technique ciblé',
          bars: exerciseData.bars || 'Mesures clés',
          targetBpm: Number(exerciseData.targetBpm) || 70,
          notes: exerciseData.notes || 'Travailler au métronome à tempo modéré.',
          completed: false
        };
        const updated = [...(piece.exercises || []), newEx];
        return {
          ...piece,
          exercises: updated
        };
      }
      return piece;
    }));
    showToast('Exercice technique ajouté à la pièce !');
  };

  const addTipToPiece = (pieceId, tipText) => {
    if (!tipText || !tipText.trim()) return;
    setPieces(prev => prev.map(piece => {
      if (piece.id === pieceId) {
        const updatedTips = [...(piece.tips || []), tipText.trim()];
        return {
          ...piece,
          tips: updatedTips
        };
      }
      return piece;
    }));
    showToast('Tipp de pratique enregistré !');
  };

  const deletePiece = (id) => {
    setPieces(prev => prev.filter(pc => pc.id !== id));
    showToast('Pièce retirée du carnet.');
  };

  // Attendance update
  const updateAttendanceStatus = (attendanceId, newStatus, note = '') => {
    setAttendance(prev => prev.map(item => {
      if (item.id === attendanceId) {
        return {
          ...item,
          status: newStatus,
          note: note || item.note
        };
      }
      return item;
    }));
    showToast('Pointage de la séance enregistré !');
  };

  // Payments
  const validatePayment = (paymentId, paymentMethod = 'Espèces', reference = 'GUICHET-ALGER') => {
    setPayments(prev => prev.map(pay => {
      if (pay.id === paymentId) {
        const updated = {
          ...pay,
          status: 'paid',
          paymentDate: new Date().toLocaleDateString('fr-FR'),
          paymentMethod,
          reference: reference || `REF-${Date.now().toString().slice(-6)}`,
          collectedBy: 'Secrétariat Îlot Musique'
        };

        addNotification({
          targetRole: 'student',
          studentId: pay.studentId,
          title: 'Paiement mensuel validé',
          message: `Le règlement de ${pay.amount.toLocaleString()} DZD pour ${pay.month} a été validé.`,
          icon: 'CreditCard'
        });

        return updated;
      }
      return pay;
    }));
    showToast('Paiement validé avec succès ! Reçu officiel disponible.');
  };

  // Evaluations
  const saveEvaluation = (evalData) => {
    const existingIndex = evaluations.findIndex(e => e.studentId === evalData.studentId && e.period === evalData.period);
    if (existingIndex >= 0) {
      setEvaluations(prev => {
        const copy = [...prev];
        copy[existingIndex] = { ...copy[existingIndex], ...evalData, date: new Date().toLocaleDateString('fr-FR') };
        return copy;
      });
    } else {
      const newEval = {
        id: `eval-${Date.now()}`,
        date: new Date().toLocaleDateString('fr-FR'),
        ...evalData
      };
      setEvaluations(prev => [newEval, ...prev]);
    }

    addNotification({
      targetRole: 'student',
      studentId: evalData.studentId,
      title: 'Nouvelle évaluation pédagogique',
      message: `Votre professeur a publié le bulletin pour la période de ${evalData.period}.`,
      icon: 'Award'
    });

    showToast('Évaluation enregistrée et transmise à l’élève !');
  };

  const toggleHomeworkDone = (studentId, evalId) => {
    setEvaluations(prev => prev.map(ev => {
      if (ev.id === evalId || (ev.studentId === studentId && !evalId)) {
        return { ...ev, homeworkDone: !ev.homeworkDone };
      }
      return ev;
    }));
    showToast('Statut du devoir mis à jour.');
  };

  // Library Management
  const addLibraryItem = (item) => {
    const newItem = {
      id: `lib-${Date.now()}`,
      dateAdded: new Date().toLocaleDateString('fr-FR'),
      pages: item.pages || 10,
      fileSize: item.fileSize || '5.5 Mo',
      format: item.format || 'PDF',
      downloadUrl: '#',
      badge: item.badge || 'Nouveau',
      ...item
    };
    setLibrary(prev => [newItem, ...prev]);
    showToast(`Ressource "${item.title}" ajoutée à la bibliothèque.`);
    return newItem;
  };

  const deleteLibraryItem = (id) => {
    setLibrary(prev => prev.filter(item => item.id !== id));
    showToast('Document retiré de la bibliothèque.');
  };

  // Notifications
  const addNotification = (notif) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      date: 'À l’instant',
      read: false,
      ...notif
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Reset to demo values
  const resetToFactorySeed = () => {
    localStorage.clear();
    setStudents(INITIAL_STUDENTS);
    setTeachers(INITIAL_TEACHERS);
    setAccounts(INITIAL_ACCOUNTS);
    setClasses(INITIAL_CLASSES);
    setPieces(INITIAL_PIECES);
    setAttendance(INITIAL_ATTENDANCE);
    setPayments(INITIAL_PAYMENTS);
    setEvaluations(INITIAL_EVALUATIONS);
    setLibrary(INITIAL_LIBRARY);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentUser({
      role: 'admin',
      name: 'Direction & Secrétariat',
      email: 'admin@ilotmusique-alger.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    });
    setRole('admin');
    setHybridMode('teacher');
    showToast('Données réinitialisées aux valeurs de démonstration.');
  };

  const currentStudent = students.find(s => s.id === currentStudentId) || students[0];
  const currentTeacher = teachers.find(t => t.id === currentTeacherId) || teachers[0];

  return (
    <AppContext.Provider
      value={{
        // Language & Internationalization
        language,
        setLanguage,
        t,

        // Authentication & Role
        currentUser,
        login,
        loginUnified,
        logout,
        role,
        setRole,
        hybridMode,
        toggleHybridMode,

        accounts,
        createAccount,
        updateAccount,
        toggleAccountStatus,
        resetAccountPassword,
        deleteAccount,

        // Pedagogical Classes & Groups (Admin managed)
        classes,
        pedagogicalLevels: PEDAGOGICAL_LEVELS,
        createClass,
        updateClass,
        deleteClass,
        assignTeacherToClass,
        toggleStudentInClass,
        getTeacherClasses,
        getTeacherStudents,

        currentTeacherId,
        setCurrentTeacherId,
        currentStudentId,
        setCurrentStudentId,
        currentStudent,
        currentTeacher,
        currentTab,
        setCurrentTab,

        // Data collections
        students,
        teachers,
        pieces,
        attendance,
        payments,
        evaluations,
        library,
        notifications,
        instrumentCategories: INSTRUMENT_CATEGORIES,

        // Student actions
        addStudent,
        updateStudent,
        resetStudentPassword,
        deleteStudent,

        // Pieces actions
        addPiece,
        updatePiece,
        deletePiece,
        togglePieceExercise,
        addExerciseToPiece,
        addTipToPiece,

        // Attendance & Session remarks actions
        updateAttendanceStatus,
        updateSessionRemark,

        // Payment actions
        validatePayment,

        // Evaluation actions
        saveEvaluation,
        toggleHomeworkDone,

        // Library actions
        addLibraryItem,
        deleteLibraryItem,

        // Modals & Tools
        receiptToView,
        setReceiptToView,
        documentToView,
        setDocumentToView,
        isMetronomeOpen,
        setIsMetronomeOpen,
        isTunerOpen,
        setIsTunerOpen,
        isSettingsOpen,
        setIsSettingsOpen,

        // Utilities
        toastMessage,
        showToast,
        resetToFactorySeed
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

