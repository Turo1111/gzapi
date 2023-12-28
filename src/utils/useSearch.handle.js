function searchItems(search: string, tags: string[], list: any[], tagSearch: { tag: string; search: string }[] = []): any[] {
  let newList = list;

  if (tagSearch.length > 0) {
    tagSearch.forEach((itemTag) => {
      newList = newList.filter((itemLista) => {
        return (
          itemLista[itemTag.tag]?.toString().toLowerCase().indexOf(itemTag.search.toLowerCase()) !== -1
        );
      });
    });
  }

  if (search !== '') {
    const filteredList = newList.filter((item) => {
      for (const tag of tags) {
        if (typeof tag === 'object') {
          const key = Object.keys(tag)[0];
          if (Array.isArray(tag[key])) {
            for (const i of tag[key]) {
              if (
                item[key]?.[i]?.toString().toLowerCase().includes(search.toLowerCase())
              ) {
                return true;
              }
            }
          }
        } else {
          if (item[tag]?.toString().toLowerCase().includes(search.toLowerCase())) {
            return true;
          }
        }
      }
      return false;
    });

    const resultMap = {};
    for (const item of filteredList) {
      resultMap[item._id] = item;
    }

    return Object.values(resultMap);
  } else {
    return newList;
  }
}


export { searchItems }
