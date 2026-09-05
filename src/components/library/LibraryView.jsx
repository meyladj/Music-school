import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Eye,
  Plus,
  Trash2
} from 'lucide-react';

export default function LibraryView() {
  const {
    role,
    library,
    addLibraryItem,
    deleteLibraryItem,
    setDocumentToView,
    instrumentCategories,
    showToast
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedInstrument, setSelectedInstrument] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    title: '',
    category: 'Partitions',
    instrument: 'Piano',
    level: 'Débutant',
    author: '',
    format: 'PDF',
    pages: 12,
    fileSize: '4.5 Mo',
    description: '',
    badge: 'Nouveau'
  });

  const categories = ['Tous', 'Partitions', 'Livres', 'Théorie & Solfège', 'Audios'];

  const filteredItems = library.filter(item => {
    const matchCat = selectedCategory === 'Tous' || item.category === selectedCategory;
    const matchInst = selectedInstrument === 'Tous' || item.instrument === selectedInstrument || item.instrument === 'Tous';
    const matchSearch = `${item.title} ${item.author} ${item.description}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchInst && matchSearch;
  });

  const handleCreateResource = (e) => {
    e.preventDefault();
    if (!newItem.title.trim()) return;

    addLibraryItem(newItem);
    setIsAddOpen(false);
    setNewItem({
      title: '',
      category: 'Partitions',
      instrument: 'Piano',
      level: 'Débutant',
      author: '',
      format: 'PDF',
      pages: 12,
      fileSize: '4.5 Mo',
      description: '',
      badge: 'Nouveau'
    });
  };

  const handleDownload = (item) => {
    const content = `Îlot Musique Alger - Document Pédagogique\nTitre: ${item.title}\nAuteur: ${item.author}\nInstrument: ${item.instrument}\nFormat: ${item.format}\nLicence réservée aux élèves et enseignants de l'Îlot Musique Alger.`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.title.replace(/\s+/g, '_')}_IlotMusique.${item.format === 'MP3' ? 'mp3' : 'pdf'}`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Téléchargement de "${item.title}" lancé !`);
  };

  return (
    <div className="space-y-6">
      
      {/* Light Luminous Library Banner */}
      <div className="bg-gradient-to-r from-[#FFFDF9] via-[#FAF4EA] to-[#FFFDF9] text-music-ink p-6 rounded-3xl shadow-soft border border-music-border relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
                Fonds Documentaire & Partitions
              </span>
              <span className="text-xs text-music-inkMuted font-semibold">Îlot Musique Alger</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold mt-1 text-music-ink">
              Médiathèque Pédagogique & Partitions d'Étude
            </h2>
            <p className="text-xs text-music-inkMuted mt-1 max-w-2xl leading-relaxed">
              Consultez et téléchargez les partitions de piano, violon, guitare, luth oriental (Oud), les méthodes complètes et exercices de solfège recommandés par le conservatoire.
            </p>
          </div>

          {role === 'admin' && (
            <button
              onClick={() => setIsAddOpen(true)}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-music-gold hover:bg-music-goldHover text-white font-bold text-xs shadow-xs transition shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter une Ressource</span>
            </button>
          )}
        </div>
      </div>

      {/* Search & Filtering Bar (Light theme) */}
      <div className="bg-white p-5 rounded-3xl border border-music-border shadow-soft space-y-3">
        
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-music-inkLight absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par titre, compositeur, méthode..."
              className="w-full pl-9 pr-3 py-2 rounded-2xl border border-music-border text-xs focus:outline-none focus:ring-2 focus:ring-music-gold bg-music-paper"
            />
          </div>

          {/* Instrument Filter */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <span className="text-xs text-music-inkMuted font-bold mr-1 flex items-center">
              <Filter className="w-3 h-3 mr-1" /> Instrument:
            </span>
            {['Tous', ...instrumentCategories].map(inst => (
              <button
                key={inst}
                onClick={() => setSelectedInstrument(inst)}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedInstrument === inst
                    ? 'bg-music-ink text-white shadow-xs'
                    : 'bg-music-card text-music-inkMuted hover:bg-music-parchment'
                }`}
              >
                {inst}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 pt-2 border-t border-music-borderLight overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-music-gold text-white shadow-xs'
                  : 'bg-music-card text-music-inkMuted hover:bg-music-parchment'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-xs text-music-inkLight ml-auto font-mono font-medium">
            {filteredItems.length} ressource{filteredItems.length > 1 ? 's' : ''}
          </span>
        </div>

      </div>

      {/* Grid of Documents */}
      {filteredItems.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-music-border text-center text-music-inkLight text-xs">
          Aucun document ne correspond à vos critères de recherche.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-music-border p-6 shadow-soft hover:shadow-card hover:border-music-gold/60 transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    item.category === 'Partitions'
                      ? 'bg-blue-100 text-blue-950 border border-blue-200'
                      : item.category === 'Livres'
                      ? 'bg-purple-100 text-purple-950 border border-purple-200'
                      : item.category === 'Audios'
                      ? 'bg-emerald-100 text-emerald-950 border border-emerald-200'
                      : 'bg-amber-100 text-amber-950 border border-amber-200'
                  }`}>
                    {item.category}
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-music-card text-music-ink font-mono border border-music-border">
                    {item.fileSize}
                  </span>
                </div>

                <h3 className="font-display font-bold text-music-ink text-base group-hover:text-music-gold transition leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-music-inkMuted mt-1 font-medium">
                  {item.author} • <span className="text-music-ink font-bold">{item.instrument}</span> ({item.level})
                </p>

                <p className="text-xs text-music-inkMuted mt-3 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-music-borderLight flex items-center justify-between text-xs">
                <span className="text-music-inkLight font-mono text-[11px]">
                  {item.format} {item.pages > 0 && `• ${item.pages} p.`}
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setDocumentToView(item)}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-music-card hover:bg-music-parchment text-music-ink font-bold transition border border-music-border"
                  >
                    <Eye className="w-3.5 h-3.5 text-music-gold" />
                    <span>Consulter</span>
                  </button>

                  <button
                    onClick={() => handleDownload(item)}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-music-gold hover:bg-music-goldHover text-white font-bold transition shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Télécharger</span>
                  </button>

                  {role === 'admin' && (
                    <button
                      onClick={() => {
                        if (confirm(`Supprimer la ressource "${item.title}" ?`)) {
                          deleteLibraryItem(item.id);
                        }
                      }}
                      className="p-1.5 rounded-xl text-music-inkLight hover:text-rose-600 transition"
                      title="Supprimer la ressource"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Admin Add Resource Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#FFFDFB] rounded-3xl w-full max-w-lg shadow-elevated p-6 border border-music-border text-music-ink">
            <div className="flex justify-between items-center pb-3 border-b border-music-borderLight mb-4">
              <h3 className="font-display font-bold text-base text-music-ink">
                Ajouter une Ressource Pédagogique
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="text-music-inkLight hover:text-music-ink"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateResource} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-music-ink mb-1">Titre du document *</label>
                <input
                  type="text"
                  required
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="Ex: Méthode d'Initiation au Violon..."
                  className="w-full px-3 py-2 rounded-xl border border-music-border text-xs focus:ring-2 focus:ring-music-gold bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-music-ink mb-1">Catégorie</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl border border-music-border text-xs bg-white"
                  >
                    <option value="Partitions">Partitions</option>
                    <option value="Livres">Livres & Méthodes</option>
                    <option value="Théorie & Solfège">Théorie & Solfège</option>
                    <option value="Audios">Audios & Play-Along</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-music-ink mb-1">Instrument</label>
                  <select
                    value={newItem.instrument}
                    onChange={(e) => setNewItem({ ...newItem, instrument: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl border border-music-border text-xs bg-white"
                  >
                    <option value="Tous">Tous instruments</option>
                    {instrumentCategories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-music-ink mb-1">Auteur / Compositeur</label>
                  <input
                    type="text"
                    value={newItem.author}
                    onChange={(e) => setNewItem({ ...newItem, author: e.target.value })}
                    placeholder="Ex: J.S. Bach, Ernest Van de Velde..."
                    className="w-full px-3 py-2 rounded-xl border border-music-border text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-music-ink mb-1">Niveau</label>
                  <select
                    value={newItem.level}
                    onChange={(e) => setNewItem({ ...newItem, level: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl border border-music-border text-xs bg-white"
                  >
                    <option value="Tous niveaux">Tous niveaux</option>
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-music-ink mb-1">Format</label>
                  <select
                    value={newItem.format}
                    onChange={(e) => setNewItem({ ...newItem, format: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl border border-music-border text-xs bg-white"
                  >
                    <option value="PDF">PDF</option>
                    <option value="PDF + Audio">PDF + Audio</option>
                    <option value="MP3">MP3</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-music-ink mb-1">Nombre de pages</label>
                  <input
                    type="number"
                    value={newItem.pages}
                    onChange={(e) => setNewItem({ ...newItem, pages: Number(e.target.value) })}
                    className="w-full px-2 py-2 rounded-xl border border-music-border text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-music-ink mb-1">Taille fichier</label>
                  <input
                    type="text"
                    value={newItem.fileSize}
                    onChange={(e) => setNewItem({ ...newItem, fileSize: e.target.value })}
                    placeholder="Ex: 8.5 Mo"
                    className="w-full px-2 py-2 rounded-xl border border-music-border text-xs bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-music-ink mb-1">Description pédagogique</label>
                <textarea
                  rows="2"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Objectif d'apprentissage, conseils..."
                  className="w-full px-3 py-2 rounded-xl border border-music-border text-xs bg-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl text-music-inkMuted hover:bg-music-card"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-music-gold text-white font-bold hover:bg-music-goldHover transition shadow-xs"
                >
                  Ajouter à la bibliothèque
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
