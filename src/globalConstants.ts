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
  Header3: string;
  Table1: Data;
  stateLabel: any,
  button1: string,
  button2: string,
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
    headerTitleMobile: "SW FLOOD SUPPORT",
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
      Header1: "WHAT BRINGS YOU HERE TODAY?",
      Header2: "HERE'S WHAT THE COMMUNITY NEEDS RIGHT NOW:",
      button1: "I need support",
      button2: "I have resources to share",
      Header3: 'Needed',
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
        contact: "Contact"
      },
      stateLabel: {
        1: 'Available',
        2: 'Low Availability',
        3: 'Urgently Neeeed',
      }
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
      Header1: "Recursos",
      Header2: "Disponible",
      Header3: "Necesarios",
      button1: "I need support",
      button2: "I have resources to share",
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
        contact: "Contacto"
      },
      stateLabel: {
        1: 'Disponible',
        2: 'Poca Disponibilidad',
        3: 'Se Necesita'
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

export interface dataPropertiesType {
  availableStatus: [string, string];
  unavailableStatus: [string];
}

export const dataProperties: dataPropertiesType = {
  availableStatus: ['1', '2'],
  unavailableStatus: ['3'],
}


export const colors = {
  navBar: '#8e8b39',
  navButton: '#f4f1e6',
  navMain: '#fdfdfd',
  bodyBackground: '#fbfbf5',
  bodyButton1: '#faf5f3',
  bodyButton1Border: '#c36750',
  bodyButton2: '#f4f1e6',
  bodyButton2Border: '#8e8b39',
  selectedIcon: '#cbc577',
  selectedIconBorder: '#8e8b39',
  defaultIcon: '#d9d9d9',
  navMenuButton: '#f8f8f2',
  secondaryIcons: '#d9d9d9',
  expandIcon: '#906131',
  status3: '#ff3131',
  status2: '#f67e34',
  status1: '#00bf63',
}

export const fonts = {
  navMain: 'Montserrat',
  navButtons: 'Open Sans',
  bodyHeaders: 'Montserrat',
  bodyButtons: 'Open Sans',
  table: 'Open Sans',
}

export const fontSize = {
  navMain: '16pt', // mobile
  navButton: '9px',
  bodyHeaders: '16px',
  bodyButtons: '12px', // bold when selected
  icons: '9px',
  table:'10px'
}

export const fontColor = {
  bodyHeaders: '#0e194d',
  buttons: '#0e194d',
}
