const music = new Audio('audio1.mp3');
//music.play();

const songs = [
    {
        id: 1,
        songName: 'On My Way <br><div class="subtitle">Alan Walker</div>' ,
        poster:"img1.png"
    },
    {
        id: 2,
        songName: 'Dil Sambhal Jaa <br><div class="subtitle">Arijit Singh</div>' ,
        poster:"img2.png"
    },
    {
        id: 3,
        songName: 'Teri Yaadon Mein <br><div class="subtitle">KK</div>' ,
        poster:"img3.png"
    },
    {
        id: 4,
        songName: 'Tere Vaaste<br><div class="subtitle">Sachin-Jigar</div>' ,
        poster:"img4.png"
    },
    {
        id: 5,
        songName: 'Milne Hai Mujhse Aayi<br><div class="subtitle">Arijit Singh</div>' ,
        poster:"img5.png"
    },
    {
        id: 6,
        songName: 'Ankhiyaan Gulaab<br><div class="subtitle">Mitraas</div>' ,
        poster:"img6.png"
    },
    {
        id: 7,
        songName: 'Bekhayali<br><div class="subtitle">Sachet Tandon</div>' ,
        poster:"img7.png"
    },
    {
        id: 8,
        songName: 'Soni Soni <br><div class="subtitle">Atif Aslam</div>' ,
        poster:"img8.png"
    },
    {
        id: 9,
        songName: 'Arjan Vailly <br><div class="subtitle">Bhupinder Babbal</div>' ,
        poster:"img9.png"
    },
    {
        id: 10,
        songName: 'Raj Karega Khalsa<br><div class="subtitle">Navraj Hans</div>' ,
        poster:"img10.png"
    },
    {
        id: 11,
        songName: 'Maharani<br><div class="subtitle">Arpit Bala</div>' ,
        poster:"img11.png"
    },
    {
        id: 12,
        songName: 'Salaar <br><div class="subtitle">Ravi Basrur</div>' ,
        poster:"img12.png"
    },
    {
        id: 13,
        songName: 'Illuminati<br><div class="subtitle">Sushil Shyam</div>' ,
        poster:"img13.png"
    },
    {
        id: 14,
        songName: 'Yaara <br><div class="subtitle">Shreya Ghoshal</div>' ,
        poster:"img14.png"
    },
    {
        id: 15,
        songName: 'Tera Hone Laga Hu<br><div class="subtitle">Atif Aslam</div>' ,
        poster:"img15.png"
    },
    {
        id: 16,
        songName: 'Sajini <br><div class="subtitle">Arijit Singh</div>' ,
        poster:"img16.png"
    },
    {
        id: 17,
        songName: 'Vikram Title Track <br><div class="subtitle">Anirudh</div>' ,
        poster:"img17.png"
    },
    {
        id: 18,
        songName: 'Kabhi Jo Badal Barse<br><div class="subtitle">Arijit Singh</div>' ,
        poster:"img18.png"
    },
    {
        id: 19,
        songName: 'Vatna<br><div class="subtitle">Jawed Ali</div>' ,
        poster:"img19.png"
    },
    {
        id: 20,
        songName: 'AAmi Je Toma <br><div class="subtitle">Shreya Ghoshal</div>' ,
        poster:"img20.png"
    },
]


Array.from(document.getElementsByClassName('songItem')).forEach((e,i)=>{
    e.getElementsByTagName('img')[0].src = songs[i].poster;
    e.getElementsByTagName('h5')[0]. innerHTML = songs[i].songName;
});


let masterPlay =document.getElementById('masterPlay');
let wave =document.getElementById('wave');

masterPlay.addEventListener('click', ()=>{
    if (music.paused || music.currentTime <=0){
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.add('bi-pause-fill');
        masterPlay.classList.remove('bi-play-fill');
    } else {
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.remove('bi-pause-fill');
        masterPlay.classList.add('bi-play-fill');
    }
});

const makeAllplays= () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el)=>{
        el.classList.add('bi-play-circle-fill');
        el.classList.remove('bi-pause-circle-fill');
    })
}

const makeAllBackground = () =>{
    Array.from(document.getElementsByClassName('songItem')).forEach((el)=>{
        el.computedStyleMap.background = 'rgb(105,105,105,.0)';
    })
}

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((e)=>{
    e.addEventListener('click',(el)=>{
        index = el.target.id;
        // console.log(index);
        music.src = `audio${index}.mp3`;
        poster_master_play.src=`img${index}.png`
        music.play();
        masterPlay.classList.add('bi-pause-fill');
        masterPlay.classList.remove('bi-play-fill');

        let songTitles = songs.filter((els)=>{
            return els.id ==index;
        })
        songTitles.forEach(elss =>{
            let {songName}= elss;
            title.innerHTML= songName;
        });

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = "rgb(105,105,105,.1)";
        makeAllplays();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');
    })
})

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', ()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min1 = Math.floor(music_dur/60);
    let sec1 = Math.floor(music_dur%60);
 
    if (sec1<10){
        sec1 = `0${sec1}`;
    }
    currentEnd.innerText = `${min1}:${sec1}`;

    let min2 = Math.floor(music_curr/60);
    let sec2 = Math.floor(music_curr%60);
    if (sec2<10){
        sec1 = `0${sec2}`;
    }

    currentStart.innerText = `${min2}:${sec2}`;

    let progressBar = parseInt((music_curr/music_dur)*100);
    seek.value = progressBar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
});

seek.addEventListener('click', ()=>{
    music.currentTime = seek.value*music.duration/100;
});

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_bar = document.getElementsByClassName('vol_bar')[0];
let vol_dot = document.getElementById('vol_dot');

vol.addEventListener('change',()=>{
   if (vol.value ==0){
       vol_icon.classList.remove('bi-volume-up-fill');
       vol_icon.classList.remove('bi-volume-down-fill');
       vol_icon.classList.add('bi-volume-off-fill');
   } 
   if (vol.value >0){
       vol_icon.classList.remove('bi-volume-up-fill');
       vol_icon.classList.add('bi-volume-down-fill');
       vol_icon.classList.remove('bi-volume-off-fill');
   }
   if (vol.value >50){
    vol_icon.classList.add('bi-volume-up-fill');
    vol_icon.classList.remove('bi-volume-down-fill');
    vol_icon.classList.remove('bi-volume-off-fill');
   }
   let vol_a = vol.value;
   vol_bar.style.width = `${vol_a}%`;
   vol_bar.style.left = `${vol_a}%`;
   music.volume = vol_a /100;
});

let back = document.getElementById('back');
let next = document.getElementById('next');
index = Array.from(document.getElementsByClassName('songItem')).length;
console.log(index);
back.addEventListener('click',()=>{
    index -=1;
    if (index <1){
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audio${index}.mp3`;
    poster_master_play.src=`img${index}.png`;
    music.play();
    masterPlay.classList.add('bi-pause-fill');
    masterPlay.classList.remove('bi-play-fill');

    let songTitles = songs.filter((els)=>{
        return els.id ==index;
    })
    songTitles.forEach(elss =>{
        let {songName}= elss;
        title.innerHTML= songName;
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = "rgb(105,105,105,.1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
});



let pop_song_left = document.getElementById('pop_song_left');
let pop_song_right = document.getElementById('pop_song_right');
let pop_song = document.getElementsByClassName('pop_song')[0];


pop_song_right.addEventListener('click',()=>{
    pop_song.scrollLeft += 330;
})

pop_song_left.addEventListener('click', ()=>{
    pop_song.scrollLeft -=330;
});



