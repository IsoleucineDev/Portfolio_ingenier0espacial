"use client"
import { CoverParticles } from '@/components/cover-particles'; 
import  TransitionPage  from '@/components/transition-pages';
import MusicPlayer from '@/components/music-player';


export default function musicPortfolio() {
    const playlist = [
      {
        url: "https://soundcloud.com/manuespacial-419137814/epilogo?in=user-483599245/sets/portafolio-animacion-cortos&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
        title: "Epílogo"
      },     
      {
        url: "https://soundcloud.com/user-483599245/corto-jm?in=user-483599245/sets/portafolio-animacion-cortos&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
        title : "Corto JM"
      },
      {
        url: "https://soundcloud.com/user-483599245/ile",
        title : "ile"
      },
      {
        url: "https://soundcloud.com/manuespacial-419137814/lejos-muy-lejos?in=user-483599245/sets/portafolio-animacion-cortos&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
        title : "Lejos muy lejos "
      },
      {
        url: "https://soundcloud.com/user-483599245/night-waves?in=user-483599245/sets/portafolio-animacion-cortos&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
        title: "Night waves"
      },
      {
        url: "https://soundcloud.com/manuespacial-419137814/la-gran-cueva?in=user-483599245/sets/portafolio-animacion-cortos&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
        title: "La gran cueva",
      },
      {
        url: "https://soundcloud.com/user-483599245/sonic-track?in=user-483599245/sets/portafolio-animacion-cortos&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
        title: "Sonic Track"
      },
      {
        url: "https://soundcloud.com/manuespacial-419137814/momentoalatoreocontigo523leer-descripcion?in=user-483599245/sets/portafolio-animacion-cortos&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
        title: "Momento aleatorio Contigo"
      },
      {
        url: "https://soundcloud.com/manuespacial-419137814/quisiera-pasar-un-dia-contigo?in=user-483599245/sets/portafolio-animacion-cortos&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", 
        title: "Quisiera pasar un día contigo en Italia"
      },
      {
        url: "https://soundcloud.com/user-483599245/persona5-track?in=user-483599245/sets/portafolio-animacion-cortos",
        title: "Persona 5 Track"
      },
      {
        url: "https://soundcloud.com/user-483599245/aereo-manu?in=user-483599245/sets/portafolio-animacion-cortos&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
        title: "Aereo Manu"
      },
      {
        url: "https://soundcloud.com/manuespacial-419137814/empty?in=user-483599245/sets/portafolio-animacion-cortos&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
        title: "Empty"
      },
    
      // ... más canciones
    ];  
  
    return(
        <main> 
        <TransitionPage/> 
        <div className="flex justify-center items-center h-screen"> 
          <CoverParticles /> 
          <h1></h1>
          <span></span>
          <MusicPlayer playlist={playlist}/>
        {/*  <p className="text-3xl font-bold animate-fade-in">Introducción </p>       */} 
        {/*  <p className="text-lg animate-slide-in">Productor musical y compositor originario de Querétaro. Especializado en la creación y producción de música para medios audiovisuales. Fundador de la banda "Juliette!", donde fusiona elementos del rock alternativo con influencias del rock japonés</p>*/}
        </div>
      </main>
    );
}

