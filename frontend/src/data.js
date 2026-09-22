export const WHATSAPP_NUMBER = "6282149919150"; // TODO: ganti dengan nomor WhatsApp Jiddan (JA)
export const EMAIL = "noxjms@gmail.com";
export const LINKEDIN = "https://www.linkedin.com/in/jiddan-armansyiah/";
export const LOCATION = "Malang, Jawa Timur, Indonesia";
// Kosong / tidak diset -> same-origin "/api" (mis. saat deploy di Vercel).
export const API_URL = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;

export const NAV_IDS = ["home", "about", "education", "experience", "organization", "skills", "portfolio", "achievements", "contact"];

export const content = {
  preloader: { tagline: "Menjembatani bisnis lintas negara…" },
  nav: { home: "Beranda", about: "Tentang", education: "Pendidikan", experience: "Pengalaman", organization: "Organisasi", skills: "Keahlian", portfolio: "Portofolio", achievements: "Prestasi", contact: "Kontak" },
  hero: {
    greeting: "Halo, saya",
    name: "Mochammad Jiddan Armansyiah",
    roles: ["Manajemen Informatika"],
    sub: "Memiliki bekal di jenjang pendidikan di  Politeknik LP3I Jakarta, dengan minat pada IT Support, Developer Website, Jaringan Komputer, dan Hardware Ethusiast.",
    viewWork: "Lihat Project Saya Dikembangkan",
    downloadCv: "Unduh CV",
    scroll: "Gulir Kebawah :)",
    portraitAlt: "Potret Mochammad Jiddan Armansyiah (JA)",
    portraitNote: "Foto profesional — segera hadir",
    cards: [
      { icon: "grad", title: "Lulus 2027", sub: "Politeknik LP3I Jakarta" },
      { icon: "globe", title: "Lulus 2024", sub: "SMK Tel. Telesandi Bekasi" },
      { icon: "star", title: "IPK 3,69 / 4,00", sub: "Manajemen Informatika" },
    ],
  },
  marquee: ["Perdagangan Internasional", "Penerjemahan Hukum", "Layanan Keimigrasian", "Logistik Global", "Korespondensi Bisnis", "Komunikasi Lintas Budaya"],
  about: {
    num: "01", title: "Tentang Saya", sub: "Jembatan antara teknologi, sistem informasi, dan solusi digital.",
    paragraphs: [
      "Saya memiliki latar belakang pendidikan di bidang Manajemen Informatika dari Politeknik LP3I Jakarta, dengan minat dan dedikasi mendalam pada bidang IT Support, Web Development, Jaringan Komputer, dan Hardware Enthusiast.",
      "Melalui pembelajaran berbasis praktik dan aplikatif, saya terbiasa menangani troubleshooting perangkat keras & lunak, konfigurasi dan pemeliharaan jaringan komputer, serta pengembangan website yang terstruktur dan responsif. Pengalaman ini melatih pemecahan masalah teknis secara cepat dan sistematis.",
      "Kini, saya siap membawa bekal keahlian teknis dan komitmen ini ke dunia profesional untuk berkontribusi secara optimal dalam menjaga keandalan infrastruktur TI dan menghadirkan solusi teknologi yang tepat guna.",
    ],
    infoTitle: "Sekilas tentang saya",
    info: [
      { k: "Nama", v: "Mochammad Jiddan Armansyiah" },
      { k: "Program Studi", v: "Manajemen Informatika" },
      { k: "Universitas", v: "Politeknik LP3I Jakarta" },
      { k: "Domisili", v: "Bekasi, Jawa Barat, Indonesia" },
    ],

    photoCaption: "Foto Saya ketika di sebuah kafe di galaxy",
    photoNote: "Foto segera hadir",
  },
  education: {
    num: "02", title: "Pendidikan", sub: "Fondasi di bidang manajemen informatika, teknik komputer jaringan, dan teknologi digital.",
    items: [
      {
        school: "Politeknik LP3I Jakarta", location: "Jakarta, Indonesia", period: "2024 – 2027",
        degree: "Manajemen Informatika", extra: "IPK 3,69 / 4,00",
        image: "/assets/lp3i-jakarta.png",
        bullets: [
          "Studi perancangan sistem informasi, algoritma pemrograman, dan pengembangan aplikasi berbasis web & basis data.",
          "Praktik pengelolaan basis data relasional (SQL), perancangan antarmuka aplikasi, serta integrasi sistem informasi bisnis.",
          "Konfigurasi dan pemeliharaan infrastruktur TI, administrasi jaringan komputer, serta penanganan troubleshooting perangkat keras dan lunak.",
        ],
        tags: ["Manajemen Informatika", "Web Development", "Database Management", "IT Support", "Jaringan Komputer", "Troubleshooting"],
        note: "Program Diploma III (D3) Manajemen Informatika — Fokus pada Solusi Digital & Infrastruktur TI.",
      },
      {
        school: "SMK Telekomunikasi Telesandi Bekasi", location: "Bekasi, Jawa Barat", period: "2021 – 2024",
        degree: "Teknik Komputer dan Jaringan", extra: "Lulus 2024",
        image: "/assets/smk-telesandi.png",
        bullets: [
          "Konfigurasi dan pemeliharaan arsitektur jaringan komputer lokal (LAN) maupun Wide Area Network (WAN).",
          "Praktik instalasi perangkat jaringan, routing & switching MikroTik dan Cisco, serta manajemen bandwidth.",
          "Perakitan PC, instalasi sistem operasi workstation/server, pengujian kabel jaringan (UTP & Fiber Optic), serta troubleshooting sistem komputer.",
        ],
        tags: ["Teknik Komputer & Jaringan", "MikroTik", "Cisco Routing & Switching", "Instalasi Jaringan LAN/WAN", "Perakitan PC & Server"],
      },
      {
        school: "SMPIT Mutiara Hikmah", location: "Bekasi, Jawa Barat", period: "2018 – 2021",
        degree: "Pendidikan Sekolah Menengah Pertama", extra: "Lulus 2021",
        image: "/assets/smpit-mutiara-hikmah.jpg",
        bullets: [
          "Menyelesaikan jenjang pendidikan menengah pertama dengan fondasi akademik yang kuat dan pembentukan karakter disiplin.",
          "Mempelajari dasar-dasar teknologi informasi, pengenalan aplikasi komputer, serta aktif dalam kegiatan kepemimpinan dan organisasi sekolah.",
        ],
        tags: ["Pendidikan Menengah Pertama", "Dasar Komputer & TI", "Pengembangan Karakter"],
      },
    ],
  },
  experience: {
    num: "03", title: "Pengalaman Magang", sub: "Pengalaman praktis di bidang IT support, konfigurasi jaringan, dan pemeliharaan infrastruktur komputer.",
    items: [
      {
        company: "Politeknik LP3I Jakarta Pusat", location: "Jakarta Pusat", role: "IT Support", period: "November 2025 – Mei 2026", featured: true,
        icon: "laptop",
        desc: "Bertanggung jawab atas dukungan teknis harian bagi staf dan civitas akademika, instalasi dan pemeliharaan jaringan lokal (LAN), troubleshooting hardware dan software, serta pengelolaan fasilitas laboratorium komputer.",
        tasks: [
          "Bagian IT Support",
          "Instalasi Jaringan Komputer",
          "Troubleshooting software dan hardware",
          "Mengelola dan melakukan pemeliharaan fasilitas laboratorium komputer",
        ],
        tags: ["IT Support", "Instalasi Jaringan", "Troubleshooting", "Hardware & Software", "Lab Komputer"],
      },
      {
        company: "Pusdatin Kemendikdasmen", location: "Jakarta", role: "Subkoordinator Infrastruktur", period: "Januari – Maret 2022", featured: false,
        icon: "network",
        desc: "Mendukung divisi infrastruktur teknologi informasi Pusat Data dan Informasi (Pusdatin) dalam pelaksanaan konfigurasi jaringan komputer serta peninjauan dan evaluasi dokumen teknis.",
        tasks: [
          "Bagian Subkoordinator Infrastruktur",
          "Melakukan kegiatan Konfigurasi Jaringan",
          "Melakukan peninjauan dokumen",
        ],
        tags: ["Pusdatin", "Infrastruktur Jaringan", "Konfigurasi Jaringan", "Peninjauan Dokumen"],
      },
    ],
  },
  org: {
    num: "04", title: "Pengalaman Organisasi", sub: "Kepemimpinan di komunitas teknologi, pembinaan anggota, dan penyelenggaraan workshop IT.",
    tabs: [
      { id: "all", label: "Semua" },
      { id: "gallery", label: "Dokumentasi Foto Kegiatan" },
      { id: "leadership", label: "Peran & Tanggung Jawab" },
    ],
    club: {
      name: "LP3I Computer Club (LCC)",
      shortName: "LCC",
      role: "Ketua Umum",
      period: "2025 – Sekarang",
      campus: "Politeknik LP3I Jakarta",
      desc: "Memimpin LP3I Computer Club (LCC) sebagai wadah eksplorasi teknologi, pelatihan praktis, dan kolaborasi bagi mahasiswa dalam bidang IT support, sistem operasi Linux, jaringan komputer, perakitan hardware, dan pengembangan perangkat lunak.",
      highlights: [
        { label: "Organisasi", val: "LP3I Computer Club (LCC)" },
        { label: "Jabatan", val: "Ketua Umum" },
        { label: "Institusi", val: "Politeknik LP3I Jakarta" },
        { label: "Periode", val: "2025 – Sekarang" },
      ],
      tags: ["Ketua Umum", "LP3I Computer Club", "Linux & Open Source", "Troubleshooting PC", "Workshop Daring & Luring"],
    },
    roles: [
      {
        icon: "shield",
        title: "Kepemimpinan & Tata Kelola Organisasi",
        period: "2024 – Sekarang",
        desc: "Mengoordinasikan struktur kepengurusan, memimpin rapat kerja rutin, merancang arah kebijakan komunitas, serta menjaga keharmonisan dan keaktifan seluruh anggota LCC.",
      },
      {
        icon: "terminal",
        title: "Instruktur Workshop & Pemateri Pelatihan",
        period: "2025 – Sekarang",
        desc: "Menginisiasi dan menjadi pemateri pada workshop teknologi, termasuk sesi pengenalan sistem operasi Linux (Debian 11) di VMware Workstation dan manajemen perangkat lunak.",
      },
      {
        icon: "users",
        title: "Mentoring Teknis & Pendampingan 1-on-1",
        period: "2025 – Sekarang",
        desc: "Memberikan bimbingan langsung kepada anggota di lab komputer terkait diagnosa hardware, instalasi tools praktikum, serta problem solving kendala teknis.",
      },
      {
        icon: "cpu",
        title: "Pengelolaan Lab & Kegiatan Praktik TI",
        period: "2025 – Sekarang",
        desc: "Memfasilitasi sesi praktik komputer tatap muka di lab, memastikan kesiapan perangkat kerja, serta mendorong anggota untuk aktif bereksplorasi di bidang teknologi.",
      },
    ],
    gallery: [
      {
        id: "classroom",
        title: "Pertemuan Anggota & Workshop di Lab Komputer",
        tag: "Workshop Tatap Muka",
        image: "/assets/lcc/lcc-classroom.jpg",
        desc: "Memimpin sesi perkumpulan rutin dan pemaparan materi di hadapan seluruh anggota LP3I Computer Club di laboratorium komputer kampus.",
      },
      {
        id: "mentoring",
        title: "Mentoring Teknis & Bimbingan Praktik 1-on-1",
        tag: "Mentoring Anggota",
        image: "/assets/lcc/lcc-mentoring.jpg",
        desc: "Membimbing anggota secara langsung dalam konfigurasi laptop/PC, diagnosa perangkat keras, dan penyelesaian tugas-tugas praktikum TI.",
      },
      {
        id: "webinar-linux",
        title: "Pemateri Daring: Pengenalan Linux & Debian 11",
        tag: "Sesi Google Meet",
        image: "/assets/lcc/lcc-webinar-linux.jpg",
        desc: "Menjadi pemateri utama dalam sesi daring Google Meet 'Pengenalan Linux' dan instalasi Debian 11 pada VMware Workstation untuk anggota LCC.",
      },
      {
        id: "presentation",
        title: "Presentasi Visi & Evaluasi Program Kerja LCC",
        tag: "Kepemimpinan Organisasi",
        image: "/assets/lcc/lcc-presentation.jpg",
        desc: "Mempresentasikan arah program kerja, materi pengembangan komunitas, dan evaluasi kegiatan club di depan proyektor kepada anggota.",
      },
    ],
  },
  skills: {
    num: "05", title: "Keahlian", sub: "Perangkat di balik komunikasi yang baik.",
    langTitle: "Kemampuan Bahasa", profTitle: "Keahlian Profesional", softTitle: "Soft Skills", toolsTitle: "Tools",
    languages: [
      { name: "Bahasa Inggris", pct: 90, note: "Mahir — skor CEFR / TOEFL menyusul", aspects: ["Speaking", "Writing", "Listening", "Reading"] },
      { name: "Bahasa Indonesia", pct: 100, note: "Native", aspects: [] },
    ],
    professional: [
      { icon: "briefcase", label: "Komunikasi Bisnis" },
      { icon: "languages", label: "Penerjemahan & Dokumentasi Legal/Profesional" },
      { icon: "pen", label: "Report Writing & Penyusunan Kebijakan" },
      { icon: "mic", label: "Public Speaking & Moderasi" },
      { icon: "calendar", label: "Perencanaan & Koordinasi Acara" },
      { icon: "clipboard", label: "Manajemen Administrasi" },
      { icon: "boxes", label: "Manajemen Inventaris & Logistik" },
    ],
    soft: ["Kepemimpinan", "Kolaborasi Tim", "Komunikasi Lintas Budaya", "Pemecahan Masalah", "Manajemen Waktu", "Inisiatif & Tanggung Jawab", "Adaptabilitas"],
    tools: ["Microsoft Office Suite", "Google Workspace", "Canva", "CapCut", "Zoom / Teams"],
  },
  portfolio: {
    num: "06", title: "Portofolio", sub: "Karya pilihan di bidang penulisan, bisnis, media, dan acara.",
    filters: [
      { id: "all", label: "Semua" },
      { id: "writing", label: "Penulisan & Penerjemahan" },
      { id: "business", label: "Dokumen Bisnis" },
      { id: "media", label: "Media & Kampanye" },
      { id: "events", label: "Acara & Kepemimpinan" },
    ],
    viewDetails: "Lihat Detail",
    closeLabel: "Tutup",
    modalLabels: { background: "Latar Belakang", role: "Peran Saya", outcome: "Hasil", deliverable: "Berkas" },
    pending: "Berkas sedang disiapkan — tersedia atas permintaan",
    items: [
      { id: "essay", cat: "writing", title: "Bridging the Gap: Addressing Indonesia's Digital Divide through E-Commerce", desc: "Esai bilingual untuk Indonesia Future Development Project.", background: "Ditulis selama program IISMA di UWA untuk mengkaji peran e-commerce dalam menutup kesenjangan digital Indonesia.", role: "Peneliti, penulis, dan editor — dalam bahasa Inggris dan Indonesia.", outcome: "Esai bilingual yang rampung dan diserahkan untuk Indonesia Future Development Project (Okt–Nov 2024)." },
      { id: "translation", cat: "writing", title: "Sampel Terjemahan EN–ID / ID–EN", desc: "Kumpulan tugas penerjemahan, versi disamarkan.", background: "Tugas penerjemahan dari program studi Bahasa Inggris untuk Komunikasi Bisnis & Profesional.", role: "Penerjemah sekaligus self-editor.", outcome: "Terjemahan akurat dengan register yang tepat untuk teks bisnis dan legal." },
      { id: "correspondence", cat: "business", title: "Paket Email Bisnis, Surat Formal & Laporan", desc: "Sampel tugas penulisan bisnis profesional.", background: "Latihan korespondensi bisnis: email, surat formal, dan laporan terstruktur.", role: "Penulis.", outcome: "Paket lengkap yang menunjukkan nada profesional, struktur, dan kejernihan." },
      { id: "bizplan", cat: "business", title: "2nd Best Business Plan Idea (2022)", desc: "Penghargaan dari Pre-Study Department of Business Administration.", background: "Kompetisi business plan yang diselenggarakan Pre-Study Department of Business Administration.", role: "Ideasi dan pitching.", outcome: "Juara 2 Best Business Plan Idea, 2022." },
      { id: "internship", cat: "business", title: "Laporan Magang — PT Modern Mitra Sejati", desc: "Versi non-rahasia laporan magang industri ekspor.", background: "Laporan akhir magang 5 bulan di eksportir frozen seafood dengan pasar Jepang, Malaysia, dan Hong Kong.", role: "Intern — dukungan dokumentasi dan korespondensi.", outcome: "Laporan terstruktur tentang operasi, alur ekspor, dan logistik cold storage (versi non-rahasia)." },
      { id: "zerohunger", cat: "media", title: "IISMA Social Campaign: Zero Hunger", desc: "Materi komunikasi digital dan konten visual.", background: "Kampanye sosial IISMA untuk meningkatkan kesadaran Zero Hunger (Mei–Jun 2024).", role: "Anggota tim Media & Communications.", outcome: "Konten kampanye digital yang tayang dan terkoordinasi dengan media partner." },
      { id: "tiktok", cat: "media", title: "Video TikTok — Arrayan Executive Village", desc: "Most Creative Promotion, Batu (2023).", background: "Kompetisi video promosi untuk Arrayan Executive Village, Batu.", role: "Konsep kreatif dan produksi.", outcome: "Meraih Most Creative Promotion, 2023." },
      { id: "nightgathering", cat: "events", title: "Night Gathering & English Sport Competition", desc: "Konsep, rundown, dan dokumentasi acara tahunan.", background: "Acara tahunan unggulan English Department, dipimpin pada 2022 dan 2023.", role: "Chief Committee (2023) — menyusun konsep kedua acara dan mengoordinasi koordinator divisi.", outcome: "Dua edisi berjalan sukses dengan rundown lengkap dan koordinasi lintas divisi." },
      { id: "mcbooth", cat: "events", title: "MC Freshmen Gathering & Booth Culturise", desc: "Sorotan moderasi panggung dan desain pameran.", background: "Tugas MC di Freshmen Gathering 2023 dan desain booth untuk Culturise Challenge di UWA.", role: "Master of Ceremony; anggota divisi Event & Exhibition.", outcome: "Moderasi langsung yang lancar dan booth kuliner Indonesia yang diminati di Perth." },
    ],
  },
  achievements: {
    num: "07", title: "Prestasi & Sertifikat", sub: "Apresiasi di sepanjang perjalanan.",
    volunteeringTitle: "Kegiatan Relawan",
    items: [
      { title: "Student with Highest Achievement Index", issuer: "Politeknik Negeri Malang", year: "Semester Ganjil 2023/2024" },
      { title: "Student with Highest Achievement Index", issuer: "Politeknik Negeri Malang", year: "Semester Ganjil 2022/2023" },
      { title: "Most Creative Promotion — TikTok Video Competition", issuer: "Arrayan Executive Village, Batu", year: "2023" },
      { title: "2nd Best Business Plan Idea", issuer: "Pre-Study Department of Business Administration", year: "2022" },
      { title: "IISMA Webinar with Edupact", issuer: "Peserta Webinar", year: "20 Januari 2024" },
      { title: "Workshop — Stronger Spine & Better Posture: Relieve Neck & Back Pain Through Pilates", issuer: "Daniel Choi · Pilates Instructor at Active by FeelFit, FeelFit Journey", year: "29 November 2025" },
      { title: "Workshop — Corrective Pilates Masterclass", issuer: "Daniel Choi · Pilates Instructor at Active by FeelFit, FeelFit Journey", year: "25 April 2026" },
    ],
    volunteering: [
      { title: "Universal Open 2026 International Billiard Tournament", year: "Jakarta · 25–28 Jun 2026" },
      { title: "Panti Asuhan Darul Jundi", year: "2025" },
      { title: "Perth Running Festival", year: "2024" },
      { title: "UWA Booksale — Save the Children Australia", year: "2024" },
    ],
  },
  contact: {
    num: "08", title: "Mari membangun jembatan bersama.",
    sub: "Terbuka untuk peran entry-level di perdagangan internasional, penerjemahan hukum, layanan keimigrasian, dan logistik global — atau sekadar mengobrol santai.",
    whatsappTitle: "Chat via WhatsApp",
    whatsappSub: "Cara tercepat menghubungi saya — biasanya dibalas dalam sehari.",
    quickLabel: "Tulis pesan singkat (opsional)",
    quickPlaceholder: "Halo Jiddan, saya melihat portofoliomu dan…",
    send: "Buka WhatsApp",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    locationLabel: "Lokasi",
  },
  footer: {
    tagline: "Menjembatani bisnis lintas negara melalui komunikasi yang jernih dan profesional.",
    explore: "Jelajahi", connect: "Terhubung",
    rights: "© 2026 Mochammad Jiddan Armansyiah.",
    backTop: "Kembali ke atas",
  },
};

content.id = content;
content.en = content;
