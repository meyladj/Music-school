/**
 * Score / Sheet Music Download & Print Utility for Îlot Musique Alger
 * Generates an official, printable conservatory sheet music score with tipps, exercises, and staves.
 */

export function downloadPieceScore(piece, studentName = 'Apprenant') {
  if (!piece) return;

  const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>${piece.title} — Partition Officielle Îlot Musique Alger</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm 15mm 15mm 15mm;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      background: #FFFFFF;
      color: #1a1a1a;
      margin: 0;
      padding: 24px;
      line-height: 1.5;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #C28422;
      padding-bottom: 12px;
      margin-bottom: 24px;
    }
    .brand-title {
      font-family: Georgia, serif;
      font-size: 20px;
      font-weight: bold;
      color: #1a1a1a;
      letter-spacing: -0.5px;
    }
    .brand-subtitle {
      font-size: 11px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .piece-header {
      text-align: center;
      margin-bottom: 24px;
    }
    .piece-title {
      font-size: 26px;
      font-weight: bold;
      margin: 0 0 6px 0;
      color: #111;
    }
    .piece-composer {
      font-size: 15px;
      font-style: italic;
      color: #444;
      margin-bottom: 12px;
    }
    .meta-badges {
      display: flex;
      justify-content: center;
      gap: 12px;
      font-size: 11px;
      font-family: sans-serif;
      margin-bottom: 16px;
    }
    .badge {
      background: #FAF5EB;
      border: 1px solid #E2D4B7;
      padding: 4px 10px;
      border-radius: 6px;
      font-weight: bold;
      color: #8C5300;
    }
    .stave-container {
      margin: 20px 0;
      background: #FFFDF9;
      border: 1px solid #EAE0D0;
      border-radius: 12px;
      padding: 20px;
    }
    .stave-line {
      display: flex;
      align-items: center;
      margin-bottom: 22px;
      position: relative;
    }
    .stave-svg {
      width: 100%;
      height: 60px;
    }
    .tips-box {
      background: #FFFDF5;
      border: 1.5px solid #F0DAA4;
      border-radius: 12px;
      padding: 16px;
      margin-top: 24px;
      page-break-inside: avoid;
    }
    .tips-title {
      font-family: sans-serif;
      font-size: 13px;
      font-weight: bold;
      color: #8C5300;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .tips-list {
      margin: 0;
      padding-left: 18px;
      font-size: 12px;
      color: #2D2314;
    }
    .tips-list li {
      margin-bottom: 5px;
    }
    .exercises-box {
      background: #F4F9F6;
      border: 1.5px solid #BDDFCE;
      border-radius: 12px;
      padding: 16px;
      margin-top: 18px;
      page-break-inside: avoid;
    }
    .exercises-title {
      font-family: sans-serif;
      font-size: 13px;
      font-weight: bold;
      color: #1B5E45;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .exercise-item {
      font-size: 12px;
      margin-bottom: 8px;
      padding-bottom: 8px;
      border-bottom: 1px dashed #D0E5DB;
    }
    .exercise-item:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .footer {
      margin-top: 32px;
      border-top: 1px solid #DDD;
      padding-top: 12px;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      font-family: sans-serif;
      color: #777;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>

  <!-- Academy Header -->
  <div class="header">
    <div>
      <div class="brand-title">ÎLOT MUSIQUE ALGER</div>
      <div class="brand-subtitle">Conservatoire & École de Musique Privée • Partition Pédagogique</div>
    </div>
    <div style="text-align: right; font-family: sans-serif; font-size: 11px; color: #555;">
      Dossier Apprenant : <strong>${studentName}</strong><br>
      Édition Officielle 2026/2027
    </div>
  </div>

  <!-- Piece Title & Info -->
  <div class="piece-header">
    <h1 class="piece-title">${piece.title}</h1>
    <div class="piece-composer">${piece.composer || 'Traditionnel'}</div>
    <div class="meta-badges">
      <span class="badge">Tonalité : ${piece.key || 'Do Majeur'}</span>
      <span class="badge">Tempo : ${piece.tempo || 'Moderato'}</span>
      <span class="badge">Niveau : ${piece.difficulty || 'Intermédiaire'}</span>
    </div>
  </div>

  <!-- Musical Staves Representation -->
  <div class="stave-container">
    <!-- Stave System 1 -->
    <div class="stave-line">
      <svg class="stave-svg" viewBox="0 0 700 60">
        <!-- 5 Stave lines -->
        <line x1="0" y1="10" x2="700" y2="10" stroke="#333" stroke-width="1.2"/>
        <line x1="0" y1="20" x2="700" y2="20" stroke="#333" stroke-width="1.2"/>
        <line x1="0" y1="30" x2="700" y2="30" stroke="#333" stroke-width="1.2"/>
        <line x1="0" y1="40" x2="700" y2="40" stroke="#333" stroke-width="1.2"/>
        <line x1="0" y1="50" x2="700" y2="50" stroke="#333" stroke-width="1.2"/>
        <!-- Treble Clef -->
        <text x="10" y="44" font-family="serif" font-size="38" fill="#1a1a1a">𝄞</text>
        <!-- Time signature -->
        <text x="42" y="28" font-family="sans-serif" font-weight="bold" font-size="14" fill="#111">4</text>
        <text x="42" y="45" font-family="sans-serif" font-weight="bold" font-size="14" fill="#111">4</text>
        <!-- Measure Bar 1 -->
        <line x1="200" y1="10" x2="200" y2="50" stroke="#333" stroke-width="1.5"/>
        <circle cx="80" cy="30" r="5" fill="#111"/><line x1="85" y1="30" x2="85" y2="2" stroke="#111" stroke-width="1.5"/>
        <circle cx="115" cy="25" r="5" fill="#111"/><line x1="120" y1="25" x2="120" y2="2" stroke="#111" stroke-width="1.5"/>
        <circle cx="150" cy="20" r="5" fill="#111"/><line x1="155" y1="20" x2="155" y2="2" stroke="#111" stroke-width="1.5"/>
        <!-- Measure Bar 2 -->
        <line x1="360" y1="10" x2="360" y2="50" stroke="#333" stroke-width="1.5"/>
        <circle cx="230" cy="35" r="5" fill="#111"/><line x1="235" y1="35" x2="235" y2="8" stroke="#111" stroke-width="1.5"/>
        <circle cx="270" cy="30" r="5" fill="#111"/><line x1="275" y1="30" x2="275" y2="8" stroke="#111" stroke-width="1.5"/>
        <circle cx="310" cy="25" r="5" fill="#111"/><line x1="315" y1="25" x2="315" y2="8" stroke="#111" stroke-width="1.5"/>
        <!-- Measure Bar 3 -->
        <line x1="530" y1="10" x2="530" y2="50" stroke="#333" stroke-width="1.5"/>
        <circle cx="390" cy="20" r="5" fill="#111"/><line x1="395" y1="20" x2="395" y2="2" stroke="#111" stroke-width="1.5"/>
        <circle cx="435" cy="15" r="5" fill="#111"/><line x1="440" y1="15" x2="440" y2="2" stroke="#111" stroke-width="1.5"/>
        <circle cx="480" cy="20" r="5" fill="#111"/><line x1="485" y1="20" x2="485" y2="2" stroke="#111" stroke-width="1.5"/>
        <!-- Final Double Bar -->
        <line x1="692" y1="10" x2="692" y2="50" stroke="#333" stroke-width="1.5"/>
        <line x1="698" y1="10" x2="698" y2="50" stroke="#333" stroke-width="3"/>
      </svg>
    </div>

    <!-- Stave System 2 -->
    <div class="stave-line">
      <svg class="stave-svg" viewBox="0 0 700 60">
        <line x1="0" y1="10" x2="700" y2="10" stroke="#333" stroke-width="1.2"/>
        <line x1="0" y1="20" x2="700" y2="20" stroke="#333" stroke-width="1.2"/>
        <line x1="0" y1="30" x2="700" y2="30" stroke="#333" stroke-width="1.2"/>
        <line x1="0" y1="40" x2="700" y2="40" stroke="#333" stroke-width="1.2"/>
        <line x1="0" y1="50" x2="700" y2="50" stroke="#333" stroke-width="1.2"/>
        <text x="10" y="44" font-family="serif" font-size="38" fill="#1a1a1a">𝄞</text>
        <line x1="200" y1="10" x2="200" y2="50" stroke="#333" stroke-width="1.5"/>
        <circle cx="80" cy="25" r="5" fill="#111"/><line x1="85" y1="25" x2="85" y2="2" stroke="#111" stroke-width="1.5"/>
        <circle cx="120" cy="30" r="5" fill="#111"/><line x1="125" y1="30" x2="125" y2="2" stroke="#111" stroke-width="1.5"/>
        <circle cx="160" cy="35" r="5" fill="#111"/><line x1="165" y1="35" x2="165" y2="8" stroke="#111" stroke-width="1.5"/>
        <line x1="360" y1="10" x2="360" y2="50" stroke="#333" stroke-width="1.5"/>
        <circle cx="230" cy="20" r="5" fill="#111"/><line x1="235" y1="20" x2="235" y2="2" stroke="#111" stroke-width="1.5"/>
        <circle cx="280" cy="25" r="5" fill="#111"/><line x1="285" y1="25" x2="285" y2="2" stroke="#111" stroke-width="1.5"/>
        <circle cx="320" cy="30" r="5" fill="#111"/><line x1="325" y1="30" x2="325" y2="2" stroke="#111" stroke-width="1.5"/>
        <line x1="530" y1="10" x2="530" y2="50" stroke="#333" stroke-width="1.5"/>
        <circle cx="390" cy="35" r="5" fill="#111"/><line x1="395" y1="35" x2="395" y2="8" stroke="#111" stroke-width="1.5"/>
        <circle cx="435" cy="40" r="5" fill="#111"/><line x1="440" y1="40" x2="440" y2="10" stroke="#111" stroke-width="1.5"/>
        <circle cx="480" cy="30" r="5" fill="#111"/><line x1="485" y1="30" x2="485" y2="2" stroke="#111" stroke-width="1.5"/>
        <line x1="692" y1="10" x2="692" y2="50" stroke="#333" stroke-width="1.5"/>
        <line x1="698" y1="10" x2="698" y2="50" stroke="#333" stroke-width="3"/>
      </svg>
    </div>
  </div>

  <!-- Petits Tipps & Astuces de Pratique -->
  <div class="tips-box">
    <div class="tips-title">💡 Petits Tipps & Astuces de Pratique pour ce Morceau</div>
    <ul class="tips-list">
      ${(piece.tips && piece.tips.length > 0)
        ? piece.tips.map(t => `<li><strong>Conseil :</strong> ${t}</li>`).join('')
        : `
          <li><strong>Mains séparées :</strong> Travailler la main gauche seule avec métronome avant d'assembler les deux mains.</li>
          <li><strong>Doigtés & Posture :</strong> Respecter scrupuleusement les doigtés indiqués et garder les poignets souples.</li>
          <li><strong>Nuances :</strong> Soigner l'attaque des notes et marquer clairement les contrastes (pianissimo / forte).</li>
          ${piece.teacherNotes ? `<li><strong>Note du Professeur :</strong> « ${piece.teacherNotes} »</li>` : ''}
        `
      }
    </ul>
  </div>

  <!-- Exercices Personnalisés Dédiés -->
  <div class="exercises-box">
    <div class="exercises-title">🎯 Exercices Techniques Sur-Mesure</div>
    ${(piece.exercises && piece.exercises.length > 0)
      ? piece.exercises.map((ex, idx) => `
        <div class="exercise-item">
          <strong>Exercice ${idx + 1} : ${ex.title}</strong> (${ex.bars || ex.target || 'Passage clé'} — Tempo cible : ${ex.targetBpm || ex.bpm || 60} BPM)<br>
          <span style="color: #444;">${ex.notes || ex.advice || 'Travail d’articulation et de régularité rythmique.'}</span>
        </div>
      `).join('')
      : `
        <div class="exercise-item">
          <strong>Exercice 1 : Déchiffrage lent & pulsation</strong> (Mesures 1 à 16 — 60 BPM)<br>
          <span style="color: #444;">Travailler au métronome sans pédale pour garantir la précision rythmique.</span>
        </div>
        <div class="exercise-item">
          <strong>Exercice 2 : Enchaînement et dynamique musicale</strong> (Mesures 17 à 32 — 72 BPM)<br>
          <span style="color: #444;">Monter le tempo progressivement par paliers de 4 BPM dès que le passage est fluide.</span>
        </div>
      `
    }
  </div>

  <!-- Footer & Seal -->
  <div class="footer">
    <div>Îlot Musique Alger • 12, Rue Didouche Mourad / Hydra, Alger • Conservatoire Agréé</div>
    <div>Document réservé à l'usage personnel de l'élève • Reproduction interdite</div>
  </div>

  <script>
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>`;

  // Open printable score window
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  } else {
    // Fallback: direct HTML file download if popups blocked
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${piece.title.replace(/\s+/g, '_')}_Partition_IlotMusique.html`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
