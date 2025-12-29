
import { Service, Branch } from './types';

export const SERVICES: Service[] = [
  {
    id: 'resonancia',
    title: 'Resonancia Magnética',
    description: 'Imágenes de alta resolución con tecnología silenciosa de 1.5T y 3T.',
    longDescription: 'Nuestros sistemas de resonancia de campo alto permiten diagnósticos precisos en neurología, cardiología y oncología, con protocolos específicos para reducir el tiempo de examen.',
    iconName: 'Layers',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    preparation: ['Ayuno de 6 horas', 'No usar objetos metálicos', 'Traer estudios previos']
  },
  {
    id: 'tomografia',
    title: 'Tomografía Multicorte',
    description: 'Escaneos ultrarrápidos de 128 cortes con dosis mínima de radiación.',
    longDescription: 'Ideal para estudios vasculares, pulmonares y dentales de alta complejidad. Nuestra tecnología reduce la exposición radiológica hasta en un 40%.',
    iconName: 'Zap',
    image: 'https://images.unsplash.com/photo-1579154236594-c199f3768fc9?auto=format&fit=crop&q=80&w=800',
    preparation: ['Ayuno si es con contraste', 'Prueba de creatinina reciente', 'Informar sobre alergias']
  },
  {
    id: 'ultrasonido',
    title: 'Ultrasonido 5D HD Live',
    description: 'Diagnóstico no invasivo con visualización en tiempo real.',
    longDescription: 'Especialistas en Doppler color, ultrasonido obstétrico de alta definición y estudios de partes blandas con transductores de última generación.',
    iconName: 'Baby',
    image: 'https://images.unsplash.com/photo-1584362946045-121f8a99524c?auto=format&fit=crop&q=80&w=800',
    preparation: ['Vejiga llena para pélvicos', 'Ayuno para abdominales']
  },
  {
    id: 'mastografia',
    title: 'Mastografía Digital 3D',
    description: 'Detección temprana con tecnología de baja compresión y alta nitidez.',
    longDescription: 'La tomosíntesis 3D aumenta la tasa de detección de cáncer de mama temprano, brindando una mayor tranquilidad a nuestras pacientes.',
    iconName: 'Activity',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    preparation: ['Sin desodorante ni talco', 'Programar post-periodo']
  }
];

export const BRANCHES: Branch[] = [
  {
    id: 'marbella',
    name: 'Sede Marbella',
    address: 'Calle 54 Este, Edificio Metropolitano, Marbella, Ciudad de Panamá',
    phone: '+507 263-5555',
    hours: 'Lun-Vie: 07:00 - 20:30 | Sáb: 07:00 - 18:00 | Dom: 08:00 - 14:00'
  },
  {
    id: 'costa-este',
    name: 'Sede Costa del Este',
    address: 'Ave. Principal Costa del Este, Plaza del Sol, Ciudad de Panamá',
    phone: '+507 302-1022',
    hours: 'Lun-Vie: 07:00 - 20:00 | Sáb: 07:00 - 16:00'
  }
];

export const VALUES = [
  { title: "Ética Profesional", description: "Actuamos con integridad y transparencia en cada diagnóstico." },
  { title: "Innovación Médica", description: "Constantemente renovamos nuestra tecnología para ofrecer lo último en precisión." },
  { title: "Calidez Humana", description: "Entendemos que detrás de cada estudio hay una persona que busca respuestas." },
  { title: "Excelencia Clínica", description: "Nuestros procesos están certificados bajo los estándares internacionales más rigurosos." }
];
