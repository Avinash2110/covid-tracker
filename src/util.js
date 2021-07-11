export const sortData = (data, key) =>{
    const sortedData = [...data];
    sortedData.sort((a, b) =>{
        return a[key] > b[key] ? -1 : 1;
    });

    return sortedData;
}