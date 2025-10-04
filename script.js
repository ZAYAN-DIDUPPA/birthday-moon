const getMoonPhase = (year, month, day) => {
    let c, e, jd, b;

    if (month < 3) {
        year--;
        month += 12;
    }

    month++;
    
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09;
    jd /= 29.5305882;
    b = parseInt(jd);
    jd -= b;
    b = Math.round(jd * 8);

    if (b >= 8) {
        b = 0;
    }

    const phases = [
        { name: 'New Moon', image: 0 },            // index 0
        { name: 'Waxing Crescent', image: 1 },     // index 1
        { name: 'First Quarter', image: 2 },       // index 2
        { name: 'Waxing Gibbous', image: 3 },      // index 3
        { name: 'Full Moon', image: 4 },           // index 4
        { name: 'Waning Gibbous', image: 5 },      // index 5
        { name: 'Last Quarter', image: 6 },        // index 6
        { name: 'Waning Crescent', image: 7 }      // index 7
    ];

    return phases[b];
};

const showMoonPhase = () => {
    const birthdayInput = document.getElementById('birthday');
    const resultImage = document.getElementById('moon-phase-image');
    const resultText = document.getElementById('moon-phase-text');

    const birthday = new Date(birthdayInput.value);
    console.log(birthday);
    
    if (isNaN(birthday.getTime())) {
        resultText.textContent = "Please enter a valid date.";
        resultImage.style.display = 'none';
        return;
    }

    const year = birthday.getFullYear();
    const month = birthday.getMonth() + 1;
    const day = birthday.getDate();

    console.log(year);
    console.log(month);
    console.log(day);
    
    
    const phase = getMoonPhase(year, month, day);

    
    const moonCover = resultImage.querySelector('::before');
    
    
    const moonCoverPercentage = (phase.image / 7) * 200; 
    resultImage.style.setProperty('--moon-cover-scale', moonCoverPercentage / 100);

    resultImage.style.display = 'block';
    
    
    resultText.textContent = `On your birthday, it was a ${phase.name}.`;

    
    if (phase.image < 4) { 
        resultImage.style.setProperty('--moon-cover-transform-x', '0%');
        resultImage.style.setProperty('--moon-cover-scale', (4 - phase.image) * 0.25);
    } else if (phase.image > 4) {
        resultImage.style.setProperty('--moon-cover-transform-x', '0%');
        resultImage.style.setProperty('--moon-cover-scale', (phase.image - 4) * 0.25);
    } else { 
        resultImage.style.setProperty('--moon-cover-scale', 0);
    }

    if (phase.image === 0) { 
        resultImage.style.setProperty('--moon-cover-scale', 1);
    } else if (phase.image === 4) {
        resultImage.style.setProperty('--moon-cover-scale', 0);
    }

   

    let coverX = 0;
    if (phase.image === 0) { 
        coverX = 100;
    } else if (phase.image === 1) { 
        coverX = 60;
    } else if (phase.image === 2) { 
        coverX = 35;
    } else if (phase.image === 3) { 
        coverX = 10;
    } else if (phase.image === 4) {
        coverX = -100;
    } else if (phase.image === 5) { 
        coverX = -10;
    } else if (phase.image === 6) {
        coverX = 35;
    } else if (phase.image === 7) {
        coverX = 60;
    }

    resultImage.style.backgroundImage = `radial-gradient(circle at ${50 + (coverX)}% 50%, #1e1c1cff 40%, transparent 45%)`;
    resultImage.style.backgroundColor = '#d1d1d1ff';

    if (phase.image === 4) {
        resultImage.style.backgroundImage = 'none';
    } else if (phase.image === 0) {
        resultImage.style.backgroundColor = '#080808ff';
        resultImage.style.backgroundImage = 'none';
    }
};


// #bdc3c7
// #34495e




