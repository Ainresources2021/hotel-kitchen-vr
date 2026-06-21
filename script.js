const TOTAL = 10;
const MISSION_SECONDS = 5 * 60;

const violations = [
  {id:1,title:"Ayam mentah berhampiran makanan lain",tag:"Pencemaran silang",yaw:-113,pitch:-16,explain:"Ayam mentah perlu diasingkan daripada makanan sedia dimakan kerana jus mentah boleh mencemarkan permukaan dan makanan.",q:"Apakah tindakan paling selamat?",options:["Asingkan ayam mentah dan sanitasi permukaan","Biarkan kerana akan dimasak","Letak salad di sebelah ayam","Lap dengan kain kering sahaja"],answer:0},
  {id:2,title:"Papan pemotong kotor",tag:"Permukaan sentuhan makanan",yaw:-74,pitch:-21,explain:"Papan pemotong yang kotor boleh menjadi tempat pembiakan mikroorganisma.",q:"Apakah tindakan betul?",options:["Cuci, bilas, sanitasi dan keringkan","Guna terus jika masih basah","Tutup dengan tisu","Guna bahagian tepi sahaja"],answer:0},
  {id:3,title:"Makanan tidak bertutup",tag:"Perlindungan makanan",yaw:-128,pitch:-9,explain:"Makanan terbuka mudah tercemar oleh habuk, percikan dan sentuhan.",q:"Bagaimana makanan perlu dilindungi?",options:["Tutup atau simpan dalam bekas bersih bertutup","Letak dekat sinki","Campur dengan bahan mentah","Biarkan terbuka"],answer:0},
  {id:4,title:"Lantai basah dan kotor",tag:"Kebersihan premis",yaw:-23,pitch:-31,explain:"Lantai basah meningkatkan risiko tergelincir dan pencemaran silang melalui kasut atau troli.",q:"Apa tindakan segera?",options:["Bersihkan, keringkan dan letak tanda amaran","Tolak air ke bawah meja","Biarkan sahaja","Tutup dengan kotak"],answer:0},
  {id:5,title:"Tong sampah melimpah",tag:"Pengurusan sisa",yaw:8,pitch:-17,explain:"Tong sampah terbuka dan penuh boleh menarik perosak serta menghasilkan bau.",q:"Kawalan terbaik ialah?",options:["Guna tong bertutup dan kosongkan berkala","Biarkan terbuka","Letak di tengah laluan","Padatkan dengan tangan"],answer:0},
  {id:6,title:"Sisa makanan di lantai",tag:"Tarikan perosak",yaw:22,pitch:-33,explain:"Sisa makanan di lantai menunjukkan pembersihan tidak mencukupi dan boleh menarik perosak.",q:"Mengapa perlu dibersihkan segera?",options:["Menarik perosak dan menyebarkan pencemaran","Buat lantai kurang licin","Tanda dapur sibuk","Boleh tunggu hujung syif"],answer:0},
  {id:7,title:"Botol cecair tidak berlabel",tag:"Pelabelan",yaw:45,pitch:-10,explain:"Botol tanpa label boleh menyebabkan salah guna bahan atau risiko pencemaran kimia/alergen.",q:"Apa keperluan asas botol bahan?",options:["Labelkan kandungan dan simpan ikut kategori","Guna botol kosong tanpa label","Campurkan semua cecair","Letak dekat makanan terbuka"],answer:0},
  {id:8,title:"Tikus di lantai dapur",tag:"Kawalan perosak",yaw:83,pitch:-29,explain:"Kehadiran tikus ialah pelanggaran serius kerana boleh membawa patogen dan mencemarkan makanan.",q:"Apa tindakan audit yang sesuai?",options:["Hentikan kawasan terlibat, asingkan makanan dan aktifkan kawalan perosak","Kejar tikus dan teruskan kerja","Tutup pintu sahaja","Sembur racun dekat makanan"],answer:0},
  {id:9,title:"Makanan di atas lantai",tag:"Pencemaran fizikal",yaw:116,pitch:-32,explain:"Makanan yang menyentuh lantai tidak selamat digunakan semula.",q:"Apa tindakan betul?",options:["Lupuskan makanan dan bersihkan kawasan","Bilas dan guna semula","Campur dalam kuah","Letak semula dalam dulang"],answer:0},
  {id:10,title:"Tin terbuka / makanan terdedah",tag:"Penyimpanan",yaw:135,pitch:-14,explain:"Tin terbuka dan makanan masak terdedah mudah tercemar serta tidak sesuai disimpan lama.",q:"Cara kendalian betul ialah?",options:["Pindahkan ke bekas bertutup, label dan simpan suhu selamat","Simpan dalam tin terbuka","Letak dekat dapur panas","Campur semua baki makanan"],answer:0}
];

const state = {started:false, finished:false, score:0, answered:new Set(), secondsLeft:MISSION_SECONDS, timer:null};
let viewer;

const $ = (id) => document.getElementById(id);

function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active', p.id===id));
  document.querySelectorAll('.nav').forEach(b=>b.classList.toggle('active', b.dataset.page===id));
  if(id==='vr' && !viewer) setTimeout(initViewer, 50);
  window.scrollTo({top:0, behavior:'smooth'});
}

