export const createDefaultAttributes = (item) => {
    let defaultAttributes = {};
    for (let i = 0; i < item.attributes.length; i++) {
        defaultAttributes = {
            ...defaultAttributes,
            [item.attributes[i].name.toLowerCase()]:
            item.attributes[i].items[0].value,
        };
    }
    return defaultAttributes
}

export const createIdforPdp = (state,item,defaultAttributes) => {
    return  state.selectedAttributes.length === 0
        ? `${item.id}${Object.values(defaultAttributes)}`
        : `${item.id}${Object.values(state.selectedAttributes)}`
}
export const createIdforProduct = (customizedItem,item,defaultAttributes) => {
    return  customizedItem.selectedAttributes.length === 0
        ? `${item.id}${Object.values(defaultAttributes)}`
        : `${item.id}${Object.values(defaultAttributes)}`
}