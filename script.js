const introWords = ["HAPPY", "BIRTHDAY", "MAS", "🩷"];
// Pastikan asset foto sudah benar urutannya
const photos = Array.from({length: 10}, (_, i) => `assets/foto${i+1}.jpg`);
const song = document.getElementById('romanticSong');

const txt1 = `hm hai, aku mau bilang sesuatu nih hehe..\n\nselamat ulang tahun Mas..\n\ndi dunia yang mulai tak selalu hangat ini, aku sangat ingin melihatmu memenangkan banyak hal..`;
const txt2 = `kurasa kamu tak perlu memenangkan hal yang megah atau mahal, cukup hal-hal kecil bahagia yang terus berlanjut dan membuatmu hidup..`;
const txt3 = `seperti tidur nyenyak tanpa harus memikirkan masalah pekerjaan yang memusingkan. seringlah tidur malam tanpa perlu musik pengantar, terlebih meneguk obat pahit yang diam-diam kamu benci sejak lama — tidur malam dengan nyenyaklah hanya dengan berdoa saja..`;
const txt4 = `setelah tidur, aku ingin kamu bangun tanpa merasa lelah, tanpa nyeri di persendianmu, tanpa lingkar mata yang gelap. aku ingin kamu merasa ringan dan penuh kebahagiaan..\n\naku di sini, kamu tidak perlu melewati banyak hal tak baik sendirian..`;

async function runIntro() {
    const el = document.getElementById('introText');
    const hum = document.getElementById('humorText');
    setTimeout(() => hum.style.opacity = 1, 800);
    
    for (let word of introWords) {
        el.style.opacity = 0;
        await new Promise(r => setTimeout(r, 450));
        el.innerText = word; 
        el.style.opacity = 1; 
        await new Promise(r => setTimeout(r, 1200));
    }
    
    document.getElementById('introScreen').style.opacity = 0;
    setTimeout(() => {
        document.getElementById('introScreen').style.display = "none";
        const main = document.getElementById('mainContent');
        main.style.display = "flex";
        setTimeout(() => { main.style.opacity = 1; }, 100);
    }, 1500);
}

let bookStep = 0;
let isAnimating = false; // Mencegah klik ganda saat animasi jalan

function turnPage() {
    if (isAnimating) return; 
    if (bookStep === 0) { song.volume = 0.3; song.play(); }
    
    const flip = document.getElementById('flipPage');
    isAnimating = true;
    bookStep++;

    if (bookStep === 1) {
        // Efek ganti foto halaman pertama ke kedua dengan halus
        flip.classList.add('flipped');
        setTimeout(() => {
            // Kita ganti foto "di balik layar" saat buku posisi terbuka
            document.getElementById('bLeft').src = photos[2]; 
            document.getElementById('bFront').src = photos[4]; 
            document.getElementById('bBack').src = photos[3]; 
            document.getElementById('bRightNext').src = photos[5]; 
            
            // Hilangkan transisi sebentar untuk mereset posisi flip tanpa kelihatan ganti foto
            flip.style.transition = 'none';
            flip.classList.remove('flipped');
            
            setTimeout(() => { 
                flip.style.transition = 'transform 1.5s cubic-bezier(0.25, 1, 0.5, 1)'; 
                isAnimating = false;
            }, 50);
        }, 1500); // Harus sama dengan durasi transisi di CSS
    } 
    else if (bookStep === 2) {
        flip.classList.add('flipped');
        setTimeout(() => { isAnimating = false; }, 1500);
    } 
    else {
        // TRANSISI HALUS DARI BUKU KE SURAT
        const container = document.getElementById('mainContent');
        container.style.opacity = 0; // Fade out dulu
        
        setTimeout(() => {
            document.getElementById('bookSection').style.display = "none";
            const letSec = document.getElementById('letterSection');
            letSec.style.display = "block";
            
            setTimeout(() => {
                container.style.opacity = 1; // Fade in
                typeText('textPart1', txt1, () => {
                    const btn1 = document.getElementById('btnNext1');
                    btn1.style.opacity = 1; btn1.style.pointerEvents = "all";
                });
                setInterval(createFlower, 600);
            }, 100);
        }, 1000);
    }
}

