const TOTAL_QUESTIONS = 10;
const MISSION_SECONDS = 5 * 60;
const HOTSPOT_RADIUS = 5;

const violations = [
  {
    id: 1,
    title: "Ayam mentah terbuka di meja penyediaan",
    tag: "Pencemaran silang",
    yaw: -113,
    pitch: -16,
    explanation: "Ayam mentah kelihatan diletakkan terbuka berhampiran bahan makanan lain. Jus ayam mentah boleh mencemarkan permukaan kerja dan makanan sedia dimakan.",
    question: "Apakah tindakan paling selamat untuk ayam mentah yang sedang disediakan?",
    options: [
      "Asingkan ayam mentah daripada makanan sedia dimakan dan sanitasi permukaan kerja",
      "Biarkan terbuka kerana ayam akan dimasak kemudian",
      "Letakkan salad di sebelah ayam supaya mudah dicapai",
      "Lap meja dengan kain kering sahaja selepas selesai"
    ],
    answer: 0
  },
  {
    id: 2,
    title: "Papan pemotong sangat kotor",
    tag: "Permukaan sentuhan makanan",
    yaw: -74,
    pitch: -21,
    explanation: "Papan pemotong di bahagian hadapan kelihatan mempunyai sisa makanan dan kotoran. Permukaan begini boleh menjadi tempat pembiakan bakteria.",
    question: "Apakah amalan betul selepas menggunakan papan pemotong yang kotor?",
    options: [
      "Cuci, bilas, sanitasi dan keringkan sebelum digunakan semula",
      "Terus gunakan untuk bahan lain jika masih basah",
      "Tutup kotoran dengan tisu",
      "Gunakan bahagian tepi papan sahaja"
    ],
    answer: 0
  },
  {
    id: 3,
    title: "Sayur dan makanan sedia dimakan terdedah",
    tag: "Makanan tidak bertutup",
    yaw: -128,
    pitch: -9,
    explanation: "Sayur dan bekas makanan terbuka berada berhampiran kawasan kerja aktif. Habuk, percikan dan tangan pekerja boleh mencemarkan makanan.",
    question: "Bagaimanakah makanan sedia dimakan patut dilindungi semasa penyediaan?",
    options: [
      "Tutup makanan atau simpan dalam bekas bersih bertutup apabila tidak digunakan",
      "Letakkan di sebelah sinki terbuka",
      "Campurkan dengan bahan mentah supaya cepat siap",
      "Biarkan terbuka untuk pengudaraan"
    ],
    answer: 0
  },
  {
    id: 4,
    title: "Lantai basah dan licin",
    tag: "Kebersihan premis",
    yaw: -23,
    pitch: -31,
    explanation: "Lantai di laluan kerja kelihatan basah dan kotor. Selain risiko tergelincir, air kotor boleh membawa pencemaran ke kawasan penyediaan makanan.",
    question: "Apakah tindakan segera apabila lantai dapur basah dan kotor?",
    options: [
      "Bersihkan, keringkan dan letakkan tanda amaran sehingga selamat",
      "Tolak air ke bawah meja kerja",
      "Biarkan kerana lantai dapur memang selalu basah",
      "Tutup air dengan kotak kosong"
    ],
    answer: 0
  },
  {
    id: 5,
    title: "Tong sampah terbuka dan melimpah",
    tag: "Pengurusan sisa",
    yaw: 8,
    pitch: -17,
    explanation: "Tong sampah di tengah dapur terbuka, penuh dan dikelilingi sisa. Keadaan ini menarik perosak serta mencemarkan udara dan lantai.",
    question: "Apakah kawalan terbaik untuk sisa makanan di dapur hotel?",
    options: [
      "Gunakan tong bertutup, kosongkan berkala dan bersihkan kawasan sekitar",
      "Biarkan tong terbuka supaya bau keluar",
      "Letakkan tong di tengah laluan kerja",
      "Padatkan sisa dengan tangan tanpa sarung tangan"
    ],
    answer: 0
  },
  {
    id: 6,
    title: "Sisa makanan bertaburan di lantai",
    tag: "Tarikan perosak",
    yaw: 22,
    pitch: -33,
    explanation: "Sisa seperti cebisan makanan kelihatan di lantai berhampiran tong sampah. Ini menunjukkan pembersihan tidak mencukupi dan boleh menarik perosak.",
    question: "Mengapa sisa makanan di lantai perlu dibersihkan segera?",
    options: [
      "Ia boleh menarik perosak dan menyebarkan pencemaran ke kawasan kerja",
      "Ia membantu lantai kurang licin",
      "Ia menandakan dapur sedang sibuk",
      "Ia boleh disapu pada hujung syif sahaja"
    ],
    answer: 0
  },
  {
    id: 7,
    title: "Botol sos atau bahan cecair tidak dilabel jelas",
    tag: "Pelabelan bahan",
    yaw: 45,
    pitch: -10,
    explanation: "Beberapa botol cecair di atas meja tidak kelihatan berlabel jelas. Cecair tanpa label boleh menyebabkan salah guna bahan, pencemaran kimia atau risiko alergen.",
    question: "Apakah keperluan asas untuk botol bahan makanan atau bahan kimia di dapur?",
    options: [
      "Labelkan kandungan dengan jelas dan simpan mengikut kategori yang betul",
      "Gunakan botol kosong tanpa label supaya nampak kemas",
      "Campurkan semua cecair dalam satu botol",
      "Letakkan botol berhampiran makanan terbuka tanpa pemeriksaan"
    ],
    answer: 0
  },
  {
    id: 8,
    title: "Tikus kelihatan di lantai dapur",
    tag: "Kawalan perosak",
    yaw: 83,
    pitch: -29,
    explanation: "Seekor tikus jelas kelihatan di kawasan lantai. Ini ialah pelanggaran serius kerana perosak boleh membawa patogen dan mencemarkan makanan.",
    question: "Apakah tindakan audit yang perlu dibuat apabila tikus dilihat di dapur?",
    options: [
      "Hentikan operasi kawasan terlibat, asingkan makanan, bersihkan dan aktifkan kawalan perosak",
      "Kejar tikus dan teruskan penyediaan makanan seperti biasa",
      "Tutup pintu sahaja tanpa rekod",
      "Sembur racun berhampiran makanan terbuka"
    ],
    answer: 0
  },
  {
    id: 9,
    title: "Makanan jatuh atau diletakkan di atas lantai",
    tag: "Pencemaran fizikal",
    yaw: 116,
    pitch: -32,
    explanation: "Longgokan mi atau makanan kelihatan di atas lantai. Makanan yang menyentuh lantai tidak boleh digunakan kerana risiko pencemaran sangat tinggi.",
    question: "Apakah tindakan betul untuk makanan yang sudah berada di atas lantai?",
    options: [
      "Lupuskan makanan tersebut dan bersihkan kawasan dengan segera",
      "Bilas dan gunakan semula jika kelihatan bersih",
      "Campurkan dalam hidangan berkuah",
      "Letakkan semula ke dalam dulang"
    ],
    answer: 0
  },
  {
    id: 10,
    title: "Makanan masak dan tin terbuka tidak dilindungi",
    tag: "Penyimpanan tidak selamat",
    yaw: 135,
    pitch: -14,
    explanation: "Di meja kanan, makanan masak dan tin terbuka kelihatan terdedah. Makanan terbuka mudah tercemar dan tin terbuka tidak sesuai untuk penyimpanan berpanjangan.",
    question: "Bagaimanakah makanan masak dan bahan daripada tin terbuka patut dikendalikan?",
    options: [
      "Pindahkan ke bekas makanan bertutup, labelkan dan simpan pada suhu selamat",
      "Simpan dalam tin asal yang terbuka sepanjang hari",
      "Letakkan berhampiran dapur panas tanpa penutup",
      "Campurkan semua baki makanan dalam satu bekas"
    ],
    answer: 0
  }
];

