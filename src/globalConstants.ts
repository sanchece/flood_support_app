export interface Data {
  item: string;
  state: string;
  who: string;
  category1: string;
  category2: string;
  address: string;
  how: string;
  accepting: string;
  connect: string;
  contact: string;
}

// Define the structure for each page (headerPage1, headerPage2, etc.)
export interface HeaderPage {
  label: string;
  url: string;
}


export interface MainPage {
  Header1: string;
  Header2: string;
  Table1: Data;
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
        item: "Resource",
        state: "State",
        who: "Who",
        category1: "Category",
        category2: "Sub Category",
        address: "Address",
        how: "How",
        accepting: "Accepting",
        connect: "Connect",
        contact:"Contact"
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
        item: "Recurso",
        state: "Estado",
        who: "Quien",
        category1: "Category",
        category2: "Sub Category",
        address: "Direccion",
        how: "Como",
        accepting: "Aceptando",
        connect: "Connectate",
        contact:"Contacto"
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
  availableStatus: [string, string];
  needStatus: [string];
}

export const dataProperties: dataPropertiesType = {
  availableStatus: ['1', '2'],
  needStatus: ['3'],
}

