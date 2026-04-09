export const TRANSLATION: Record<string, any> = {
  'en': {
    title: 'APH\u{1F4CD}',
    description: 'Address Point Helper \u{1F4CD}',
    help: 'Select a venue to see the <strong>Clone to Point</strong> and <strong>Clone to Residential</strong> buttons in the sidebar panel. '
      + 'The script creates an address point or residential place at the venue\'s location with the same address.',
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
    help: 'Оберіть POI, щоб побачити кнопки <strong>Клон до POI</strong> та <strong>Клон до АТ</strong> на панелі. '
      + 'Скрипт створює адресну точку або житловий будинок у місці розташування POI з тією ж адресою.',
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
    help: 'Выберите POI, чтобы увидеть кнопки <strong>Клон в POI</strong> и <strong>Клон в АТ</strong> на панели. '
      + 'Скрипт создает адресную точку или жилой дом в месте расположения POI с тем же адресом.',
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