AFRAME.registerComponent("face-camera", {
  tick() {
    const camera = document.getElementById("camera");
    if (camera) this.el.object3D.lookAt(camera.object3D.position);
  }
});

const state = {
  started: false,
  finished: false,
  score: 0,
  answered: new Set(),
  secondsLeft: MISSION_SECONDS,
  timerId: null
};

const pages = [...document.querySelectorAll(".page")];
const navButtons = [...document.querySelectorAll(".nav-btn")];
const routeButtons = [...document.querySelectorAll("[data-page]")];
const splashScreen = document.getElementById("splashScreen");
const skipSplashBtn = document.getElementById("skipSplashBtn");
const hotspotLayer = document.getElementById("hotspotLayer");
const scoreText = document.getElementById("scoreText");
const progressText = document.getElementById("progressText");
const auditPercentText = document.getElementById("auditPercentText");
const timerText = document.getElementById("timerText");
const progressBar = document.getElementById("progressBar");
const statusText = document.getElementById("statusText");
const questionCard = document.getElementById("questionCard");
const violationTag = document.getElementById("violationTag");
const violationTitle = document.getElementById("violationTitle");
const violationExplain = document.getElementById("violationExplain");
const questionTitle = document.getElementById("questionTitle");
const optionsWrap = document.getElementById("options");
const feedback = document.getElementById("feedback");
const checklist = document.getElementById("checklist");
const resultCategory = document.getElementById("resultCategory");
const resultSummary = document.getElementById("resultSummary");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const vrBtn = document.getElementById("vrBtn");
const scene = document.getElementById("scene");

