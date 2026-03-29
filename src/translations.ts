// Script name, uses as unique index
export const NAME = 'Address Point Helper'

export const TRANSLATION: Record<string, any> = {
  'en': {
    title: 'APH\u{1F4CD}',
    description: 'Address Point Helper \u{1F4CD}',
    buttons: {
      createPoint: 'Clone to Point',
      createResidential: 'Clone to Residential',
    },
    settings: {
      title: 'Options',
      addNavigationPoint: 'Add entry point',
      inheritNavigationPoint: 'Inherit parent\'s landmark entry point',
      autoSetHNToName: 'Copy house number into name',
      noDuplicates: 'Do not create duplicates',
    }
  },
  'uk': {
    title: 'APH\u{1F4CD}',
    description: 'Address Point Helper \u{1F4CD}',
    buttons: {
      createPoint: 'Клон до POI',
      createResidential: 'Клон до АТ',
    },
    settings: {
      title: 'Налаштування',
      addNavigationPoint: 'Додавати точку в\'їзду',
      inheritNavigationPoint: 'Наслідувати точку в\'їзду від POI',
      autoSetHNToName: 'Копіювати номер будинку в назву',
      noDuplicates: 'Не створювати дублікатів',
    }
  },
  'ru': {
    title: 'APH\u{1F4CD}',
    description: 'Address Point Helper \u{1F4CD}',
    buttons: {
      createPoint: 'Клон в POI',
      createResidential: 'Клон в АТ',
    },
    settings: {
      title: 'Настройки',
      addNavigationPoint: 'Создавать точку въезда',
      inheritNavigationPoint: 'Наследовать точку въезда от POI',
      autoSetHNToName: 'Копировать номер дома в название',
      noDuplicates: 'Не создавать дубликатов',
    }
  }
}
