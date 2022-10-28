
const fetcher = () => {
  const getItem = async (contype) => {
    try {
      const contentx = await fetch(`http://localhost:5432/${contype}`)
        .then(res => res.json())

      const contentEntries = contentx;
      return contentEntries;
    }
    catch (error) {
      return error;
    }
  }

  const getData = async () => {
    const contNames = [];
    const continentdata = await getItem('continents');
    // const cleanedContdata = [];
    continentdata.forEach(element => {
      element.images = [element.image1];
      // element.map = [element.latitude, element.longitude];
      // deleteimage1, image2, latitude, longitude;
      element.overview = element.overviewoverviewoverviewoverviewoverviewoverview;
      element.selected = []
      delete element.image1
      delete element.image2
      delete element.overviewoverviewoverviewoverviewoverviewoverview;
      contNames.push(element.continent)
    });


    console.log(contNames);

    const countrydata = await getItem('countries');

    countrydata.forEach(element => {
      element.images = [element.image2, element.image1, element.image3];
      // element.map = [element.latitude, element.longitude];
      // deleteimage1, image2, latitude, longitude;
      element.overview = element.overviewoverviewoverviewoverviewoverviewoverview;
      delete element.image1;
      delete element.image2;
      delete element.image3;

      delete element.overviewoverviewoverviewoverviewoverviewoverview;
      const indx = contNames.indexOf(element.continent);
      // console.log('indxxxxxx', indx);
      continentdata[indx].selected.push(element);
    });

    // console.log(continentdata);
    // console.log(countrydata);
    return continentdata

  }
  return { getData };
}

export default fetcher;
