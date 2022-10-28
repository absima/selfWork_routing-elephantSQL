import fs from 'fs';
import contentful from "contentful";
import richTextToMarkdown from 'contentful-rich-text-to-markdown';


const client = contentful.createClient({
  space: 'h4wwx2mbhm2q',//import.meta.env.VITE_SPACE,
  accessToken: 'JphYl99ZF17a_nH6OD7_l54FRuFIY44JTYLfVuL7AxQ',//import.meta.env.VITE_TOKEN,
  host: 'cdn.contentful.com'//import.meta.env.VITE_HOST
});

const getItem = async (contype) => {
  try {
    const contentx = await client.getEntries(
      {
        content_type: contype,
        select: "fields"
      });
    const contentEntries = contentx.items.map((item) => {
      const images = item.fields.images.map(item => item.fields.file);
      images.unshift(item.fields.image.fields.file);
      delete item.fields.image;
      const overview = richTextToMarkdown.documentToMarkdown(item.fields.overview).content; //////

      return { ...item.fields, images, overview };
    });
    return contentEntries;
  }
  catch (error) {
    return error;
  }
}

const getData = async () => {
  const contype = 'continent';
  const continents = await getItem(contype);
  // console.log(dta);
  fs.writeFile(`continents.json`, JSON.stringify(continents), (err) => { if (err) { console.log(err) } });


  const contIds = ['africa', 'asia', 'europe', 'northAmerica', 'oceania', 'southAmerica'];
  let countries = []
  for (let i = 0; i < 6; i++) {
    const dtaItem = await getItem(contIds[i]);
    countries = countries.concat(dtaItem);
  }
  fs.writeFile(`countries.json`, JSON.stringify(countries), (err) => { if (err) { console.log(err) } });


  return [continents, countries]
}



getData();
// console.log(dta)


// // console.log('dta', dta)
  // if (dta.length) {
  //   const tosave = JSON.stringify(dta[0].overview);
  //   const bb = richTextToMarkdown.documentToMarkdown(dta[0].overview).content
  //   // tform = richTextToMarkdown(tosave);
  //   console.log(bb);
  //   // fs.writeFile(`overview.json`, tosave, (err) => { if (err) { console.log(err) } });
  // }

// const contIds = ['africa', 'asia', 'europe', 'northAmerica', 'oceania', 'southAmerica'];
// // const contNames = ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];
// const nmID = contIds.map(x => x.substring(0,4).toUpperCase());
// if (dta.length){
//   for (let i=0; i<6; i++){
//     const nme = dta[0][i].name.substring(0,4).toUpperCase();
//     const idx = nmID.indexOf(nme);
//     const dtaItem = await getItem(contIds[idx]);
//     if (dtaItem.length){
//       dta[0][i]['selected'] = dtaItem;
//     }        
//   }
// }

// // // object version
// const objdta = dta[0].reduce((obj, cur) => ({...obj, [cur.name.substring(0,4).toLowerCase()]: cur}), {});

// fs.writeFile(`continent.json`, JSON.stringify(objdta), (err) => { if (err) { console.log(err)} });

// return objdta