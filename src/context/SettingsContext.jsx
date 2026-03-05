import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'English');
    const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem('theme') || 'Classic Brown');
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

    const themes = [
        { name: 'Nature Green', primary: '#768948', secondary: '#A4B494', bg: '#f1f8e9' },
        { name: 'Classic Brown', primary: '#6F4E37', secondary: '#C2B280', bg: '#F5F5DC' },
        { name: 'Royal Blue', primary: '#1a365d', secondary: '#4299e1', bg: '#ebf8ff' },
        { name: 'Deep Maroon', primary: '#800000', secondary: '#C04000', bg: '#fff5f5' },
        { name: 'Modern Slate', primary: '#334155', secondary: '#94A3B8', bg: '#f8fafc' }
    ];

    const translations = {
        'English': {
            home: 'Home', about: 'About', menu: 'Menu', contact: 'Contact', settings: 'Settings', login: 'Login',
            staff: 'Staff Access', client: 'Client Access', book: 'Book Table', owner: 'Owner Access',
            orderMenu: 'Order Menu', scanner: 'Scanner', qrCode: 'QR Code',
            chooseTea: 'Why Choose Tea Cafe?', organic: 'Pure Organic', brewed: 'Freshly Brewed', award: 'Award Winning',
            organicText: 'We use 100% organic tea leaves sourced directly from sustainable farms.',
            brewedText: 'Every cup is brewed to perfection at the ideal temperature.',
            awardText: 'Voted the best tea experience for three consecutive years.',
            explore: 'Explore Categories',
            staffTitle: 'Kitchen Staff View', pending: 'Pending', processing: 'Processing', prepared: 'Prepared', completed: 'Completed', rejected: 'Rejected',
            noOrders: 'No {status} orders', back: 'Back',
            clientTitle: 'Client Portal', selectTab: 'Select Your Table Number', tabNum: 'Table Number', selTab: 'Select table', viewOrd: 'View Orders', manualEnt: 'Manual Table Entry', enterTab: 'Enter your table number to view orders',
            ownerDashboard: 'Owner Dashboard', keyMetrics: 'Key Metrics', served: 'Orders Served', ongoing: 'Ongoing Orders', rejected: 'Rejected Orders', revenue: 'Total Revenue (₹)', revenueBreakdown: 'Revenue Breakdown',
            today: 'Today', thisWeek: 'This Week', thisMonth: 'This Month', avgOrder: 'Avg. Order Value', manageActions: 'Management Actions', manageMenu: 'Manage Menu', tableSessions: 'Table Sessions', feedback: 'Feedback Analytics', recentOrders: 'Recent Orders',
            loginTitle: 'Welcome Back', email: 'Email Address', password: 'Password', signIn: 'Sign In', noAccount: 'Don\'t have an account?', signUp: 'Sign Up', createAccount: 'Create Account', fullName: 'Full Name',
            bookTitle: 'Book a Table', selectTime: 'Select Time', startTime: 'Start Time', endTime: 'End Time', guestsNum: 'Number of Guests', bookCat: 'Booking Category (Unique Type)', availableTabs: 'Available Tables', bookedTabs: 'Booked Tables', confirmRes: 'Confirm Reservation', resConfirm: 'Table Reserved!', resSub: 'Your reservation at Tea Cafe has been confirmed.', backHome: 'Back to Home', editRes: 'Edit Reservation',
            darkMode: 'Dark Mode', notifications: 'Notifications', appConfig: 'App Configuration', langPref: 'Language Preferences', themeColors: 'Theme Colors', saveChanges: 'Save Changes'
        },
        'Hindi': {
            home: 'होम', about: 'हमारे बारे में', menu: 'मेन्यू', contact: 'संपर्क', settings: 'सेटिंग्स', login: 'लॉगिन',
            staff: 'कर्मचारी एक्सेस', client: 'ग्राहक एक्सेस', book: 'टेबल बुक करें', owner: 'मालिक एक्सेस',
            orderMenu: 'ऑर्डर मेन्यू', scanner: 'स्कैनर', qrCode: 'क्यूआर कोड',
            chooseTea: 'टी कैफे क्यों चुनें?', organic: 'शुद्ध जैविक', brewed: 'ताज़ा बना हुआ', award: 'पुरस्कार विजेता',
            organicText: 'हम सीधे टिकाऊ खेतों से प्राप्त 100% जैविक चाय पत्तियों का उपयोग करते हैं।',
            brewedText: 'हर प्याला आदर्श तापमान पर पूर्णता के साथ बनाया जाता है।',
            awardText: 'लगातार तीन वर्षों तक सर्वश्रेष्ठ चाय अनुभव का मतदान मिला।',
            explore: 'कैटेगरी देखें',
            staffTitle: 'किचन स्टाफ व्यू', pending: 'लंबित', processing: 'प्रोसेसिंग', prepared: 'तैयार', completed: 'पूरा हुआ', rejected: 'अस्वीकार',
            noOrders: 'कोई {status} ऑर्डर नहीं', back: 'वापस',
            clientTitle: 'क्लाइंट पोर्टल', selectTab: 'अपना टेबल नंबर चुनें', tabNum: 'टेबल नंबर', selTab: 'टेबल चुनें', viewOrd: 'ऑर्डर देखें', manualEnt: 'मैन्युअल टेबल एंट्री', enterTab: 'ऑर्डर देखने के लिए अपना टेबल नंबर दर्ज करें',
            ownerDashboard: 'मालिक डैशबोर्ड', keyMetrics: 'प्रमुख मेट्रिक्स', served: 'परोसे गए ऑर्डर', ongoing: 'जारी ऑर्डर', rejected: 'अस्वीकृत ऑर्डर', revenue: 'कुल राजस्व (₹)', revenueBreakdown: 'राजस्व विवरण',
            today: 'आज', thisWeek: 'इस सप्ताह', thisMonth: 'इस महीने', avgOrder: 'औसत ऑर्डर मूल्य', manageActions: 'प्रबंधन क्रियाएं', manageMenu: 'मेन्यू प्रबंधित करें', tableSessions: 'टेबल सेशन', feedback: 'फीडबैक विश्लेषण', recentOrders: 'हाल के ऑर्डर',
            loginTitle: 'आपका स्वागत है', email: 'ईमेल पता', password: 'पासवर्ड', signIn: 'साइन इन करें', noAccount: 'क्या आपका खाता नहीं है?', signUp: 'साइन अप करें', createAccount: 'खाता बनाएं', fullName: 'पूरा नाम',
            bookTitle: 'टेबल बुक करें', selectTime: 'समय चुनें', startTime: 'शुरू होने का समय', endTime: 'समापन का समय', guestsNum: 'मेहमानों की संख्या', bookCat: 'बुकिंग श्रेणी (अद्वितीय प्रकार)', availableTabs: 'उपलब्ध टेबल', bookedTabs: 'बुक किए गए टेबल', confirmRes: 'आरक्षण की पुष्टि करें', resConfirm: 'टेबल आरक्षित!', resSub: 'टी कैफे में आपका आरक्षण पुष्ट हो गया है।', backHome: 'वापस होम', editRes: 'आरक्षण संपादित करें',
            darkMode: 'डार्क मोड', notifications: 'सूचनाएं', appConfig: 'ऐप कॉन्फ़िगरेशन', langPref: 'भाषा प्राथमिकताएं', themeColors: 'थीम रंग', saveChanges: 'परिवर्तन सहेजें'
        },
        'Gujarati': {
            home: 'હોમ', about: 'અમારા વિશે', menu: 'મેનૂ', contact: 'સંપર્ક', settings: 'સેટિંગ્સ', login: 'લોગિન',
            staff: 'સ્ટાફ એક્સેસ', client: 'ક્લાયન્ટ એક્સેસ', book: 'ટેબલ બુક કરો', owner: 'ઓનર એક્સેસ',
            orderMenu: 'ઓર્ડર મેનૂ', scanner: 'સ્કેનર', qrCode: 'ક્યૂઆર કોડ',
            chooseTea: 'ટી કેફે શા માટે પસંદ કરવું?', organic: 'શુદ્ધ જૈવિક', brewed: 'તાજી બનાવેલી', award: 'એવોર્ડ વિજેતા',
            organicText: 'અમે ટકાઉ ખેતરોમાંથી સીધા મેળવેલા 100% જૈવિક ચાના પાંદડા વાપરીએ છીએ.',
            brewedText: 'દરેક કપ આદર્શ તાપમાને સંપૂર્ણતા સાથે બનાવવામાં આવે છે.',
            awardText: 'સતત ત્રણ વર્ષ સુધી શ્રેષ્ઠ ચાના અનુભવ માટે મત મળ્યો.',
            explore: 'કેટેગરી એક્સપ્લોર કરો',
            staffTitle: 'કિચન સ્ટાફ વ્યુ', pending: 'બાકી', processing: 'પ્રોસેસિંગ', prepared: 'તૈયાર', completed: 'પૂર્ણ', rejected: 'નામંજૂર',
            noOrders: 'કોઈ {status} ઓર્ડર નથી', back: 'પાછા',
            clientTitle: 'ક્લાયન્ટ પોર્ટલ', selectTab: 'તમારો ટેબલ નંબર પસંદ કરો', tabNum: 'ટેબલ નંબર', selTab: 'ટેબલ પસંદ કરો', viewOrd: 'ઓર્ડર જુઓ', manualEnt: 'મેન્યુઅલ ટેબલ એન્ટ્રી', enterTab: 'ઓર્ડર જોવા માટે તમારો ટેબલ નંબર દાખલ કરો',
            ownerDashboard: 'માલિક ડેશબોર્ડ', keyMetrics: 'મુખ્ય મેટ્રિક્સ', served: 'પીરસાયેલા ઓર્ડર', ongoing: 'ચાલુ ઓર્ડર', rejected: 'નામંજૂર ઓર્ડર', revenue: 'કુલ આવક (₹)', revenueBreakdown: 'આવક બ્રેકડાઉન',
            today: 'આજે', thisWeek: 'આ અઠવાડિયે', thisMonth: 'આ મહિને', avgOrder: 'સરેરાશ ઓર્ડર મૂલ્ય', manageActions: 'મેનેજમેન્ટ એક્શન્સ', manageMenu: 'મેનૂ મેનેજ કરો', tableSessions: 'ટેબલ સેશન્સ', feedback: 'ફીડબૅક એનાલિટિક્સ', recentOrders: 'તાજેતરના ઓર્ડર',
            loginTitle: 'સ્વાગત છે', email: 'ઇમેાઇલ સરનામું', password: 'પાસવર્ડ', signIn: 'સાઇન ઇન કરો', noAccount: 'ખાતું નથી?', signUp: 'સાઇન અપ કરો', createAccount: 'ખાતું બનાવો', fullName: 'પૂરું નામ',
            bookTitle: 'ટેબલ બુક કરો', selectTime: 'સમય પસંદ કરો', startTime: 'શરૂઆતનો સમય', endTime: 'અંતિમ સમય', guestsNum: 'મહેમાનોની સંખ્યા', bookCat: 'બુકિંગ કેટેગરી (અનોખો પ્રકાર)', availableTabs: 'ઉપલબ્ધ ટેબલ', bookedTabs: 'બુક કરેલા ટેબલ', confirmRes: 'બુકિંગ કન્ફર્મ કરો', resConfirm: 'ટેબલ બુક થઈ ગયું!', resSub: 'ટી કેફેમાં તમારું બુકિંગ કન્ફર્મ થઈ ગયું છે.', backHome: 'પાછા હોમ', editRes: 'બુકિંગ એડિટ કરો',
            darkMode: 'ડાર્ક મોડ', notifications: 'સૂચનાઓ', appConfig: 'એપ કોન્ફિગરેશન', langPref: 'ભાષા પસંદગીઓ', themeColors: 'થીમ રંગો', saveChanges: 'બદલાવ સાચવો'
        }
    };

    const applyTheme = (themeName) => {
        const theme = themes.find(t => t.name === themeName) || themes[1];
        document.documentElement.style.setProperty('--tea-primary', theme.primary);
        document.documentElement.style.setProperty('--tea-secondary', theme.secondary);

        const darken = (hex) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgb(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)})`;
        };
        const darkPrimary = darken(theme.primary);
        document.documentElement.style.setProperty('--tea-primary-dark', darkPrimary);

        if (darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            // Remove inline overrides for bg and dark so CSS variables in index.css work correctly
            document.documentElement.style.removeProperty('--tea-bg');
            document.documentElement.style.removeProperty('--tea-dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.style.setProperty('--tea-bg', theme.bg);
            document.documentElement.style.setProperty('--tea-dark', darkPrimary);
        }
    };

    useEffect(() => {
        applyTheme(selectedTheme);
    }, [selectedTheme, darkMode]);

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const changeTheme = (themeName) => {
        setSelectedTheme(themeName);
        localStorage.setItem('theme', themeName);
    };

    const toggleDarkMode = () => {
        const newVal = !darkMode;
        setDarkMode(newVal);
        localStorage.setItem('darkMode', newVal);
    };

    return (
        <SettingsContext.Provider value={{
            language,
            changeLanguage,
            selectedTheme,
            changeTheme,
            darkMode,
            toggleDarkMode,
            themes,
            t: translations[language],
            allTranslations: translations
        }}>
            {children}
        </SettingsContext.Provider>
    );
};
