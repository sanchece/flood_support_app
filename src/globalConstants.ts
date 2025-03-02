export interface Data {
  datePosted: string;
  organization: string;
  item: string;
  itemCategory: string;
  notes: string;
  status: string;
  location: string;
  hours: string;
  social: string;
  phone: string;
}

// Define the structure for each page (headerPage1, headerPage2, etc.)
export interface HeaderPage {
  label: string;
  url: string;
}

export interface MainPageTable {
  datePosted: string;
  organization: string;
  item: string;
  notes: string;
  status: string;
  location: string;
  hours: string;
  social: string;
  phone: string;
}

export interface MainPage {
  Header1: string;
  Header2: string;
  Table1: MainPageTable;
}

export interface ImpactedPage {
  header: string;
}

export interface AboutPage {
  header: string;
}

// Define the structure for each language content (English and Spanish)
export interface LanguageContent {
  headerTitle: string;
  headerTitleMobile: string;
  headerPage1: HeaderPage;
  headerPage2: HeaderPage;
  headerPage3: HeaderPage;
  languageButton: string;
  mainPage: MainPage;
  impactedPage: ImpactedPage;
  aboutPage: AboutPage;
}

// Now define the top-level type that holds both English and Spanish content
interface LanguageType {
  english: LanguageContent;
  spanish: LanguageContent;
}

// Define the constant `appContent` using the above types
export const appContent: LanguageType = {
  english: {
    headerTitle: "SW Detroit Flood Support",
    headerTitleMobile: "SW Flood Support",
    headerPage1: {
      label: "impacted?",
      url: "/impacted"
    },
    headerPage2: {
      label: "organizers",
      url: "/organizers"
    },
    headerPage3: {
      label: "about",
      url: "/about"
    },
    languageButton: "español",
    mainPage: {
      Header1: "Available Resources",
      Header2: "Urgent Needs",
      Table1: {
        datePosted: "Date Posted",
        organization: "Organization",
        item: "Item",
        notes: "Note",
        status: "Status",
        location: "Drop Off/Pick Up",
        hours: "Hours",
        social: "Social",
        phone: "Phone",
      },
    },
    impactedPage: {
      header: "Were you impacted by the flood?",
    },
    aboutPage: {
      header: "About Us"
    },
  },
  spanish: {
    headerTitle: "SW Detroit Apoyo a Inundaciones",
    headerTitleMobile: 'SW Apoyo a Inundaciones',
    headerPage1: {
      label: "¿impactado?",
      url: "/impacted"
    },
    headerPage2: {
      label: "organizadores",
      url: "/organizers"
    },
    headerPage3: {
      label: "nosotros",
      url: "/about"
    },
    languageButton: "english",
    mainPage: {
      Header1: "Recursos Disponibles",
      Header2: "Necesidades Urgentes",
      Table1: {
        datePosted: "Publicado",
        organization: "Organización",
        item: "Artículo",
        notes: "Nota",
        status: "Estado",
        location: "Ubicación",
        hours: "Horas",
        social: "Red",
        phone: "Teléfono",
      },
    },
    impactedPage: {
      header: "¿Fue usted afectado por la inundación?"
    },
    aboutPage: {
      header: "Quienes Somos"
    },
  },
} as const;

export interface dataPropertiesType {
  availableStatus: string;
  needStatus: string;
  spanish: any
}

export const dataProperties: dataPropertiesType = {
  availableStatus:'Have Available',
  needStatus:'Urgently Needed',
  spanish:{
    'Babies/Children':'Bebés/Niños',
    'Cleaning':'Limpieza',
    'Clothing':'Ropa',
    'Hygiene':'Higiene',
    'Medical':'Médico',
    'Other':'Otro',
    'Pet':'Mascota',
    'Volunteering':'Voluntariado',
    'Winter Essentials':'Para Invierno',
  },
}

