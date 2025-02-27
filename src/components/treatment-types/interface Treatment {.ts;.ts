interface Treatment {
    id: number,
    name : string,
    translation: string,
    translation_slug: string
}

const items: Array<Treatment> = [
    {
      id: 9,
      name: 'Adenovirus',
      translation_slug: 'products.categories.services.preventive_care.adenovirus',
      translation: 'Adenovirus'
    },
    {
      id: 12,
      name: 'Bordetella',
      translation_slug: 'products.categories.services.preventive_care.bordetella',
      translation: 'Bordetella'
    },
    {
      id: 17,
      name: 'Canine Influenza',
      translation_slug: 'products.categories.services.preventive_care.canine_influenza',
      translation: 'Canine Influenza'
    },
    {
      id: 15,
      name: 'Coronavirus',
      translation_slug: 'products.categories.services.preventive_care.coronavirus',
      translation: 'Coronavirus'
    },
    {
      id: 16,
      name: 'DHPP/DAPP/DA2PP',
      translation_slug: 'products.categories.services.preventive_care.dhpp_dapp_da2pp',
      translation: 'DHPP/DAPP/DA2PP/DHLPP'
    },
    {
      id: 5,
      name: 'Diet Treatment',
      translation_slug: 'products.categories.parents.food.diet',
      translation: 'Veterinary Diets'
    },
    {
      id: 8,
      name: 'Distemper',
      translation_slug: 'products.categories.services.preventive_care.distemper',
      translation: 'Distemper'
    },
    {
      id: 22,
      name: 'Eastern/Western Encephalitis',
      translation_slug: 'products.categories.services.preventive_care.eastern_western_encephalitis',
      translation: 'Equine Encephalitis (EEE/WEE/VEE)'
    },
    {
      id: 24,
      name: 'EHV (Rhino)',
      translation_slug: 'products.categories.services.preventive_care.ehv_rhino',
      translation: 'EHV (Rhino)'
    },
    {
      id: 19,
      name: 'Feline Chlamydophila',
      translation_slug: 'products.categories.services.preventive_care.feline_chlamydophila',
      translation: 'Feline Chlamydophila'
    },
    {
      id: 4,
      name: 'Flea Treatment',
      translation_slug: 'services.basic.flea_treatment',
      translation: 'Flea Treatment'
    },
    {
      id: 20,
      name: 'FVRCP',
      translation_slug: 'products.categories.services.preventive_care.fvrcp',
      translation: 'FVRCP'
    },
    {
      id: 7,
      name: 'Heartworm Treatment',
      translation_slug: 'products.categories.services.preventive_care.heartworm',
      translation: 'Heartworm'
    },
    {
      id: 6,
      name: 'Hormonal Change',
      translation_slug: 'strings.hormonal_change',
      translation: 'Hormonal Change'
    },
    {
      id: 26,
      name: 'Influenza',
      translation_slug: 'products.categories.services.preventive_care.influenza',
      translation: 'Influenza'
    },
    {
      id: 13,
      name: 'Leptospirosis',
      translation_slug: 'products.categories.services.preventive_care.leptospirosis',
      translation: 'Leptospirosis'
    },
    {
      id: 18,
      name: 'Leukemia',
      translation_slug: 'products.categories.services.preventive_care.leukemia',
      translation: 'Leukemia'
    },
    {
      id: 14,
      name: 'Lyme',
      translation_slug: 'products.categories.services.preventive_care.lyme',
      translation: 'Lyme'
    },
    {
      id: 11,
      name: 'Parainfluenza',
      translation_slug: 'products.categories.services.preventive_care.parainfluenza',
      translation: 'Parainfluenza'
    },
    {
      id: 10,
      name: 'Parvovirus',
      translation_slug: 'products.categories.services.preventive_care.parvovirus',
      translation: 'Parvovirus'
    },
    {
      id: 25,
      name: 'Potomac Horse Fever',
      translation_slug: 'products.categories.services.preventive_care.potomac_horse_fever',
      translation: 'Potomac Horse Fever'
    },
    {
      id: 27,
      name: 'Quick Tests',
      translation_slug: 'products.categories.services.preventive_care.quick_tests',
      translation: 'Rapid Tests'
    },
    {
      id: 2,
      name: 'Rabies Vaccination',
      translation_slug: 'products.categories.services.preventive_care.antirabic',
      translation: 'Rabies'
    },
    {
      id: 21,
      name: 'Tetanus',
      translation_slug: 'products.categories.services.preventive_care.tetanus',
      translation: 'Tetanus'
    },
    {
      id: 1,
      name: 'Vaccination',
      translation_slug: 'products.categories.services.preventive_care.vaccines',
      translation: 'General Vaccinations, Non Specific'
    },
    {
      id: 23,
      name: 'West Nile Virus',
      translation_slug: 'products.categories.services.preventive_care.west_nile_virus',
      translation: 'West Nile Virus'
    },
    {
      id: 3,
      name: 'Worm Treatment',
      translation_slug: 'services.basic.deworming',
      translation: 'Deworming'
    }
];

const keyword:string = '123123';
var newItems = [];


items.map(item => {
    item.name.include(keyword) ? newItems.push(item) : []
})