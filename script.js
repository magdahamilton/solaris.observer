// Update time display
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('station-time').textContent = hours + minutes + ' HRS';
}

updateTime();
setInterval(updateTime, 1000);

// Credits overlay
function showCredits() {
    document.getElementById('credits-overlay').classList.add('active');
}

function hideCredits() {
    document.getElementById('credits-overlay').classList.remove('active');
}

// ESC key to close credits
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideCredits();
    }
});

// ==============================================
// TYPEWRITER EFFECT
// ==============================================
let stopTypewriter = false;

function typeWriter(element, text, speed = 30) {
    let i = 0;
    element.innerHTML = '';
    element.style.opacity = '1';
    element.style.visibility = 'visible';
    
    function type() {
        if (stopTypewriter) {
            element.textContent = text;
            return;
        }
        if (i < text.length) {
            if (text.charAt(i) === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Store original texts
let originalTexts = {};

window.addEventListener('DOMContentLoaded', () => {
    const stationCode = document.querySelector('.station-code');
    const title = document.querySelector('.main-title');
    const subtitle = document.querySelector('.subtitle');
    const coords = document.querySelector('.coordinates');
    const expectedDate = document.querySelector('.expected-date');
    
    originalTexts = {
        stationCode: stationCode ? stationCode.textContent : '',
        title: title ? title.textContent : '',
        subtitle: subtitle ? subtitle.textContent : '',
        coords: coords ? coords.textContent : '',
        expectedDate: expectedDate ? expectedDate.textContent : ''
    };
});

// Apply typewriter effect
window.addEventListener('load', () => {
    setTimeout(() => {
        const stationCode = document.querySelector('.station-code');
        const title = document.querySelector('.main-title');
        const subtitle = document.querySelector('.subtitle');
        const coords = document.querySelector('.coordinates');
        const expectedDate = document.querySelector('.expected-date');
        
        let typewriterComplete = false;
        let typewriterTimeouts = [];
        stopTypewriter = false;
        
        function skipTypewriter() {
            if (typewriterComplete) return;
            typewriterComplete = true;
            stopTypewriter = true;
            
            typewriterTimeouts.forEach(t => clearTimeout(t));
            typewriterTimeouts = [];
            
            if (stationCode) {
                stationCode.textContent = originalTexts.stationCode;
                stationCode.style.opacity = '1';
                stationCode.style.visibility = 'visible';
            }
            if (title) {
                title.textContent = originalTexts.title;
                title.style.opacity = '1';
                title.style.visibility = 'visible';
            }
            if (subtitle) {
                subtitle.textContent = originalTexts.subtitle;
                subtitle.style.opacity = '1';
                subtitle.style.visibility = 'visible';
            }
            if (coords) {
                coords.textContent = originalTexts.coords;
                coords.style.opacity = '1';
                coords.style.visibility = 'visible';
            }
            if (expectedDate) {
                expectedDate.textContent = originalTexts.expectedDate;
                expectedDate.style.opacity = '1';
                expectedDate.style.visibility = 'visible';
            }
            
            document.removeEventListener('click', skipHandler);
            document.removeEventListener('keydown', skipHandler);
        }
        
        function skipHandler(e) {
            if (e.type === 'click' && (e.target.closest('button') || e.target.closest('a'))) {
                return;
            }
            skipTypewriter();
        }
        
        document.addEventListener('click', skipHandler);
        document.addEventListener('keydown', skipHandler);
        
        // Hide initially
        if (stationCode) {
            stationCode.style.opacity = '0';
            stationCode.style.visibility = 'hidden';
        }
        if (title) {
            title.style.opacity = '0';
            title.style.visibility = 'hidden';
        }
        if (subtitle) {
            subtitle.style.opacity = '0';
            subtitle.style.visibility = 'hidden';
        }
        if (coords) {
            coords.style.opacity = '0';
            coords.style.visibility = 'hidden';
        }
        if (expectedDate) {
            expectedDate.style.opacity = '0';
            expectedDate.style.visibility = 'hidden';
        }
        
        const speed = 50;
        
        // Calculate delays
        const delay1 = 100;
        const delay2 = delay1 + originalTexts.stationCode.length * speed + 300;
        const delay3 = delay2 + originalTexts.title.length * speed + 300;
        const delay4 = delay3 + originalTexts.subtitle.length * speed + 300;
        const delay5 = delay4 + originalTexts.coords.length * speed + 500;
        
        // Type in sequence
        typewriterTimeouts.push(setTimeout(() => typeWriter(stationCode, originalTexts.stationCode, speed), delay1));
        typewriterTimeouts.push(setTimeout(() => typeWriter(title, originalTexts.title, speed), delay2));
        typewriterTimeouts.push(setTimeout(() => typeWriter(subtitle, originalTexts.subtitle, speed), delay3));
        typewriterTimeouts.push(setTimeout(() => typeWriter(coords, originalTexts.coords, speed), delay4));
        
        // Show expected date
        typewriterTimeouts.push(setTimeout(() => {
            if (expectedDate) {
                expectedDate.style.visibility = 'visible';
                expectedDate.style.transition = 'opacity 0.5s';
                expectedDate.style.opacity = '1';
            }
            typewriterComplete = true;
            document.removeEventListener('click', skipHandler);
            document.removeEventListener('keydown', skipHandler);
        }, delay5));
    }, 100);
});
