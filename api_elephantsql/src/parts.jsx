// import Carousel from 'react-bootstrap/Carousel';

import ReactMarkdown from 'react-markdown'
// import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
// import {BLOCKS, INLINES} from '@contentful/rich-text-types';

// const RichTextOpt = {
//   renderNode: {
//     [BLOCKS.PARAGRAPH]: (node, children) => {
//       return <div className='richText'>{children}</div>
//     }
//   }
// }

const Parts = ({ content }) => {
  console.log("content", content)
  // const imgarr = content.images.slice(1, content.images.length);
  // console.log('imgarr.....', imgarr)
  return (
    <div className='parts'>
      <h1>{content.name}</h1>
      <div className='img_div' >
        {/* <h1>{content.name}</h1> */}
        <div className='images'>
          {
            content.images.map((item, ii) =>
              <img key={ii} src={item} />
            )
          }
        </div>
      </div>
      <ReactMarkdown>
      {content.overview}
      </ReactMarkdown>
      

    </div>
  );
};

export default Parts;



{/* <Carousel>
          {
            imgarr.map((item, i) => {
              return(
                <Carousel.Item>
                <img
                  className="d-block w-100 h-50"
                  src={item.url}
                  alt="i"
                />
                <Carousel.Caption>
                  <h3 className='captionCarousel'>{content.name}</h3>
                  <p>blabla</p>
                </Carousel.Caption>
              </Carousel.Item>
              )
            })
          }
        </Carousel>  */}