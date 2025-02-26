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
      Header1: "Announcements",
      Header2: "Urgent Needs",
      Table1: {
        datePosted: "Date Posted",
        organization: "Organization",
        item: "Item",
        notes: "Note",
        status: "Status",
        location: "Drop Off",
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
      Header1: "Anuncios",
      Header2: "Necesidades Urgentes",
      Table1: {
        datePosted: "Fecha Publicada",
        organization: "Organización",
        item: "Artículo",
        notes: "Nota",
        status: "Estado",
        location: "Ubicación",
        hours: "Horas",
        social: "Red",
        phone: "Teléfono",
      }
    },
    impactedPage: {
      header: "¿Fue usted afectado por la inundación?"
    },
    aboutPage: {
      header: "Quienes Somos"
    },
  },
} as const;
