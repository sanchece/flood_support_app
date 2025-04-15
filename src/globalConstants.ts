export interface Data {
  item: string;
  state: string;
  whoHas: string;
  whoNeed: string;
  category1: string;
  category2: string;
  address: string;
  how: string;
  accepting: string;
  connect: string;
  contact: string;
};

// Define the structure for each page (headerPage1, headerPage2, etc.)
export interface HeaderPage {
  label: string;
  url: string;
};

export interface MainPage {
  Header1: string;
  Header2: string;
  Header3: string;
  Table1: Data;
  stateLabel: any,
  button1: string,
  button2: string,
  mapDefaultText: string,
  mapZoom: string,
};

export interface ImpactedPage {
  header: string;
};

export interface AboutPage {
  header: string;
};

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
      button1: "Want to Help",
      button2: "Share Resources",
      Header1: "WHAT BRINGS YOU HERE TODAY?",
      Header2: "HERE'S WHAT THE COMMUNITY NEEDS",
      Header3: `HERE'S WHAT'S AVAILABLE IN THE COMMUNITY`,
      Table1: {
        item: "Resource",
        state: "State",
        whoHas: "At",
        whoNeed: "By",
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
        2: 'Low Supply',
        3: 'Urgent',
      },
      mapDefaultText: "Click a pin.\n\nDouble tap to zoom in.",
      mapZoom: 'Double tap to zoom in.',
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
      button1: "Necesito apoyo",
      button2: "Quiero Ayudar",
      Header1: "¿CÓMO PODEMOS AYUDARTE?",
      Header2: "ESTO ES LO QUE LA COMUNIDAD NECESITA AHORA",
      Header3: "ESTO ES LO QUE ESTÁ DISPONIBLE EN LA COMUNIDAD",
      Table1: {
        item: "Recurso",
        state: "Estado",
        whoHas: "En",
        whoNeed: "En",
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
      },
      mapDefaultText: 'Seleccione una ubicación.\n\nToque dos veces para ampliar.',
      mapZoom: 'Toque dos veces para ampliar.',
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
  availableStatus: [string];
  unavailableStatus: [string];
};

export const dataProperties: dataPropertiesType = {
  availableStatus: ['1'],
  unavailableStatus: ['2'],
};

export const colors = {
  navBar: '#8e8b39',
  navButton: '#f4f1e6',
  navMain: '#fdfdfd',
  bodyBackground: '#fbfbf5',
  bodyButton1: '#faf5f3',
  bodyButton1Border: '#c36750',
  bodyButton2: '#f4f1e6',
  bodyButton2Border: '#8e8b39',
  mainButtonIcon: '#737373',
  mainButtonIconSelected: '#906131',
  selectedIcon: '#cbc577',
  selectedIconBorder: '#8e8b39',
  defaultIcon: '#d9d9d9',
  navMenuButton: '#f8f8f2',
  secondaryIcons: '#edcad7',
  secondaryIconsSelected: '#d88d93',
  tableExpandIcon: '#906131',
  tableExpandedRow: '#d9d9d9',
  status3: '#ff3131',
  status2: '#f67e34',
  status1: '#00bf63',
  pieChart: [
    '#AA0815',
    '#EF5322',
    '#F0B41C',
    '#49B6A9',
    '#3D9BE1',
    '#263793',
    '#4B0A80',
    '#36454F',
    '#00919E',
    '#45B8A7'
  ]
};

export const fonts = {
  navMain: 'Montserrat',
  navButtons: 'Open Sans',
  bodyHeaders: 'Montserrat',
  bodyButtons: 'Open Sans',
  table: 'Open Sans',
};

export const fontSize = {
  navMain: '16pt', // mobile
  navButton: '9px',
  bodyHeaders: '16px',
  bodyButtons: '12px', // bold when selected
  icons: '9px',
  table: '10px'
};

export const fontColor = {
  bodyHeaders: '#0e194d',
  buttons: '#0e194d',
};