function typeText(id, text, cb) {
    let i = 0; const el = document.getElementById(id);
    const intv = setInterval(() => {
        el.innerHTML += text.charAt(i); i++;
        if (i >= text.length) { 
            clearInterval(intv); 
            if(cb) cb(); 
        }
    }, 45); 
}

function slidePaper(step) {
    const slider = document.getElementById('letterSlider');
    slider.style.transform = `translateX(-${step * 100}%)`; 
    
    if(step === 1) {
        document.getElementById('btnNext1').style.display = 'none'; 
        setTimeout(() => {
            typeText('textPart2', txt2, () => {
                const btn2 = document.getElementById('btnNext2');
                btn2.style.opacity = 1; btn2.style.pointerEvents = "all";
            });
        }, 800);
    }
    else if(step === 2) {
        document.getElementById('btnNext2').style.display = 'none';
        setTimeout(() => {
            typeText('textPart3', txt3, () => {
                const btn3 = document.getElementById('btnNext3');
                btn3.style.opacity = 1; btn3.style.pointerEvents = "all";
            });
        }, 800);
    }
    else if(step === 3) {
        document.getElementById('btnNext3').style.display = 'none';
        setTimeout(() => {
            typeText('textPart4', txt4, () => {
                const finalBtn = document.getElementById('finalBtn');
                finalBtn.style.opacity = 1; finalBtn.style.pointerEvents = "all";
            });
        }, 800);
    }
}

function showStackSurprise() {
    song.volume = 0.9;
    const final = document.getElementById('finalSurprise');
    final.style.display = "flex";
    setTimeout(() => { final.style.opacity = 1; }, 100);
    
    const grid = document.getElementById('heartGrid');
    photos.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'heart-photo';
        img.style.left = '50%'; img.style.top = '50%';
        img.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 50 - 25}deg) scale(0.5)`;
        grid.appendChild(img);
        
        setTimeout(() => { 
            img.style.opacity = 1; 
            img.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 40 - 20}deg) scale(1)`;
        }, 500 + (i * 150));
    });

    setTimeout(() => {
        const btnForm = document.getElementById('btnFormLove');
        btnForm.style.opacity = 1; btnForm.style.pointerEvents = "all";
    }, 2500);
}

function formLoveShape() {
    const btnForm = document.getElementById('btnFormLove');
    btnForm.style.opacity = '0';
    btnForm.style.pointerEvents = 'none';
    setTimeout(() => btnForm.style.display = 'none', 500);
    
    const points = [
        {x: 50, y: 88}, {x: 25, y: 70}, {x: 10, y: 45}, {x: 20, y: 18}, {x: 42, y: 25}, 
        {x: 58, y: 25}, {x: 80, y: 18}, {x: 90, y: 45}, {x: 75, y: 70}
    ];
    
    const imgs = document.querySelectorAll('.heart-photo');
    let outlineIdx = 0;

    imgs.forEach((img, i) => {
        setTimeout(() => {
            if (img.src.includes('foto9.jpg')) {
                img.style.left = '50%'; img.style.top = '45%'; 
                img.style.transform = 'translate(-50%, -50%) rotate(0deg)';
                img.classList.add('center-focus');
                setTimeout(() => { img.classList.add('glowing-heart'); img.classList.add('center-breathing'); }, 1800);
            } else if (outlineIdx < points.length) {
                const p = points[outlineIdx];
                img.style.left = `${p.x}%`; img.style.top = `${p.y}%`;
                let rot = (Math.random() * 16 - 8);
                img.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
                img.style.setProperty('--r', rot + 'deg');
                setTimeout(() => { img.classList.add('glowing-heart'); img.classList.add('floating-continuous'); }, 1800);
                outlineIdx++;
            }
        }, i * 150);
    });
    
    setTimeout(() => { document.getElementById('finalText').style.opacity = 1; }, 3500);
}

function createFlower() {
    const f = document.createElement('div');
    f.className = 'flower'; f.innerHTML = ['🌸','✨','🤍'][Math.floor(Math.random()*3)];
    f.style.left = Math.random() * 100 + 'vw';
    f.style.fontSize = Math.random() * 15 + 12 + 'px';
    f.style.animationDuration = Math.random() * 3 + 5 + 's';
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 7000);
}

window.onload = runIntro;