function showPage(pageId) {
  pages.forEach((page) => {
    page.classList.toggle("active", page.id === pageId);
  });
  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.page === pageId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function hideSplash() {
  splashScreen.classList.add("hide");
}

function yawPitchToPosition(yaw, pitch) {
  const yawRad = (yaw * Math.PI) / 180;
  const pitchRad = (pitch * Math.PI) / 180;
  const horizontalRadius = HOTSPOT_RADIUS * Math.cos(pitchRad);
  const x = horizontalRadius * Math.sin(yawRad);
  const y = 1.6 + HOTSPOT_RADIUS * Math.sin(pitchRad);
  const z = -horizontalRadius * Math.cos(yawRad);
  return `${x.toFixed(2)} ${y.toFixed(2)} ${z.toFixed(2)}`;
}

function buildHotspots() {
  hotspotLayer.innerHTML = "";

  violations.forEach((item) => {
    const marker = document.createElement("a-entity");
    marker.setAttribute("position", yawPitchToPosition(item.yaw, item.pitch));
    marker.setAttribute("face-camera", "");
    marker.setAttribute("data-id", item.id);

    const ring = document.createElement("a-ring");
    ring.classList.add("hotspot");
    ring.setAttribute("data-id", item.id);
    ring.setAttribute("radius-inner", "0.16");
    ring.setAttribute("radius-outer", "0.25");
    ring.setAttribute("color", "#39d5ff");
    ring.setAttribute("material", "shader: flat; opacity: 0.96");
    ring.setAttribute("animation", "property: scale; dir: alternate; dur: 850; easing: easeInOutSine; loop: true; to: 1.18 1.18 1.18");

    const dot = document.createElement("a-circle");
    dot.classList.add("hotspot");
    dot.setAttribute("data-id", item.id);
    dot.setAttribute("radius", "0.095");
    dot.setAttribute("color", "#ffffff");
    dot.setAttribute("position", "0 0 0.01");
    dot.setAttribute("material", "shader: flat");

    const label = document.createElement("a-text");
    label.classList.add("hotspot");
    label.setAttribute("data-id", item.id);
    label.setAttribute("value", item.id);
    label.setAttribute("align", "center");
    label.setAttribute("color", "#061323");
    label.setAttribute("width", "1.8");
    label.setAttribute("position", "0 -0.045 0.02");

    marker.append(ring, dot, label);
    [ring, dot, label].forEach((node) => {
      node.addEventListener("click", () => openQuestion(item.id));
    });
    hotspotLayer.appendChild(marker);
  });
}

function buildChecklist() {
  checklist.innerHTML = "";

  violations.forEach((item) => {
    const row = document.createElement("li");
    row.id = `check-${item.id}`;
    row.innerHTML = `<span>${item.id}. ${item.title}</span><strong>Belum</strong>`;
    checklist.appendChild(row);
  });
}

function startMission() {
  if (state.started) return;
  state.started = true;
  startBtn.disabled = true;
  startBtn.textContent = "Audit Sedang Berjalan";
  statusText.textContent = "Misi bermula. Tekan hotspot bernombor dan jawab semua soalan.";
  state.timerId = window.setInterval(tickTimer, 1000);
}

function openQuestion(id) {
  if (!state.started || state.finished) {
    statusText.textContent = "Tekan Mula Audit dahulu sebelum menjawab hotspot.";
    return;
  }

  const item = violations.find((entry) => entry.id === id);
  const alreadyAnswered = state.answered.has(id);

  questionCard.hidden = false;
  violationTag.textContent = `Hotspot ${item.id}: ${item.tag}`;
  violationTitle.textContent = item.title;
  violationExplain.textContent = item.explanation;
  questionTitle.textContent = item.question;
  feedback.textContent = alreadyAnswered ? "Item ini telah dijawab. Pilih hotspot lain untuk meneruskan audit." : "";
  optionsWrap.innerHTML = "";

  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.type = "button";
    button.textContent = option;
    button.disabled = alreadyAnswered;
    if (alreadyAnswered && index === item.answer) button.classList.add("correct");
    button.addEventListener("click", () => answerQuestion(item, index));
    optionsWrap.appendChild(button);
  });
}

