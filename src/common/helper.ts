export const getCustomsByCode = (code: string) => {
    switch (code) {
        case "06536":
            return "ПТО Аэропорт Минск";
        case "06533":
            return "ПТО Минск-СЭЗ";
        case "06529":
            return "ПТО Колядичи-авто";
        case "06611":
            return "ПТО Белкульторг";
        case "06650":
            return "ПТО Минск-Белтаможсервис-2";
        case "06649":
            return "ПТО Минск-Белтаможсервис-ТЛЦ";
        case "06544":
            return "ПТО Белювелирторг";
        case "06641":
            return "ПТО Солигорск";
        case "06651":
            return "ПТО Великий Камень";
        case "06544":
            return "ПТО Белювелирторг";
        case "06613":
            return "ПТО Белаз";
        case "06608":
            return "ПТО Борисов-авто";
        case "07242":
            return "ПТО Полоцк-стекловолокно";
        case "07260":
            return "ПТО Витебск-Белтаможсервис";
        case "07270":
            return "ПТО Орша-Белтаможсервис";
        case "06544":
            return "ПТО Белювелирторг";
        case "09146":
            return "ПТО Барановичи-Фестивальная";
        case "09159":
            return "ПТО Брест-Белтаможсервис";
        case "09161":
            return "ПТО Пинск-Белтаможсервис";
        case "09162":
            return "ПТО Брест-Белтаможсервис-2";
        case "14325":
            return "ПТО Гомель-Белтаможсервис";
        case "14336":
            return "ПТО Жлобин-металлургический";
        case "14354":
            return "ПТО Гомель-СЭЗ";
        case "09157":
            return "ПТО Мозырь-Белтаможсервис";
        case "16443":
            return "ПТО Лида-авто";
        case "16457":
            return "ПТО Гродно-ГАП-2";
        case "16463":
            return "ПТО Брузги-ТЛЦ";
        case "16464":
            return "ПТО Каменный Лог-Белтаможсервис";
        case "16465":
            return "ПТО Берестовица-ТЛЦ";
        case "20733":
            return "ПТО Могилев-Белтаможсервис";
        case "20734":
            return "ПТО Бобруйск-Белтаможсервис";
        default:
            return "введите правильный код";
    }
};