document.querySelectorAll('[data-page]').forEach(btn=>btn.addEventListener('click',()=>showPage(btn.dataset.page)));

function tooltip(hotSpotDiv, args){
  hotSpotDiv.classList.add('custom-hotspot');
  hotSpotDiv.innerHTML = `<span>${args.id}</span>`;
  hotSpotDiv.title = args.title;
}

function initViewer(){
  viewer = pannellum.viewer('panorama', {
    type: 'equirectangular',
    panorama: 'hotel_kitchen_360.jpg',
    autoLoad: true,
    showControls: true,
    compass: false,
    hfov: 105,
    pitch: -8,
    yaw: 0,
    hotSpots: violations.map(v => ({
      pitch: v.pitch,
      yaw: v.yaw,
      type: 'info',
      cssClass: 'custom-hotspot-wrap',
      createTooltipFunc: tooltip,
      createTooltipArgs: v,
      clickHandlerFunc: () => openQuestion(v.id)
    }))
  });
}

function buildChecklist(){
  $('checklist').innerHTML = violations.map(v=>`<li id="check-${v.id}"><span>${v.id}. ${v.title}</span><b>Belum</b></li>`).join('');
}

function startMission(){
  if(state.started) return;
  state.started = true;
  $('startBtn').disabled = true;
  $('startBtn').textContent = 'Audit Sedang Berjalan';
  $('statusText').textContent = 'Misi bermula. Klik hotspot bernombor dan jawab semua soalan.';
  state.timer = setInterval(tick, 1000);
}

function openQuestion(id){
  if(!state.started || state.finished){
    $('statusText').textContent = 'Tekan Mula Audit dahulu sebelum menjawab hotspot.';
    return;
  }
  const item = violations.find(v=>v.id===id);
  const done = state.answered.has(id);
  $('questionCard').hidden = false;
  $('tag').textContent = `Hotspot ${item.id}: ${item.tag}`;
  $('title').textContent = item.title;
  $('explain').textContent = item.explain;
  $('question').textContent = item.q;
  $('feedback').textContent = done ? 'Item ini telah dijawab. Pilih hotspot lain.' : '';
  $('options').innerHTML = '';
  item.options.forEach((opt, index)=>{
    const b = document.createElement('button');
    b.className = 'option';
    b.textContent = opt;
    b.disabled = done;
    if(done && index===item.answer) b.classList.add('correct');
    b.onclick = () => answer(item, index);
    $('options').appendChild(b);
  });
}

function answer(item, selected){
  if(state.answered.has(item.id) || state.finished) return;
  const correct = selected === item.answer;
  state.answered.add(item.id);
  if(correct) state.score++;
  document.querySelectorAll('.option').forEach((b,i)=>{
    b.disabled = true;
    if(i===item.answer) b.classList.add('correct');
    if(i===selected && !correct) b.classList.add('wrong');
  });
  const row = $(`check-${item.id}`);
  row.classList.add(correct ? 'ok' : 'bad');
  row.querySelector('b').textContent = correct ? 'Betul' : 'Salah';
  $('feedback').textContent = correct ? 'Betul. Jawapan direkodkan.' : 'Kurang tepat. Semak penerangan dan teruskan audit.';
  $('statusText').textContent = `${state.answered.size}/${TOTAL} item telah dijawab.`;
  updateStats();
  if(state.answered.size === TOTAL) setTimeout(finish, 800);
}

function pct(){ return Math.round((state.score/TOTAL)*100); }
function category(p){ if(p>=90) return 'Cemerlang'; if(p>=70) return 'Memuaskan'; if(p>=50) return 'Kurang Memuaskan'; return 'Tidak Memuaskan'; }
function updateStats(){
  $('scoreText').textContent = `${state.score}/${TOTAL}`;
  $('progressText').textContent = `${state.answered.size}/${TOTAL}`;
  $('percentText').textContent = `${pct()}%`;
}
function updateTimer(){
  const s = Math.max(0, state.secondsLeft);
  $('timerText').textContent = `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
}
function tick(){ state.secondsLeft--; updateTimer(); if(state.secondsLeft<=0) finish(); }
function finish(){
  if(state.finished) return;
  state.finished = true;
  clearInterval(state.timer);
  const p = pct();
  $('resultCategory').textContent = category(p);
  $('resultSummary').textContent = `Skor audit akhir: ${state.score}/${TOTAL} (${p}%). Item dijawab: ${state.answered.size}/${TOTAL}. Masa berbaki: ${$('timerText').textContent}.`;
  showPage('result');
}
function restart(){
  state.started=false; state.finished=false; state.score=0; state.answered.clear(); state.secondsLeft=MISSION_SECONDS; clearInterval(state.timer);
  $('startBtn').disabled=false; $('startBtn').textContent='Mula Audit 5 Minit'; $('questionCard').hidden=true; $('statusText').textContent='Tekan Mula Audit, kemudian klik hotspot bernombor pada panorama.';
  updateStats(); updateTimer(); buildChecklist(); showPage('vr');
}

$('startBtn').addEventListener('click', startMission);
$('restartBtn').addEventListener('click', restart);
$('fullscreenBtn').addEventListener('click', ()=> viewer && viewer.toggleFullscreen());

buildChecklist();
updateStats();
updateTimer();