function answerQuestion(item, selectedIndex) {
  if (state.answered.has(item.id) || state.finished) return;

  const buttons = [...optionsWrap.querySelectorAll(".option-btn")];
  const isCorrect = selectedIndex === item.answer;

  state.answered.add(item.id);
  if (isCorrect) state.score += 1;

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.answer) button.classList.add("correct");
    if (index === selectedIndex && !isCorrect) button.classList.add("wrong");
  });

  markHotspotDone(item.id, isCorrect);
  updateChecklistItem(item.id, isCorrect);
  feedback.textContent = isCorrect
    ? "Betul. Jawapan direkodkan dalam skor audit."
    : "Kurang tepat. Semak penerangan pelanggaran dan teruskan pemeriksaan.";
  statusText.textContent = `${state.answered.size} daripada ${TOTAL_QUESTIONS} item pemeriksaan telah dijawab.`;
  updateStats();

  if (state.answered.size === TOTAL_QUESTIONS) {
    window.setTimeout(finishMission, 900);
  }
}

function markHotspotDone(id, isCorrect) {
  const marker = hotspotLayer.querySelector(`[data-id="${id}"]`);
  if (!marker) return;
  const ring = marker.querySelector("a-ring");
  const dot = marker.querySelector("a-circle");
  ring.setAttribute("color", isCorrect ? "#25c77a" : "#ff5a6a");
  ring.removeAttribute("animation");
  dot.setAttribute("color", isCorrect ? "#d9ffe8" : "#ffe1e5");
}

function updateChecklistItem(id, isCorrect) {
  const row = document.getElementById(`check-${id}`);
  if (!row) return;
  row.classList.add(isCorrect ? "done-correct" : "done-wrong");
  row.querySelector("strong").textContent = isCorrect ? "Betul" : "Salah";
}

function getPercentage() {
  return Math.round((state.score / TOTAL_QUESTIONS) * 100);
}

function updateStats() {
  scoreText.textContent = `${state.score}/${TOTAL_QUESTIONS}`;
  progressText.textContent = `${state.answered.size}/${TOTAL_QUESTIONS}`;
  auditPercentText.textContent = `${getPercentage()}%`;
  progressBar.style.width = `${(state.answered.size / TOTAL_QUESTIONS) * 100}%`;
}

function tickTimer() {
  state.secondsLeft -= 1;
  updateTimerText();
  if (state.secondsLeft <= 0) finishMission();
}

function updateTimerText() {
  const safeSeconds = Math.max(0, state.secondsLeft);
  const minutes = Math.floor(safeSeconds / 60).toString().padStart(2, "0");
  const seconds = (safeSeconds % 60).toString().padStart(2, "0");
  timerText.textContent = `${minutes}:${seconds}`;
}

function getCategory(percentage) {
  if (percentage >= 90) return "Cemerlang";
  if (percentage >= 70) return "Memuaskan";
  if (percentage >= 50) return "Kurang Memuaskan";
  return "Tidak Memuaskan";
}

function finishMission() {
  if (state.finished) return;
  state.finished = true;
  window.clearInterval(state.timerId);
  startBtn.disabled = true;

  const percentage = getPercentage();
  resultCategory.textContent = getCategory(percentage);
  resultSummary.textContent = `Skor audit akhir: ${state.score}/${TOTAL_QUESTIONS} (${percentage}%). Item dijawab: ${state.answered.size}/${TOTAL_QUESTIONS}. Masa berbaki: ${timerText.textContent}.`;
  statusText.textContent = "Audit tamat. Keputusan akhir telah dijana.";
  updateStats();
  showPage("resultPage");
}

function restartMission() {
  state.started = false;
  state.finished = false;
  state.score = 0;
  state.answered.clear();
  state.secondsLeft = MISSION_SECONDS;
  window.clearInterval(state.timerId);
  state.timerId = null;

  startBtn.disabled = false;
  startBtn.textContent = "Mula Audit 5 Minit";
  buildHotspots();
  buildChecklist();
  questionCard.hidden = true;
  feedback.textContent = "";
  statusText.textContent = "Tekan Mula Audit, kemudian cari hotspot amaran pada panorama dapur hotel.";
  updateStats();
  updateTimerText();
  showPage("inspectionPage");
}

function requestFullscreen() {
  const target = document.querySelector(".scene-panel");
  if (document.fullscreenElement) {
    document.exitFullscreen();
    return;
  }
  if (target.requestFullscreen) target.requestFullscreen();
}

function enterVrMode() {
  if (scene.enterVR) scene.enterVR();
}

routeButtons.forEach((button) => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

skipSplashBtn.addEventListener("click", hideSplash);
window.setTimeout(hideSplash, 1600);
startBtn.addEventListener("click", startMission);
restartBtn.addEventListener("click", restartMission);
fullscreenBtn.addEventListener("click", requestFullscreen);
vrBtn.addEventListener("click", enterVrMode);

buildHotspots();
buildChecklist();
updateStats();
updateTimerText();
